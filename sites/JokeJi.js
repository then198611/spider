const Thread = require('../model/Thread')
const Crawler = require("crawler");
const Utils = require('../modules/utils')

let begin = 1
let page = 2
let count = 591

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
    begin++
    page++
    if(begin > 591){
      begin = 1
      page = 2
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
        let content = $('#text110').text() ? $('#text110').text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") : ''
        let loveHref = $('#topelite').length ? $('#topelite').attr('onclick').match(/\d+/g)[0] : ''
        let time = $('.pl_ad li').last().length ? $('.pl_ad li').last().text().replace('发布时间：', '').replace(/\//g,'-') : ''
        if(loveHref){
          const loveCrewler = new Crawler({
            maxConnections: 10,
            callback: function(error, res, done){
              if(error){
                console.log(error)
              } else {
                let love = res.body ? res.body.match(/\d+/g)[0] : 0
                insertIntoTable(title, content, love, time, viewNum)
              }
              done()
            }
          })
          loveCrewler.queue(`http://www.jokeji.cn/inc/topelite.asp?nid=${loveHref}`)
        }
        
      }
      done()
    }
  })
  detailCrewlar.queue(href)
}

const insertIntoTable = (title, content, love, time, viewNum) => {
  // TODO insert into table
  if(title && content) {
    Thread.findBySubject(title).then((one) => {
      if(!one){
        Thread.createOne({
          subject: title,
          content: content,
          view: viewNum,
          love: love,
          createdAt: time
        })
      }
    })
  }
}

const JOKE = {
  spider: () => {
    let arr = ['http://www.jokeji.cn/hot.asp']
        // count = 561;
    for(let i = begin + 1; i <= page; i++){
      arr.push(`http://www.jokeji.cn/hot.asp?me_page=${i}`)
    }
    pageCrewler.queue(arr)
  }
}

module.exports = JOKE