var accessToken = "";

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token) {
  accessToken = token;
}

export async function isLoggedIn() {
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