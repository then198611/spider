const Insert = require('../modules/insert')
const Crawler = require("crawler");
const Utils = require('../modules/utils')


const pageCrewler = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done){
    if(error){
      console.log(error)
    } else {
      let $ = res.$
      $('.main_14').each((i,o) => {
        let item = $(o)
        let title = item.text()
        let href = 'http://www.jokeji.cn' + item.attr("href")
        let viewNum = item.parent().next().text().match(/\d+/g)[0]
        getDetail(title, href, viewNum)
      })
    
    }
    done()
  }
})

const getDetail = (title, href, viewNum) => {
  const detailCrewlar = new Crawler({
    maxConnections: 10,
    callback: function(error, res, done){
      if(error){
        console.log(error)
      } else {
        let $ = res.$
        let content = $('#text110').text() ? $('#text110').text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "").replace(/\r\n/g,'<br />') : ''
        let loveHref = $('#topelite').length ? $('#topelite').attr('onclick').match(/\d+/g)[0] : ''
        let time = $('.pl_ad li').last().length ? $('.pl_ad li').last().text().replace('发布时间：', '').replace(/\//g,'-') : ''
        Insert({
          title: title,
          content: content
        })
      }
      done()
    }
  })
  detailCrewlar.queue(href)
}

const JOKE = {
  spider: (i = 1) => {
    let count = 591
    if(i > count){
      console.log('joke done...')
      return false;
    }
    let url = i === 1 ? 'http://www.jokeji.cn/hot.asp' : `http://www.jokeji.cn/hot.asp?me_page=${i}`
    pageCrewler.queue(url)
  }
}

module.exports = JOKE