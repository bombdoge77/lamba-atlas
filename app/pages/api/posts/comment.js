require('dotenv').config()
import { connect, disconnect } from '../../../utils/db/db.js'

export default async function commentHandler(req, res) {
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
  
}

async function edit(req, res) {

}

async function get(req, res) {

}

async function remove(req, res) {

}