module.exports = {
  NODE_ENV: 'development',
  port: 3000,
  mongodb: 'mongodb://127.0.0.1/Lblog',
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  secret: 'shaniu',
  CacheExpired: 5 * 60 * 1000,
  admin: {
    name: 'szxlh',
    password: '973d260d13c0d9a968b550d7a9325433'
  }
}
