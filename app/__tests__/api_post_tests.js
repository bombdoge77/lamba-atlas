require('dotenv').config()
import { createMocks } from 'node-mocks-http'
import postHandler from '../pages/api/posts/post/[id].js'
import commentHandler from '../pages/api/posts/comment.js'
import { connect, disconnect } from '../utils/db/db.js'
import { add_user } from '../utils/db/users.js'
import authHandler from '../pages/api/users/auth.js'
var ObjectID = require('mongodb').ObjectID

describe('API for posts and comments', () => {
	test('hello world', () => {
		var hello = 'hello world'
		expect(hello).toEqual('hello world')
	})

	var jwt

	test('populate database', async () => {
		var db = await connect('MDB_TEST')
		await db.collection('users').deleteMany({})
		await db.collection('posts').deleteMany({})
		await db.collection('comments').deleteMany({})
		await add_user(db, 'asd@mail.com', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello')
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				payload : {
					email : 'asd@mail.com',
					password : 'hello'
				},
			},
		})

		await authHandler(req, res)
		expect(res._getStatusCode()).toBe(200)
		jwt = res._getHeaders().authorization
		await disconnect()
	})

	var id = new ObjectID()

	var post = {
			_id : id,
			patient : {
				age : 10,
				gender : 'male',
				weight : 45.6,
				height : 153.4
			},
			background : 'this is the medical history of the patient',
			current_treatment : 'current treatment of the patient',
			pics : [],
			question : 'this is the question'
		}

	test('make post', async () => {
		// add post

		const { req, res } = createMocks({
			method: 'POST',
			headers : {
				Authorization : jwt
			},
			body: {
				//jwt : jwt,
				payload : post,
			},
		})
		
		await postHandler(req, res)
		expect(res._getStatusCode()).toBe(200)
	})

	test('get post', async () => {
		// get post
		const { req, res } = createMocks({
			method: 'GET',
			headers : {
				Authorization : jwt
			},
			query: {
				id : id
			}
		})

		await postHandler(req, res)
		expect(res._getStatusCode()).toBe(200)
		var received = JSON.parse(res._getData())
		var post_comp = post
		delete received._id
		delete post_comp._id
		expect(received).toStrictEqual(post_comp)
	})
})