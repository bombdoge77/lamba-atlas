import { make_comment, get_comment, auth, upvote_comment, downvote_comment } from '../utils/db/comments.js'
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

    test('upvote comment', async () => {

        var mail_1 = "test@mail.com"
        var mail_2 = "grefe@heltemail.com"
        var mail_3 = "pepletr@mail.com"
        var comment_id = 15343

        var db = await connect('MDB_TEST')

        await db.collection('comment_vote').deleteMany({})
        //show the content in 'comment_vote'
        var comment = await db.collection('comment_vote').findOne({ id : comment_id })
        expect(comment).toBe(null)

        //add a comment when uninitialized
        var result = await upvote_comment(db, comment_id, mail_1)
        expect(result).toBe(true)

        comment = await db.collection('comment_vote').findOne({ id : comment_id })
        expect(comment.count).toBe(1)
        expect(comment.emails[0]).toBe(mail_1)

        //add two new comment close to each other
        result = await upvote_comment(db, comment_id, mail_2)
        expect(result).toBe(true)
        result = await upvote_comment(db, comment_id, mail_3)
        expect(result).toBe(true)
        
        //database is updated but not the local variable
        expect(comment.count).toBe(1)
        expect(comment.emails[1]).toBe(undefined)

        comment = await db.collection('comment_vote').findOne({ id : comment_id })

        expect(comment.count).toBe(3)
        expect(comment.emails[0]).toBe(mail_1)
        expect(comment.emails[1]).toBe(mail_2)
        expect(comment.emails[2]).toBe(mail_3)

        comment = await db.collection('comment_vote').findOne({ id : comment_id })

        //try to add an existing comment, should not be added
        result = await upvote_comment(db, comment_id, mail_1)
        
        expect(result).toBe(false)
        expect(comment.count).toBe(3)
        expect(comment.emails[0]).toBe(mail_1)
        expect(comment.emails[1]).toBe(mail_2)
        expect(comment.emails[2]).toBe(mail_3)

    })

    
    test('downvote comment', async () => {

        var mail_1 = "test@mail.com"
        var mail_2 = "grefe@heltemail.com"
        var mail_3 = "pepletr@mail.com"
        var comment_id = 15343

        var db = await connect('MDB_TEST')

        //setup for test
        await db.collection('comment_vote').deleteMany({})
        
        result = await downvote_comment(db, comment_id, mail_2)
        expect(result).toBe(false)
        
        var result = await upvote_comment(db, comment_id, mail_1)
        expect(result).toBe(true)
        result = await upvote_comment(db, comment_id, mail_2)
        expect(result).toBe(true)
        result = await upvote_comment(db, comment_id, mail_3)
        expect(result).toBe(true)

        var comment = await db.collection('comment_vote').findOne({ id : comment_id })

        expect(comment.count).toBe(3)
        expect(comment.emails[0]).toBe(mail_1)
        expect(comment.emails[1]).toBe(mail_2)
        expect(comment.emails[2]).toBe(mail_3)

        //test
        result = await downvote_comment(db, comment_id, mail_2)
        expect(result).toBe(true)
        
        comment = await db.collection('comment_vote').findOne({ id : comment_id })

        expect(comment.count).toBe(2)
        expect(comment.emails[0]).toBe(mail_1)
        expect(comment.emails[1]).toBe(mail_3)
        expect(comment.emails[2]).toBe(undefined)

        var mail_temp = 100
        result = await downvote_comment(db, comment_id, mail_temp)
        expect(result).toBe(false)
    })

})
