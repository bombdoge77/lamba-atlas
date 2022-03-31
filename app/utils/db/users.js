const bcrypt = require('bcryptjs')
const isemail = require('isemail')

export async function add_user(db, email, pass, name, country, title, bio, contact) {
	var valid_email = isemail.validate(email, {errorLevel : false})
	var email_exists = await get_user(db, email) != null

	if (email_exists || !valid_email) return null

	//TODO: try to hash asynchronously
	var users = db.collection('users')
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(pass, salt);
	var user = {
		'email' : email,
		'name' : name,
		'country' : country,
		'title' : title,
		'bio' : bio,
		'contact' : contact,
		'pass_hash' : hash
		//picture?
	}
	await users.insertOne(user)

	return user
}

export async function get_user(db, email) {
	var user = db.collection('users').findOne({'email' : email})
	return user
}

export async function change_name(db, email, new_name) {
	return 0
}

export function auth(db, email, pass) {
	var user = get_user(db, email)
	expected_hash = user['pass_hash']
	return bcrypt.compareSync(pass, expected_hash)
}