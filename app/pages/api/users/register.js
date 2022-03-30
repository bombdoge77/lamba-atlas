import add_user from '../../../utils/db/users.js'

export default function handler(req, res) {
  if (req.method == 'POST') {
    const { user, pass, name, country } = req.body
    add_user(user, pass, name, country)
    res.status(200).json({type : 'register user', id : 2})
  }
}

/*function register(user, pass) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
        add_user(username, hash)
    });
  });
}*/