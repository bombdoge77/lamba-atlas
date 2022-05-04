import { getAccessToken, getUser } from "./auth"

export async function signUpRequest(data) {
  const response = await fetch('api/users/register', {
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

export async function getProfileRequest() {
  var token = getAccessToken()
  const response = await fetch('api/users/profile', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jwt: token,
    })
  })
  .then((res) => {return res.ok ? res.json() : null})
  return response
}

export async function editProfileRequest(data) {
  var token = getAccessToken()
  const response = await fetch('api/users/profile', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      },
    body: JSON.stringify({
      jwt: token,
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
  const result = await fetch('api/users/auth', {
    method: "PUT",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    //"Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      jwt : accessToken,
      payload: {}
    })
  })
  .then((res) => {return res.ok ? res.body : null})
  return result
}

export async function loginRequest(data) {
  const response = await fetch('api/users/auth', {
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
  .then((res) => {return res.ok ? res.json() : null})
  return response
}

export async function newPostRequest(data) {
  var token = getAccessToken()
  const response = await fetch('api/users/profile', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      },
    body: JSON.stringify({
      jwt: token,
      payload: {
        gender: data.get('gender'),
        age: data.get('age'),
        weight: data.get('weight'),
        height: data.get('height'),
        picture_1: data.get('picture_1'),
        picture_2: data.get('picture_2'),
        picture_3: data.get('picture_3'),
        med_history: data.get('med_history'),
        current_treatment: data.get('current_treatment'),
        analysis: data.get('analysis'),
        recommendation: data.get('recommendation'),
        category: data.get('category'),
        tags: data.get('tags'),
        consent: data.get('consent')
      }
    })
  })
  .then((res) => {return res.ok ? res.status : null})
  return response
} 