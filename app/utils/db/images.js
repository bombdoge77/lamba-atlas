export async function add_images(db, images) {
	var images = db.collection('images')
	var result = await images.insertMany(images)
	if !result.acknowledged return null
	return result.insertedIds
}

export async function remove_images(db, image_ids) {
	var images = db.collection('images')
	var result = await images.deleteMany({ _id : { $in : image_ids } })
	return result.acknowledged
}

export async function get_images(db, image_ids) {
	var iamges = db.collection('images')
	var result = await images.find({ _id : { $in : image_ids } }).toArray()
	return result
}