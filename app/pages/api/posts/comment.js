require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'
import { make_comment, edit_comment, get_comments, remove_comment } from '../../../utils/db/comments.js'
import { authenticateToken } from '../users/auth.js'

export default async function commentHandler(req, res) {
  var jwt = req.body.jwt

  // check if jwt valid
  jwt = authenticateToken(jwt)
  if (!jwt) {
    res.status(401)
    res.end()
    return
  }

  switch (req.method) {
    case 'PUT':
      await edit(req, res)
      break
    case 'GET':
      await get(req, res)
      break
    case 'POST':
      await add(req, res)
      break
    case 'DELETE':
      await remove(req, res)
      break
    default:
      res.status(501)
  }
  
  res.end()
}

async function add(req, res) {
  var db = await connect(process.env.DB_NAME)
  
  // comment must contain user, post_id, text, is_reply
  var comment = req.body.payload
  var result = await make_comment(db, comment.user, comment.post_id, comment.text, comment.is_reply)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

async function edit(req, res) {
  var db = await connect(process.env.DB_NAME)
  
  var { id, new_text } = req.body.payload
  var result = await edit_comment(db, id, new_text)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

// gets all comments for one post, returns array
async function get(req, res) {
  var db = await connect(process.env.DB_NAME)

  var post_id = req.body.payload.post_id
  var result = await get_comments(db, post_id)

  //does this work?
  if (result.length() != 0) {
    res.status(200).json(result)
  } else {
    res.status(204)
  }

  await disconnect() //do we need to await?
}

async function remove(req, res) {
  var db = await connect(process.env.DB_NAME)

  var post_id = req.body.payload.post_id
  var result = await remove_comment(db, post_id)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}