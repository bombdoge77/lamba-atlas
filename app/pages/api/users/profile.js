require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'
import { edit_user, get_user_profile, get_user } from '../../../utils/db/users.js'
import { authenticateToken } from './auth.js'

export default async function profileHandler(req, res) {
  var jwt_encoded = req.headers.authorization

  // check if jwt valid
  var jwt = authenticateToken(jwt_encoded)
  if (!jwt) {
    res.status(401)
    res.end()
    return
  }

  if (req.method == 'POST') {
    await edit(req, res, jwt.user)
  } else if (req.method == 'PUT') {
    await get(req, res)
  }
  res.end()
}

async function edit(req, res, email) {
  var user = req.body.payload

  var db = await connect(process.env.DB_NAME)

  if (await get_user(db, email) == null) {
    res.status(401)
    await disconnect(db)
    return
  }

  await edit_user(db, email, user)
  await disconnect(db)
  res.status(200)
}

async function get(req, res) {
  //var body = JSON.parse(req._getData())

  var db = await connect(process.env.DB_NAME)
  
  var email = req.body.user
  var user_profile = await get_user_profile(db, email)

  res.status(200).json({ payload : { user_profile }})

  await disconnect(db)
}