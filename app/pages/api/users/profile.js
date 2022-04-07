import { connect, disconnect } from '../../../utils/db/db.js'
import { edit_user } from '../../../utils/db/users.js'

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

}