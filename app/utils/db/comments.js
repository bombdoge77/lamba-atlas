// make new collection for comments??
// each comment must have an id
// save list of comment ids in user profile

export async function make_comment(db, user, post, text, is_reply) {
	var comments = db.collection('comments')
    var comment = {
        post_id : post,
        body : text,
        user : user,
        likes : 0,
        replies : [], //lagra alla id för kommentarer som svarar på denna
        is_reply : is_reply
        //Date
    }

	// error handling
	// store pictures?
	var result = await comments.insertOne(comment)
	return result.acknowledged
}

export async function remove_comment(db, comment_id) {
	var comments = db.collection('comments')

	// no error handling needed?
	var result = await comments.deleteOne({ _id : comment_id })
	return result.acknowledged 

}

export async function edit_comment(db, comment_id, new_text) {
	var comments = db.collection('comments')

	var result = await comments.updateOne({ _id : comment_id }, { $set : {body : new_text} })
	return result.ok
}

// get single comment
export async function get_comment(db, comment_id) {
	var comments = db.collection('comments')

	var result = await comments.findOne({ _id : comment_id })
	return result
}

// get all comments for a post
export async function get_comments(db, post_id) {
	var comments = db.collection('comments')

	var result = await comments.find({'post_id' : post_id }).toArray()
	return result
}


//Ersätta ett fält i ett objekt