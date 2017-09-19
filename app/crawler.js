var schedule = require('node-schedule')
var request = require('superagent')
var async = require('async')
var co = require('co')
var path = require('path')
// var Promise = require('bluebird')
// var cheerio = require('cheerio')
var redisClient = require('../utility/redisClient')
var ArticalModel = require('../models/article').ArticalModel

var target = {
    host: 'www.mmxiaowu.com',
    urlPath: '/api/frontend/article/list?page=2&limit=10',
    articalPath: '/article',
    author: 'szxlh'
}

request(path.join(target.host, target.urlPath))
    .end(function (err, data) {
        if (err) {
            console.error('get urls err:', err)
        } else {
            const res = data.body
            let lists = res && res.data && res.data.list || []
            storeCrawlerArticleId(path.join(target.host, target.articalPath), lists)
        }
    })

function storeCrawlerArticleId (key, lists) {
    let ids = lists.map(list => list._id)
    const value = ids.join(',')
    redisClient.getItem(key, function (err, reply) {
        if (err) {
            return console.error('get article from redis err:', err)
        } else if (!reply) {
            redisClient.setItem(key, value, redisClient.defaultExpired)
            createArtical(lists)
        } else {
            const result = reply.split(',')
            lists = lists.filter(list => !result.includes(list._id))
            if (lists && lists.length) {
                redisClient.setItem(key, `${reply},${lists.map(list => list._id).join(',')}`, redisClient.defaultExpired)
                createArtical(lists)
            }
        }
    })
}


function createArtical (lists) {
    async.mapLimit(lists, 1, (list, callback) => {
        co(function* () {
            const url = path.join(target.host, target.articalPath, list._id)
            try {
                const res = yield getArticle(url)
                const doc =  {
                    title: list.title || '',
                    author: target.author,
                    type: list.category_name,
                    introduction: list.content,
                    content: res.text,
                    path: list._id,
                    ref: url
                }
                callback(null, doc)
            } catch (e) {
                callback(e)
            }
        })
    }, (err, docs) => {
        ArticalModel.insertMany(docs)
            .then(results => {
                // console.log('results======', results)
            })
    })
}

function getArticle (url) {
    return new Promise((resolve, reject) => {
        request(url)
            .end((err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
    })
}

// var rule = new schedule.RecurrenceRule()
// var times = []
// for (var i = 0; i < 60; i+=5) {
//     times.push(i)
// }
// rule.second = times
// var c = 0
// var j = schedule.scheduleJob(rule, function () {
//     console.log(c++)
//     if (c === 5) {
//         j.cancel()
//     }
// })
