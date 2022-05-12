var accessToken = "";

var email = "";

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token) {
  accessToken = token;
}

export function setUser(data) {
  email = data;
}

export function getUser() {
  return email;
}