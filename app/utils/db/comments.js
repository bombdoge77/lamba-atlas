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

export async function upvote_comment(db, comment_id, email) {
	var comment_vote_list = db.collection('comment_vote')

	var comment_vote = await comment_vote_list.findOne({ id : comment_id })
	
	var vote_count = 1
	if (comment_vote == null) {
		var comment_vote_new = {
			'id' : comment_id,
			'count' : vote_count,
			'emails' : [ email ]
		}
		var result = await comment_vote_list.insertOne(comment_vote_new)
		return result.acknowledged

	} else {
		if (comment_vote.emails.includes(email)) {
			return false
		}
		vote_count = comment_vote.count
		vote_count = vote_count + 1
		await comment_vote_list.updateOne({ id : comment_id }, {$set:{ 'count' : vote_count}})
		await comment_vote_list.updateMany({ id : comment_id }, {$push:{ 'emails' : email }})
		return true
	}
}

export async function downvote_comment(db, comment_id, email) {
	var comment_vote_list = db.collection('comment_vote')

	var comment_vote = await comment_vote_list.findOne({ id : comment_id })
	
	var vote_count = 1
	if (comment_vote == null) {
		return false
	} else {
		if (!comment_vote.emails.includes(email)) {
			return false
		}
		vote_count = comment_vote.count
		vote_count = vote_count - 1
		await comment_vote_list.updateOne({ id : comment_id }, {$set:{ 'count' : vote_count}})
		await comment_vote_list.updateMany({ id : comment_id }, {$pull:{ 'emails' : email }})
		return true
	}
}


//Ersätta ett fält i ett objekt