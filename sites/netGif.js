

const Insert = require('../modules/insert')
const Crawler = require("crawler");
const Moment = require('moment')


const crawlerDetail = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done){
    if(error){
      console.log(error)
    } else {
      let $ = res.$
      let title = $('.g-title').text()
      let data = $('script').eq(1).text().replace('window.DATA = ', '')
      if(data) {
        data = JSON.parse(data)
      }
      let html = ''
      $('.js-main-content p').each((i, o) => {
        html += `<p>${$('.js-main-content p').eq(i).text()}</p>`
        html += `<img src="${data.img[i].src}" />`
      })
      
      html = `<t>${html}</t>`
      Insert({
        title: title,
        content: html,
        tag_id: 4
      })
    }
    done()
  }
})

const crawler = new Crawler({
  maxConnections: 10,
  jQuery: false,
  callback: function(error, res, done){
    if(error){
      console.log(error)
    } else {
      // let $ = res.$
      let data = res.body && JSON.parse(res.body)
      data.tab_list && data.tab_list.forEach((o, i) => {
        crawlerDetail.queue(`https://c.m.163.com/news/a/${o.postid}.html?from=subscribe&fromhistory=1`)
      })
    }
    done()
  }
})

const NET = {
  spider: () => {
    crawler.queue('https://c.m.163.com/nc/subscribe/list/T1492669834770/all/0-20.html')
  }
}

module.exports = NET