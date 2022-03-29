export function add_user(db, username, pass, name, country) {
	var users = db.collection('users')
	// hash password
	var pass_hash = ''
	var user = {
		'id' : ,
		'name' : name,
		'country' : country,
		'pass_hash' : pass_hash
		//picture?
	}

	users.insert(user)
}

export function change_name(db, user_id, new_name)

export function auth(db, username, pass) {
	var res = true
	return res
}

module.exports = { add_user };