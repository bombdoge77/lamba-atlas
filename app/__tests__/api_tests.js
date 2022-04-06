import { add_user } from '../utils/db/users.js'
import { connect, disconnect } from '../utils/db/db.js'
import { createMocks } from 'node-mocks-http'
import authHandler from '../pages/api/users/auth.js'

describe('API User Routes', () => {
	test('hello world', () => {
		var hello = 'hello world'
    	expect(hello).toEqual('hello world')
	})
	
	test('populate database', async () => {
		var db = await connect('MDB_TEST')
		await db.collection('users').deleteMany({})
		await add_user(db, 'asd@mail.com', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello')
	})
	
	test('successful auth', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
			  username : 'asd@mail.com',
			  password : 'hello'
			},
		})
		
		await authHandler(req, res)

		expect(res._getStatusCode()).toBe(200)
	})

	test('failed auth', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
			  username : 'asd@mail.com',
			  password : '123'
			},
		})
		
		await authHandler(req, res)

		expect(res._getStatusCode()).toBe(401)
	})

	test('empty auth', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
			  username : '',
			  password : ''
			},
		})
		
		await authHandler(req, res)

		expect(res._getStatusCode()).toBe(400)
	})

	test('clear user database', async () => {
		var db = await connect('MDB_TEST')
		await db.collection('users').deleteMany({})
	})
})