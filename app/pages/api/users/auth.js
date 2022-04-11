require('dotenv').config()
import { auth } from '../../../utils/db/users.js'
import { connect, disconnect } from '../../../utils/db/db.js'
const jwt = require('jsonwebtoken')

export default async function authHandler(req, res) {
  if (req.method == 'POST') {
    await authorize(req, res)
  }
}

export function authenticateToken(token) {
  var result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    return err ? null : decoded
  })
  return result
}

async function authorize(req, res) {
  const { email, password } = req.body

  if (email === null || email === '' || password === null || password === '') {
    res.status(400)
    return
  }

  var db = await connect(process.env.DB_NAME)

  var success = await auth(db, email, password)
  if (success) {
    // TODO: create json web token
    var accessToken = jwt.sign( { user : email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '1h' })
    var body = {
      jwt : accessToken,
      payload : {}
    }
    res.status(200).json(body)
  } else {
    res.status(401)
  }

  await disconnect()
}