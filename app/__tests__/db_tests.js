import { add_user, get_user } from '../utils/db/users.js'
import { connect } from '../utils/db/db.js'

describe('DB', () => {
  test('hello world', async () => {
    var hello = 'hello world'
    expect(hello).toEqual('hello world')
  })

  test('adding users', async () => {
    var db = await connect('MDB_TEST')

    var email = 'johndoe11'
    var name = 'John Doe'
    var country = 'Sweden'
    var pass = 'hello123'
    var user = {
      'email': email,
      'name': name,
      'country': country,
      'pass_hash': pass
    }
    await add_user(db, email, pass, name, country)
    var user_retrieved = await get_user(db, email)
    delete user_retrieved._id

    expect(user_retrieved).toEqual(user)
  })
})