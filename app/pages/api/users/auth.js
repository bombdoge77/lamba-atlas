const bcrypt = require('bcryptjs')

export default apiHandler({
  post : auth
})

function auth(req, res) {
  const { username, password } = req.body

  // if user is in database, try password
  if (user_exists(username) && ) {

  } else {
    throw 'Username or pass'
  }
}

function user_exists() {
  ...
}