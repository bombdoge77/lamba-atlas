import { add_user, get_user } from '../utils/db/users.js'
import { connect } from '../utils/db/db.js'

describe('DB Users', () => {
  test('hello world', async () => {
    var hello = 'hello world'
    expect(hello).toEqual('hello world')
  })

  var email = 'johndoe11@hello.com'
  var name = 'John Doe'
  var country = 'Sweden'
  var pass = 'hello123'
  var title = 'Resident Dr'
  var bio = 'hello i am john'
  var contact = {
    'whatsapp' : '+12371713',
    'email' : email
  }
  var user = {
    'email': email,
    'name': name,
    'country': country,
    'title' : title,
    'bio' : bio,
    'contact' : contact,
    'pass_hash': expect.any(String)
  }

  test('adding user', async () => {
    var db = await connect('MDB_TEST')
    await db.collection('users').remove({})

    await add_user(db, email, pass, name, country, title, bio, contact)
    var user_retrieved = await get_user(db, email)
    delete user_retrieved['_id']

    expect(user_retrieved).toEqual(user)
  })

  test('adding user with bad email', async () => {
    var db = await connect('MDB_TEST')
    await db.collection('users').remove({})

    var email = 'this is not an email'
    user['email'] = email

    var res = await add_user(db, email, pass, name, country, title, bio, contact)
    expect(res).toEqual(null)

    var email = 'this is not@ an email.com'
    user['email'] = email

    var res = await add_user(db, email, pass, name, country, title, bio, contact)
    expect(res).toEqual(null)

    var email = '@@@@@'
    user['email'] = email

    var res = await add_user(db, email, pass, name, country, title, bio, contact)
    expect(res).toEqual(null)
  })

  //TODO: more add and get tests

  //TODO: auth test

  //TODO: edit tests
})