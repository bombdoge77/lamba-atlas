require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'
import { search_posts } from '../../../utils/db/posts.js'
import { authenticateToken } from '../users/auth.js'

export default async function postHandler(req, res) {
  var jwt = req.headers.authorization

  // check if jwt valid
  jwt = authenticateToken(jwt)
  if (!jwt) {
    res.status(401)
    res.end()
    return
  }

  const id = req.query.id

  switch (req.method) {
    case 'POST':
      await search(req, res)
      break
    default:
      res.status(501)
  }

  res.end()
}

async function search(req, res) {
  var db = await connect(process.env.DB_NAME)
  const { text, category } = req.body
  var result = await search_posts(db, text, category)
  res.json(result)

  if (result) res.status(200)

  if (!result) res.status(204)
  await disconnect()
}