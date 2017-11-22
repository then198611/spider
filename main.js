const cron = require('node-cron');
const NET = require('./sites/net')
const JOKE = require('./sites/JokeJi')

// QSBK.spider()
let i = 1
cron.schedule('*/10 * * * * *', () => {
  console.log('=======================begin=====================')
  console.log(new Date())

  console.log(i)
  NET.spider()
  JOKE.spider(i)
  i++

  console.log('=======================end=====================')
})