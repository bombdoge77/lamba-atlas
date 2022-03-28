// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from '../../utils/db/db.js'


export default async function handler(req, res) {
  res.status(200).json(posts)
}
