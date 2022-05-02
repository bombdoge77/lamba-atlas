const bcrypt = require('bcryptjs')
const isemail = require('isemail')
const crypto = require('crypto')

export async function add_user(db, email, pass, name, hospital, country, title, bio, contact) {
	if (email == null || email == '' || pass == null || pass == '') return false

	var valid_email = isemail.validate(email, {errorLevel : false})
	var email_exists = await get_user(db, email) != null

	if (email_exists || !valid_email) return false

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
	var result = await users.insertOne(user)

	return result.acknowledged
}

export async function remove_user(db, email) {
	var result = await db.collection('users').deleteOne({'email' : email})
	return result.acknowledged
}

// private profile information, including password and email
// TODO: should we ever send the password hash to the client?
export async function get_user(db, email) {
	var user = await db.collection('users').findOne({'email' : email})
	return user
}

// returns all public profile information
export async function get_user_profile(db, email) {
	var user = await get_user(db, email)
	delete user['pass_hash']
	//delete user['email']
	return user
}

// Could be optimized if needed, use updateOne to only update relevant properties
export async function edit_user(db, email, new_user) {
	var user = await get_user(db, email)
	if (user == null) return null
	new_user['pass_hash'] = user.pass_hash
  var result = await db.collection('users').findOneAndReplace({'email' : email}, new_user)
  return result.ok
}

export async function auth(db, email, pass) {
	var user = await get_user(db, email)
	if (user == null) return false

	var expected_hash = user['pass_hash']
	
	return bcrypt.compareSync(pass, expected_hash)
}

async function clear_invite_codes(db) {
	var codes = db.collection('invite_codes')
	var today = new Date()
	await codes.deleteMany({ expires : { $lt : today.parse() } })
}

export async function gen_invite_code(db) {
	var done = false
	await clear_invite_codes(db)

	while (!done) {
			crypto.randomBytes(48, async (err, buf) => {
				if (err) throw err

				var code = buf.toString('hex')
				var codes = db.collection('invite_codes')
				var code_exists = (codes.findOne({ code : code }) != null)
				if (!code_exists) {
					var today = new Date()
					var tomorrow = new Date(today)
					tomorrow.setDate(tomorrow.getDate + 1) // increment by one day
					await codes.insertOne({ code : code, expires : tomorrow.parse() })
					done = true
				}
		});
	}

	return code
}

export async function validate_invite_code(db) {
	var codes = db.collection('invite_codes')
	var date = new Date()
	var result = await codes.findOne({ code : code, expires : { $gt : date.parse() } })
	return result != null
}