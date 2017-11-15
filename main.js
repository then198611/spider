const cron = require('node-cron');
const NET = require('./sites/net')
const JOKE = require('./sites/JokeJi')

// QSBK.spider()
cron.schedule('*/300 * * * *', () => {
  console.log('=======================begin=====================')
  console.log(new Date())

  NET.spider()
  JOKE.spider()

  console.log('=======================end=====================')
})