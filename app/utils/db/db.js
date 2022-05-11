require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

export async function connect(name = process.env.DB_NAME) {
	// TODO: check for active connections?
	await client.connect()
	var db = client.db(name)
	return db
}

// maybe not needed?
export async function disconnect() {
	await client.close()
}
