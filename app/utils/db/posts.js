export async function create_post(db, post) {
	var posts = db.collection('posts')

	// error handling
	// store pictures?
	var result = await posts.insertOne(user)
	return result.acknowledged
}

export async function remove_post(db, id) {
	var posts = db.collection('posts')

	// no error handling needed?
	var result = await posts.deleteOne({ _id : id })
	return result.acknowledged
}

export async function get_post(db, id) {
	var posts = db.collection('posts')

	var result = await posts.findOne({ _id : id })
	return result.acknowledged
}

export async function edit_post(db, id, new_post) {
	var posts = db.collection('posts')

	var result = await posts.findOneAndReplace({ _id : id }, new_post)
	return result.ok
}

export async function star(db, user, post_id) {
	// increment star count
	// add post_id to array of stars in user profile 
}

export async function unstar(db, user, post_id) {
	// decrement star count
	// remove post_id from array of stars in user profile
}

// params should be JSON containing category and text
// maybe only get post id, title, likes, comments, etc.
export async function search_posts(db, params) {

}