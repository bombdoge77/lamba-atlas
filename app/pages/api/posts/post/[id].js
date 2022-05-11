require('dotenv').config()
import { connect, disconnect } from '../../../../utils/db/db.js'
import { create_post, edit_post, get_post, remove_post } from '../../../../utils/db/posts.js'
import { authenticateToken } from '../../users/auth.js'

export default async function postHandler(req, res) {
  // var jwt = req.headers.authorization

  // // check if jwt valid
  // jwt = authenticateToken(jwt)
  // if (!jwt) {
  //   res.status(401)
  //   res.end()
  //   return
  // }

  const id = req.query.id

  switch (req.method) {
    case 'PUT':
      await edit(req, res, id)
      break
    case 'GET':
      await get(req, res, id)
      break
    case 'POST':
      await add(req, res)
      break
    case 'DELETE':
      await remove(req, res, id)
      break
    default:
      res.status(501)
  }

  res.end()
}

async function add(req, res) {
  var db = await connect(process.env.DB_NAME)

  var post = req.body.payload
  // const { postOp, preOp, inOp } = post.pictures

  // //check if there are any non-image files, send error status if true
  // for (var key in post.pictures) {
  //   if (post.pictures[key]) {
  //       var result = post.pictures[key].some(x => { x.type != 'image/jpeg' && x.type != 'image/png'})
  //       if (result == false) {
  //         res.status(400)
  //         return
  //       }
  //   }
  // }

  var result = await create_post(db, post)

  if (result.acknowledged) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

async function edit(req, res, id) {
  var db = await connect(process.env.DB_NAME)

  var new_post = req.body.payload.new_post
  var result = await edit_post(db, id, new_post)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

async function get(req, res, id) {
  var db = await connect(process.env.DB_NAME)

  var result = await get_post(db, id)

  if (result) {
    res.status(200).json(result)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}

async function remove(req, res, id) {
  var db = await connect(process.env.DB_NAME)

  var result = await remove_post(db, id)

  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }

  await disconnect() //do we need to await?
}