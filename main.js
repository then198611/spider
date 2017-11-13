const cron = require('node-cron');
const NET = require('./sites/net')

// QSBK.spider()
cron.schedule('*/300 * * * *', () => {
  console.log('=======================begin=====================')
  console.log(new Date())

  NET.spider()
  JOKE.spider()

  console.log('=======================end=====================')
})