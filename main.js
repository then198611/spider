const cron = require('node-cron');
const NET = require('./sites/net')
const NETGIF = require('./sites/netGif')
const JOKE = require('./sites/JokeJi')

// QSBK.spider()
let i = 1
cron.schedule('*/10 * * * * *', () => {
  console.log('=======================begin=====================')
  console.log(new Date())

  console.log(i)
  NETGIF.spider()
  NET.spider()
  JOKE.spider(i)
  i++

  console.log('=======================end=====================')
})