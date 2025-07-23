import fs from "fs"
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import { db } from './database.js'
import pkg from 'lodash'
const { groupBy, sumBy } = pkg

const width = 800
const height = 600
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })

export async function generateExpensePie(filename) {
  const expenses = db.data.transactions.filter(t => t.type === 'expense')
  const grouped = groupBy(expenses, 'category')
  const labels = Object.keys(grouped)
  const data = labels.map(label => sumBy(grouped[label], 'amount'))
  const configuration = {
    type: 'pie',
    data: { labels, datasets: [{ data }] },
  }
  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration)
  await fs.promises.writeFile(filename, buffer)
}

export async function generateBalanceTrend(filename) {
  const sorted = db.data.transactions.sort((a, b) => new Date(a.date) - new Date(b.date))
  let balance = 0
  const labels = []
  const data = []
  sorted.forEach(t => {
    if (t.type === 'income') balance += t.amount
    else if (t.type === 'expense') balance -= t.amount
    labels.push(new Date(t.date).toISOString().split('T')[0])
    data.push(balance)
  })
  const configuration = {
    type: 'line',
    data: { labels, datasets: [{ label: 'Balance', data }] },
  }
  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration)
  await fs.promises.writeFile(filename, buffer)
}
