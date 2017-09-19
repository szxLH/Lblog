module.exports = {
  NODE_ENV: 'development',
  port: 5000,
  mongodb:'mongodb://127.0.0.1/Lblog',
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  CacheExpired: 60 * 60 * 24
}