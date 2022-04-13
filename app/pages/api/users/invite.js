require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'

export default async function regHandler(req, res) {
  if (req.method == 'GET') {
    await gen_code(req, res)
  } else if (req.method == 'POST') {
    validate_code(req, res)
  }
  res.end()
}

async function gen_code(req, res) {
  return '123456'
}

async function validate_code(req, res) {
  return true
}