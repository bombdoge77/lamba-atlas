require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'
import { gen_invite_code, validate_invite_code } from '../../../utils/db/db.js'

export default async function regHandler(req, res) {
  if (req.method == 'GET') {
    await gen_code(req, res)
  } else if (req.method == 'POST') {
    validate_code(req, res)
  }
  res.end()
}

async function gen_code(req, res) {
  var db = await connect(process.env.DB_NAME)
  var code = gen_invite_code(db)
  await disconnect()
  return code
}

async function validate_code(req, res) {
  var db = await connect(process.env.DB_NAME)
  var code = req.body.payload.code
  var result = validate_invite_code(db, code)
  await disconnect()
  return result
}