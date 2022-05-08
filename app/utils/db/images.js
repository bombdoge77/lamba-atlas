export async function add_images(db, images) {
	var images = db.collection('images')
	var result = await images.insertMany(images)
	if !result.acknowledged return null
	return result.insertedIds // check docs?
}

export async function remove_images(db, image_ids) {
	var images = db.collectio('images')
	var result = await images.deleteMany({ _id : { $in : image_ids } })
	return result.acknowledged
}