const crypto = require('crypto')

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