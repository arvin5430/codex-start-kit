#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './database.js'
import { addAccount, listAccounts } from './account.js'
import { addTransaction, listTransactions } from './transaction.js'
import { generateExpensePie, generateBalanceTrend } from './charts.js'

const program = new Command()

await init()

program
  .command('add-account <name> <type>')
  .description('Add a new account')
  .action(async (name, type) => {
    const acc = await addAccount(name, type)
    console.log('Account added:', acc)
  })

program
  .command('list-accounts')
  .description('List all accounts')
  .action(() => {
    console.table(listAccounts())
  })

program
  .command('add-transaction')
  .description('Add a transaction')
  .requiredOption('-a, --account <id>', 'Account id')
  .option('-t, --to <id>', 'To account id for transfer')
  .requiredOption('-m, --amount <number>', 'Amount', parseFloat)
  .requiredOption('-k, --kind <kind>', 'income|expense|transfer')
  .option('-c, --category <cat>', 'Category')
  .option('-n, --note <note>', 'Note')
  .action(async (opts) => {
    const tx = await addTransaction({
      amount: opts.amount,
      type: opts.kind,
      accountId: opts.account,
      toAccountId: opts.to,
      category: opts.category,
      note: opts.note,
    })
    console.log('Transaction added:', tx)
  })

program
  .command('list-transactions')
  .description('List transactions')
  .action(() => {
    console.table(listTransactions())
  })

program
  .command('pie <file>')
  .description('Generate expense pie chart')
  .action(async (file) => {
    await generateExpensePie(file)
    console.log('Pie chart saved to', file)
  })

program
  .command('trend <file>')
  .description('Generate balance trend line chart')
  .action(async (file) => {
    await generateBalanceTrend(file)
    console.log('Trend chart saved to', file)
  })

await program.parseAsync(process.argv)
