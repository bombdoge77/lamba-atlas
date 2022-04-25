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
  return response
}

export async function editProfileRequest(data) {
  const response = await fetch('api/users/profile', {
    method: 'POST',
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
  return response
} 