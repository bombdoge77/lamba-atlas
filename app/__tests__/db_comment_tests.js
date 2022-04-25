import { make_comment, get_comment, auth } from '../utils/db/comments.js'
import { create_post } from '../utils/db/posts.js'
import { connect, disconnect } from '../utils/db/db.js'
import { add_user } from '../utils/db/users.js'

const db_name = 'MDB_TEST'

describe('DB Comments', () => {
    test('hello world', () => {
        var hello = 'hello world'
        expect(hello).toEqual('hello world')
    })

    test('init', async () => {
        var db = await connect(db_name)

        await db.collection('users').deleteMany({})
        await db.collection('posts').deleteMany({})
        await db.collection('comments').deleteMany({})

        var email = 'bosvensson@hotmail.com'
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

        await add_user(db, email, pass, name, hospital, country, title, bio, contact)

        var post = {
            title : 'hello',
            body : 'hello world',
            user : 'bosvensson@hotmail.com'
        }

        await create_post(db, post)
    })

    test('create and get comment', async () => {
        var db = await connect(db_name)
        var email = 'bosvensson@hotmail.com'
        var post = await db.collection('posts').findOne({'user' : email})
        var text = 'Något viktigt om Case 567'
        var is_reply = false
        var result = await make_comment(db, email, post._id, text, is_reply)

        expect(result).toBe(true)
        
        // TODO: get comment from database
    })

})
