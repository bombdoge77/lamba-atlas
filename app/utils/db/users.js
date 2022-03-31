const bcrypt = require('bcryptjs')
const isemail = require('isemail')

export async function add_user(db, email, pass, name, hospital, country, title, bio, contact) {
	if (email === null || email == '') return null

	var valid_email = isemail.validate(email, {errorLevel : false})
	var email_exists = await get_user(db, email) != null

	if (email_exists || !valid_email) return null

	// TODO: try to hash asynchronously
	var users = db.collection('users')
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(pass, salt);
	var user = {
		'email' : email,
		'name' : name,
		'hospital' : hospital,
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

// private profile information, including password and email
// TODO: should we ever send the password hash to the client?
export async function get_user(db, email) {
	var user = db.collection('users').findOne({'email' : email})
	return user
}

// returns all public profile information
export async function get_user_profile(db, email) {
	var user = get_user(db, email)
	delete user['pass_hash']
	delete user['email']
	return user
}

// Could be optimized if needed, use updateOne to only update relevant properties
async function edit_user(db, email, new_user) {
	if (await get_user(db, email) === null) return null
	return await db.collection('users').findOneAndReplace({'email' : email}, new_user)
}

export function auth(db, email, pass) {
	var user = get_user(db, email)
	expected_hash = user['pass_hash']
	return bcrypt.compareSync(pass, expected_hash)
}