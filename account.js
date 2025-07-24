import { db, save } from './database.js'
import { v4 as uuidv4 } from 'uuid'

export async function addAccount(name, type) {
  const account = { id: uuidv4(), name, type, balance: 0 }
  db.data.accounts.push(account)
  await save()
  return account
}

export function listAccounts() {
  return db.data.accounts
}

export function getAccount(id) {
  return db.data.accounts.find(a => a.id === id)
}

export async function updateBalance(id, amount) {
  const account = getAccount(id)
  if (!account) throw new Error('Account not found')
  account.balance += amount
  await save()
}
