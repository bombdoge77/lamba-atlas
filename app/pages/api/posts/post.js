require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'
import { create_post, edit_post, get_post } from '../../../utils/db/posts.js'

export default async function postHandler(req, res) {
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

  var post = req.body.payload
  var result = await create_post(db, post)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

async function edit(req, res) {
  var db = await connect(process.env.DB_NAME)

  var id = req.body.payload.id
  var new_post = req.body.payload.new_post
  var result = await edit_post(db, id, new_post)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

async function get(req, res) {
  var db = await connect(process.env.DB_NAME)

  var id = req.body.payload.id
  var result = await get_post(db, id)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

async function remove(req, res) {
  var db = await connect(process.env.DB_NAME)

  var id = req.body.payload.id
  var result = await remove_post(db, id)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}