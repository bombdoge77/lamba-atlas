require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

async function connect() {
	if (!client.isConnected()) {
		await client.connect()
	}
	var db = client.db('MDB1')
	return db
}

/*
async function getPosts() {
	var cursor = this.db.collection('posts').find({});
	const posts = await cursor.toArray();
	return posts;
};
*/

module.exports = { connect };
