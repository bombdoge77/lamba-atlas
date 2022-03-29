const bcrypt = require('bcryptjs')
import auth from '../../../utils/db/users.js'

export default apiHandler({
  post : auth
})

function auth(req, res) {
  res.status(200).json({status : 'logged in'})
  /*
  const { username, password } = req.body

  // if user is in database, try password
  if (user_exists(username) && ) {

  } else {
    throw 'Username or password does not exist'
  }
  */
  //response should contain status
}

function user_exists() {
  ...
}