require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'
import { edit_user, get_user_profile, get_user } from '../../../utils/db/users.js'
import { authenticateToken } from './auth.js'

export default async function profileHandler(req, res) {
  if (req.method == 'POST') {
    await edit(req, res)
  } else if (req.method == 'PUT') {
    await get(req, res)
  }
  res.end()
}

async function edit(req, res) {
  var jwt_encoded = req.body.jwt
  var jwt = authenticateToken(jwt_encoded)
  var email = jwt.user
  var user = req.body.payload

  if (jwt == null) {
    res.status(401)
    return
  }

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
  var body = req.body
  var jwt_encoded = body.jwt
  var jwt = authenticateToken(jwt_encoded)

  if (jwt == null) {
    res.status(401)
    return
  }

  var db = await connect(process.env.DB_NAME)
  
  var email = jwt.user
  var user_profile = await get_user_profile(db, email)

  res.status(200).json({ payload : { user_profile }})

  await disconnect(db)
}