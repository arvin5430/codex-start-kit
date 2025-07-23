import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const defaultData = { accounts: [], transactions: [], recurring: [] }
const db = new Low(adapter, defaultData)

async function init() {
  await db.read()
  db.data = Object.assign({}, defaultData, db.data)
  await db.write()
}

async function save() {
  await db.write()
}

export { db, init, save }
