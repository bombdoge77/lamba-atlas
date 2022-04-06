const bcrypt = require('bcryptjs')
import { auth } from '../../../utils/db/users.js'
import { connect, disconnect } from '../../../utils/db/db.js'

export default async function authHandler(req, res) {
  if (req.method == 'POST') {
    await authorize(req, res)
  }
}

async function authorize(req, res) {
  const { username, password } = req.body

  if (username == null || username === '' || password == null || password === '') {
    res.status(400)
    return
  }

  var db = await connect('MDB_TEST')

  var success = await auth(db, username, password)
  if (success) {
    // TODO: create json web token
    var jwt = {'hello' : 'world'}
    res.status(200).json(jwt)
  } else {
    res.status(401)
  }

  await disconnect()
}