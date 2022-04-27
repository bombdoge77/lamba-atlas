require('dotenv').config()
import { add_user, get_user } from '../utils/db/users.js'
import { connect, disconnect } from '../utils/db/db.js'
import { createMocks } from 'node-mocks-http'
import authHandler, { authenticateToken } from '../pages/api/users/auth.js'
import regHandler from '../pages/api/users/register'

describe('API User Routes', () => {
	test('hello world', () => {
		var hello = 'hello world'
    	expect(hello).toEqual('hello world')
	})
	
	test('populate database', async () => {
		var db = await connect('MDB_TEST')
		await db.collection('users').deleteMany({})
		await add_user(db, 'asd@mail.com', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello')
		await disconnect()
	})
	
	var jwt

	test('successful auth', async () => {
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

		//var body = JSON.parse(res._getData())
		var jwt = res._getHeaders().authorization

		expect(res._getStatusCode()).toBe(200)
		var jwt_decoded = authenticateToken(jwt)
		expect(jwt_decoded.user).toBe('asd@mail.com')
	})

	test('JWT auth', async () => {

	})

	test('failed auth', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				payload : {
					email : 'asd@mail.com',
			  	password : '123'
				},
			},
		})
		
		await authHandler(req, res)

		expect(res._getStatusCode()).toBe(401)
	})

	test('empty auth', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				payload : {
					email : '',
			  	password : ''
				},
			},
		})
		
		await authHandler(req, res)

		expect(res._getStatusCode()).toBe(401)
	})

	test('user registration', async () => {
		// email, password, name, hospital, country, title, bio, contact

		var user = {
			email : 'hello@world.com',
			password : '123hello',
			name : 'hello',
			hospital : 'hello',
			country : 'hello',
			title : 'hello',
			bio : 'hello',
			contact : 'hello'
		}

		const { req, res } = createMocks({
			method: 'POST',
			body: {
			  payload : user
			},
		})

		await regHandler(req, res)

		expect(res._getStatusCode()).toBe(200)

	})

	test('edit user', async () => {
		var db = await connect('MDB_TEST')

		await disconnect(db)
	})

	// TODO: get profile tests

	test('clear user database', async () => {
		var db = await connect('MDB_TEST')
		await db.collection('users').deleteMany({})
		await disconnect(db)
	})

	// TODO: invite code tests
})