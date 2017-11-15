

const Thread = require('../model/Thread')
const Crawler = require("crawler");
const Moment = require('moment')

const crawler = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done){
    if(error){
      console.log(error)
    } else {
      let $ = res.$
      let data = JSON.parse(res.body.slice(6,res.body.length - 1))
      for( let key in data) {
        let arr = data[key]
        arr.forEach((item) => {
          let content = item.img ? item.digest + `<img src="${item.img}" />` : item.digest
          let title = content.slice(0,20)
          if(title && content) {
            Thread.findBySubject(title).then((one) => {
              if(!one){
                Thread.createOne({
                  subject: title,
                  content: content,
                  createdAt: Moment().format('YYYY-MM-DD h:mm:ss')
                })
              }
            })
          }
        });
      }
    }
    done()
  }
})

const NET = {
  spider: () => {
    crawler.queue('http://3g.163.com/touch/jsonp/joke/chanListNews/T1419316284722/2/0-10.html?callback=joke0')
  }
}

module.exports = NET