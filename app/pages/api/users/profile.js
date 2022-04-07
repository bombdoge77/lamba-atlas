import { connect, disconnect } from '../../../utils/db/db.js'
import { edit_user, get_user_profile } from '../../../utils/db/users.js'
import { authenticateToken } from 'auth.js'

export default async function profileHandler(req, res) {
  if (req.method == 'POST') {
    await edit(req, res)
  } else if (req.method == 'GET') {
    await get(req, res)
  }
}

async function edit(req, res) {

}

async function get(req, res) {
  var body = JSON.parse(req._getData())
  var jwt_encoded = body.jwt
  var jwt = authenticateToken(jwt_encoded)

  if (jwt == null) {
    res.status(401)
    return
  }

  var email = body.payload.email
  var user_profile = get_user_profile(db, email)
  res.status(200).json({ payload : { is_owner : (jwt.user == email) ? true : false } })
}