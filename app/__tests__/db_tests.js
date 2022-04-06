import { add_user, get_user, auth } from '../utils/db/users.js'
import { connect } from '../utils/db/db.js'

describe('DB Users', () => {
  test('hello world', () => {
    var hello = 'hello world'
    expect(hello).toEqual('hello world')
  })

  var email = 'johndoe11@hello.com'
  var name = 'John Doe'
  var hospital = 'St Johns Hospital'
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
    'hospital' : hospital,
    'country': country,
    'title' : title,
    'bio' : bio,
    'contact' : contact,
    'pass_hash': expect.any(String)
  }

  test('adding user', async () => {
    var db = await connect('MDB_TEST')
    await db.collection('users').deleteMany({})

    await add_user(db, email, pass, name, hospital, country, title, bio, contact)
    var user_retrieved = await get_user(db, email)
    delete user_retrieved['_id']

    expect(user_retrieved).toEqual(user)
  })

  test('adding user with bad email', async () => {
    var db = await connect('MDB_TEST')
    await db.collection('users').deleteMany({})

    var email = 'johndoe11@mail.com'
    var res = await add_user(db, email, pass, name, hospital, country, title, bio, contact)
    var res = await add_user(db, email, pass, name, hospital, country, title, bio, contact)
    expect(res).toEqual(null)

    var email = 'this is not an email'
    user['email'] = email

    var res = await add_user(db, email, pass, name, hospital, country, title, bio, contact)
    expect(res).toEqual(null)

    var email = 'this is not@ an email.com'
    user['email'] = email

    var res = await add_user(db, email, pass, name, hospital, country, title, bio, contact)
    expect(res).toEqual(null)

    var email = '@@@@@'
    user['email'] = email

    var res = await add_user(db, email, pass, name, hospital, country, title, bio, contact)
    expect(res).toEqual(null)
  })

  //TODO: more add tests

  //TODO: more get tests

  test('get users', async () => {
    var db = await connect('MDB_TEST')
    await db.collection('users').deleteMany({})

    var email1 = 'johndoe11@mail.com'
    var email2 = 'jonas@mail.se'
    var contact1 = {
      'whatsapp' : '+12371713',
      'email' : 'email@mail.com'
    }
    var contact2 = {
      'whatsapp' : '+1212371713',
      'email' : 'hej@mail.com'
    }
    await add_user(db, email1, 'hello123', 'John Doe', 'St Johns Hospital', 'Sweden', 'Dr', 'Hello i am John', contact1)
    await add_user(db, email2, 'asdahbjv', 'Jonas Persson', 'Akademiska', 'Sweden', 'Dr', 'Hello i am Jonas', contact2)

    var res1 = await get_user(db, email1)
    var res2 = await get_user(db, email2)

    expect(res1['email']).toEqual(email1)
    expect(res2['email']).toEqual(email2)
    expect(res1['pass_hash']).toEqual(expect.any(String))
    expect(res2['pass_hash']).toEqual(expect.any(String))
  })

  test('get user profile (no email and pwd hash)', async () => {

  })

  //TODO: auth test
  test('successful auth', async () => {
    var db = await connect('MDB_TEST')
    await db.collection('users').deleteMany({})

    await add_user(db, 'asd@mail.com', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello')

    expect(await auth(db, 'asd@mail.com', 'hello')).toBe(true)
    expect(await auth(db, 'asd@mail.com', 'nothello')).toBe(false)

    await db.collection('users').deleteMany({})
  })

  //TODO: edit tests
})