import { getAccessToken, getUser } from "./auth"
import { format, format_inverse } from './categories.js'
import categories from './categories.js'

export async function signUpRequest(data) {
  const response = await fetch('/api/users/register', {
    method: "POST",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
      payload: {
        email: data.get('email'),
        name: data.get('name'),
        hospital: data.get('hospital'),
        country: data.get('country'),
        title: data.get('title'),
        bio: data.get('bio'),
        contact: data.get('contact'),
        password: data.get('password'), //eller är det 'pass_hash' : hash
      }
    })
  })
  .then((res) => {return res})
  return response
}

export async function getProfileRequest(user) {
  var token = getAccessToken()
  const response = await fetch('/api/users/profile', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : token
    },
    body: JSON.stringify({
      user: user,
    })
  })
  .then((res) => {return res.ok ? res.json() : null})
  return response
}

export async function editProfileRequest(data) {
  var token = getAccessToken()
  const response = await fetch('/api/users/profile', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization' : token
      },
    body: JSON.stringify({
      payload: {
        email: data.get('email'),
        name: data.get('name'),
        hospital: data.get('hospital'),
        country: data.get('country'),
        title: data.get('title'),
        bio: data.get('bio'),
        contact: data.get('contact'),
      }
    })
  })
  .then((res) => {return res.ok ? res.status : null})
  return response
} 

export async function isLoggedIn() {
  const accessToken = getAccessToken()
  const result = await fetch('/api/users/auth', {
    method: "PUT",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": accessToken
    },
    body: JSON.stringify({
      payload: {}
    })
  })
  .then((res) => {return res.ok ? res.body : null})
  return result
}

export async function loginRequest(data) {
  const response = await fetch('/api/users/auth', {
    method: "POST",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
      payload: {
        email: data.get('email'),
        password: data.get('password'),
      }
    })
  })
  .then((res) => {return res.ok ? res : null})
  return response
}

export async function newPostRequest(data) {
  var token = getAccessToken()

  const subcategory = data.get('category')
  const subcategory_fmt = format_inverse[subcategory]
  const category = categories.find(elem => elem.bodyPart === subcategory).bodyCategory
  const category_fmt = format_inverse[category]

  if (!category_fmt) return

  const response = await fetch('/api/posts/post/1', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": token
      },
    body: JSON.stringify({
      payload: {
        user: getUser(),
        title: data.get('title'),
        situation: data.get('situation'),
        gender: data.get('gender'),
        age: data.get('age'),
        weight: data.get('weight'),
        height: data.get('height'),
        // pictures: {
        //   pre_op: data.getAll('picture_1'),
        //   during_op: data.getAll('picture_2'),
        //   post_op: data.getAll('picture_3')
        // },
        med_history: data.get('med_history'),
        current_treatment: data.get('current_treatment'),
        analysis: data.get('analysis'),
        recommendation: data.get('recommendation'),
        category: {
          bodyCategory : category_fmt,
          bodyPart : subcategory_fmt
        },
        tags: data.get('tags'),
        consent: data.get('consent')
      }
    })
  })
  .then((res) => {return res.ok ? res.status : null})
  return response
}

export async function getPostRequest(pid) {
  const response = await fetch(`/api/posts/post/${pid}`, {
    method : 'GET',
    headers : {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": getAccessToken()
    }
  })
  .then((res) => {return res.ok ? res.json() : null})
  return response
}

export async function getCommentsRequest(pid) {
  const response = await fetch(`/api/posts/comment/${pid}`, {
    method : 'GET',
    headers : {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": getAccessToken()
    }
  })
  .then((res) => {return res.ok ? res.json() : null})
  return response
}

export async function addCommentsRequest(data) {
  const response = await fetch('/api/posts/comment/makecomment', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": getAccessToken()
      },
    body: JSON.stringify({
      payload: data
    })
  })
  .then((res) => {return res.status})
  return response
}

export async function searchPosts(text, category) {
  var token = getAccessToken()
  const response = await fetch('/api/posts/search', {
    method: "POST",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": token
    },
    body: JSON.stringify({
      text: text,
      category: category,
    })
  })
  .then((res) => {return res.ok ? res.json() : res.status})
  return response
}