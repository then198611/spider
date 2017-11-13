const Thread = require('../model/Thread')
const Crawler = require("crawler");


const contentCrawler = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done){
    if(error){
      console.log(error)
    } else {
      let $ = res.$
      console.log(`crawler:${res.options.uri}`)
      console.log($('div.content-text').text())
    }
    done()
  }
})

const idCrawler = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done){
    if(error){
      console.log(error)
    } else {
      let $ = res.$
      // let idHrefArr = []
      // console.log(`crawler:${res.options.uri}`)
      $('article').each( (i,o) => {
        let article = $(o)
        let href = $(o).find('a.text').attr('href')
        // idHrefArr.push(`https://www.qiushibaike.com${href}`)
        console.log(`https://www.qiushibaike.com${href}`)
        contentCrawler.queue(`https://www.qiushibaike.com${href}`)
      })
    }
    done()
  }
})

const QSBK = {
  spider: () => {
    let len = 100
    // let arr =[]
    // for (let i = 1; i < len; i++) {
    //   arr.push(`https://www.qiushibaike.com/text/page/${i}/`)
    // }
    // idCrawler.queue(arr)
    // idCrawler.queue(`https://www.qiushibaike.com/article/119643241`)
  }
}

module.exports = QSBK