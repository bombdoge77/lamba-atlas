const bcrypt = require('bcryptjs')

async function hash(s) {
	return s
}

export async function add_user(db, username, pass, name, country) {
	var users = db.collection('users')

	// hash password, test if it works
	var salt = await bcrypt.genSalt(10)
    var pass_hash = await bcrypt.hash(pass, salt)
	var user = {
		'username' : username,
		'name' : name,
		'country' : country,
		'pass_hash' : pass_hash
		//picture?
	}

	users.insertOne(user)
}

export async function get_user(db, username) {
	var user = {
      'username': 'johndoe11',
      'name': 'John Doe',
      'country': 'Sweden',
      'pass_hash': 'acb61b1hbcu'
    }
	return user
}

export async function change_name(db, username, new_name) {
	return 0
}

export function auth(db, username, pass) {
	var res = true
	return res
}