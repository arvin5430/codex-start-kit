import { db, save } from './database.js'
import { updateBalance } from './account.js'
import { v4 as uuidv4 } from 'uuid'

export async function addTransaction({ date = new Date().toISOString(), amount, type, accountId, toAccountId, category, note }) {
  const tx = { id: uuidv4(), date, amount, type, accountId, toAccountId, category, note }
  db.data.transactions.push(tx)
  if (type === 'income') {
    await updateBalance(accountId, amount)
  } else if (type === 'expense') {
    await updateBalance(accountId, -amount)
  } else if (type === 'transfer') {
    await updateBalance(accountId, -amount)
    await updateBalance(toAccountId, amount)
  }
  await save()
  return tx
}

export function listTransactions() {
  return db.data.transactions
}
