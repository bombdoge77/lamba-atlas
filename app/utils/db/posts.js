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

export async function star(db, email, post_id) {
	var star_list = db.collection('user_stars')

	var user_star = await star_list.findOne({ user : email })
	
	var star_count = 1
	if (user_star == null) {
		var user_star_new = {
			'user' : email,
			'count' : star_count,
			'posts' : [ post_id ]
		}
		var result = await star_list.insertOne(user_star_new)
		return result.acknowledged

	} else {
		if (user_star.posts.includes(post_id)) {
			return false//post already exist and should not be added again
		}
		star_count = user_star.count
		star_count = star_count + 1
		await star_list.updateOne({ user : email }, {$set:{ 'count' : star_count}})
		await star_list.updateMany({ user : email }, {$push:{ 'posts' : post_id }})
		return true
	}

	// increment star count
	// add post_id to array of stars in user profile 
}

export async function unstar(db, email, post_id) {
	var star_list = db.collection('user_stars')

	var user_star = await star_list.findOne({ user : email })
	
	var star_count = 0
	if (user_star == null) {
		return false
	}
	if (!user_star.posts.includes(post_id)) {
		return false//post do not exist
	}
	star_count = user_star.count
	star_count = star_count - 1
	await star_list.updateOne({ user : email }, {$set:{ 'count' : star_count}})
	await star_list.updateMany({ user : email }, {$pull:{ 'posts' : post_id }})

	return true
	// decrement star count
	// remove post_id from array of stars in user profile
}

// params should be JSON containing category and text
// maybe only get post id, title, likes, comments, etc.
export async function search_posts(db, params) {

}
