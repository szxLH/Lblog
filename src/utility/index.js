import moment from 'moment'
import request from 'superagent'

export function format (time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

export const $http = {
  GET (url, query = {}) {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .query(query)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res.body)
          }
        })
    })
  },
  POST (url, query = {}, body = {}) {
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .query(query)
        .send(body)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }
}

export function getIdentity () {
  return true
}
