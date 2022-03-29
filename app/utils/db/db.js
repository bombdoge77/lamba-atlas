require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

export async function connect() {
	// TODO: check for active connections?
	await client.connect()
	var db = client.db('MDB1')
	return db
}

//TODO: remove
export async function get_posts(db) {
	var cursor = db.collection('posts').find({});
	var posts = await cursor.toArray();
	return posts;
};
