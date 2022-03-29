// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connect, get_posts } from '../../utils/db/db.js'
require('dotenv').config()


export default async function handler(req, res) {
  var db = await connect()
  var posts = await get_posts(db)
  res.status(200).json(posts)
}
