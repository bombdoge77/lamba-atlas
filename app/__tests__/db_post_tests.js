import { connect, disconnect } from '../utils/db/db.js'

describe('DB posts', () => {
	test('hello world', async () => {
		var hello = 'hello world'
		expect(hello).toEqual('hello world')
	})
})