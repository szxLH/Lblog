import moment from 'moment'
import request from 'superagent'
import crypto from 'crypto'

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
            resolve(res.body)
          }
        })
    })
  }
}

export function getMD5 (str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

export function getIdentity () {
  return true
}
