require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'
import { edit_user, get_user_profile, get_user } from '../../../utils/db/users.js'
import { authenticateToken } from 'auth.js'

export default async function profileHandler(req, res) {
  if (req.method == 'POST') {
    await edit(req, res)
  } else if (req.method == 'GET') {
    await get(req, res)
  }
}

async function edit(req, res) {
  var jwt_encoded = req.body.jwt
  var jwt = authenticateToken(jwt_encoded)
  var user = req.body.payload
  var email = user.email

  if (jwt == null) {
    res.status(401)
    return
  }

  var db = await connect(process.env.DB_NAME)

  if (await get_user(db, email) == null) {
    res.status(404)
    await disconnect(db)
    return
  }

  await edit_user(db, user.email, user)
  await disconnect(db)
  res.status(200)
}

async function get(req, res) {
  var body = JSON.parse(req._getData())
  var jwt_encoded = body.jwt
  var jwt = authenticateToken(jwt_encoded)

  if (jwt == null) {
    res.status(401)
    return
  }

  var db = await connect(process.env.DB_NAME)

  var email = body.payload.email
  var user_profile = get_user_profile(db, email)
  res.status(200).json({ payload : { is_owner : (jwt.user == email) ? true : false } })

  await disconnect(db)
}