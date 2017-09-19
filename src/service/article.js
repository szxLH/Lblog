import { $http } from '$utility'

export function get (query) {
  const url = '/article/get'
  return $http.GET(url, query)
}

export function update (query = {}, body = {}) {
  const url = '/article/update'
  return $http.POST(url, query, body)
}
