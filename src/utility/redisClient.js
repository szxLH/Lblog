var redis = require('redis')
var config = require('config-lite')
var client = redis.createClient(config.redis.port, config.redis.host)
console.log('redisClient is called!!!')


client.on('error', function (err) {
    console.error('redis连接出错', err)
    process.exit(1)
})

exports.setItem = function (key, value, expired, callback) {
    client.set(key, JSON.stringify(value), function (err) {
        if (err) {
            return callback && callback(err)
        }
        if (expired) {
            client.expire(key, expired)
        }
        return callback && callback(null)
    })
}

exports.getItem = function (key, callback) {
    client.get(key, function (err, reply) {
        if (err) {
            return callback(err)
        }
        return callback(null, JSON.parse(reply))
    })
}

exports.removeItem = function (key, callback) {
    client.del(key, function (err) {
        if (err) {
            return callback(err)
        }
        return callback && callback(null)
    })
}

exports.defaultExpired = config.CacheExpired
