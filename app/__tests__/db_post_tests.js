require('dotenv').config()
import { connect, disconnect } from '../utils/db/db.js'
import { star, unstar } from '../utils/db/posts.js'

describe('DB posts', () => {
	test('hello world', async () => {
		var hello = 'hello world'
		expect(hello).toEqual('hello world')
	})
	
	test('star post', async () => {

		var mail = "test@mail.com"
		var post_id_1 = 15343
		var post_id_2 = 25340
		var post_id_3 = 38465

		var db = await connect('MDB_TEST')

		await db.collection('user_stars').deleteMany({})
		//show the content in 'user_stars'
		var user = await db.collection('user_stars').findOne({ user : mail })
		expect(user).toBe(null)

		//add a post when uninitialized
		var result = await star(db, mail, post_id_1)
		expect(result).toBe(true)

		user = await db.collection('user_stars').findOne({ user : mail })
		expect(user.count).toBe(1)
		expect(user.posts[0]).toBe(post_id_1)

		//add two new post close to each other
		result = await star(db, mail, post_id_2)
		expect(result).toBe(true)
		result = await star(db, mail, post_id_3)
		expect(result).toBe(true)
		
		//database is updated but not the local variable
		expect(user.count).toBe(1)
		expect(user.posts[1]).toBe(undefined)

		user = await db.collection('user_stars').findOne({ user : mail })

		expect(user.count).toBe(3)
		expect(user.posts[0]).toBe(post_id_1)
		expect(user.posts[1]).toBe(post_id_2)
		expect(user.posts[2]).toBe(post_id_3)

		user = await db.collection('user_stars').findOne({ user : mail })

		//try to add an existing post, should not be added
		result = await star(db, mail, post_id_1)
		
		expect(result).toBe(false)
		expect(user.count).toBe(3)
		expect(user.posts[0]).toBe(post_id_1)
		expect(user.posts[1]).toBe(post_id_2)
		expect(user.posts[2]).toBe(post_id_3)

	})

	test('unstar post', async () => {

		var mail = "test@mail.com"
		var post_id_1 = 15343
		var post_id_2 = 25340
		var post_id_3 = 38465

		var db = await connect('MDB_TEST')

		//setup for test
		await db.collection('user_stars').deleteMany({})
		
		result = await unstar(db, mail, post_id_2)
		expect(result).toBe(false)
		
		var result = await star(db, mail, post_id_1)
		expect(result).toBe(true)
		result = await star(db, mail, post_id_2)
		expect(result).toBe(true)
		result = await star(db, mail, post_id_3)
		expect(result).toBe(true)

		var user = await db.collection('user_stars').findOne({ user : mail })

		expect(user.count).toBe(3)
		expect(user.posts[0]).toBe(post_id_1)
		expect(user.posts[1]).toBe(post_id_2)
		expect(user.posts[2]).toBe(post_id_3)

		//test
		result = await unstar(db, mail, post_id_2)
		expect(result).toBe(true)
		
		var user = await db.collection('user_stars').findOne({ user : mail })

		expect(user.count).toBe(2)
		expect(user.posts[0]).toBe(post_id_1)
		expect(user.posts[1]).toBe(post_id_3)
		expect(user.posts[2]).toBe(undefined)

		var post_id = 100
		result = await unstar(db, mail, post_id)
		expect(result).toBe(false)
	})
})
