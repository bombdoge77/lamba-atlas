import { connect, disconnect } from '../../../utils/db/db.js'
import { add_user } from '../../../utils/db/users.js'

export default async function regHandler(req, res) {
  if (req.method == 'POST') {
    await register(req, res)
  }
}

async function register(req, res) {
  var db = await connect(process.env.DB_NAME)

  const { payload } = req.body
  var result = await add_user(
    db, 
    payload.email, 
    payload.password, 
    payload.name, 
    payload.hospital, 
    payload.country, 
    payload.title, 
    payload.bio, 
    payload.contact
    )
  res.status(result ? 200 : 500)

  await disconnect(db)
}