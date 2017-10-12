import { $http } from '$utility'

export function getUser (query) {
  const url = '/user/get'
  return $http.GET(url, query)
}

export function login (user = {}) {
  const url = '/user/login'
  return $http.POST(url, {}, user)
}

export function logout () {
  const url = '/user/logout'
  return $http.POST(url)
}
