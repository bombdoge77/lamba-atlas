const bcrypt = require('bcryptjs')

//TODO: Implement
async function hash(s) {
	//var salt = await bcrypt.genSalt(10)
    //var pass_hash = await bcrypt.hash(pass, salt)
	return s
}

export async function add_user(db, email, pass, name, country) {
	var users = db.collection('users')
	//TODO: check if email is a valid adress
	var pass_hash = hash(pass)
	var user = {
		'email' : email,
		'name' : name,
		'country' : country,
		'pass_hash' : pass_hash
		//picture?
	}

	users.insertOne(user)
}

export async function get_user(db, email) {
	var user = {
      'email': 'johndoe11',
      'name': 'John Doe',
      'country': 'Sweden',
      'pass_hash': 'hello123'
    }
	return user
}

export async function change_name(db, email, new_name) {
	return 0
}

export function auth(db, email, pass) {
	var res = true
	return res
}