const Sequelize = require('sequelize');
const Post = require('../model/Post')
const Discussion = require('../model/Discussion')
const DiscussionTag = require('../model/DiscussionTag')
const User = require('../model/User')
const Utils = require('../modules/utils')

const Insert = (obj = {}) => {
  if(obj.title && obj.content) {
    Post.findByContent(obj.content).then((one) => {
      if(!one){
        let uid = Utils.getRandom()
        Discussion.createOne({
          title: obj.title,
          slug: obj.title,
          comments_count: 1,
          participants_count: 1,
          number_index: 1,
          start_user_id: uid,
          last_user_id: uid,
          last_post_number: 1,
        }).then((dis) => {
          Post.createOne({
            discussion_id: dis.id,
            number: 1,
            user_id: uid,
            type: 'comment',
            content: `<t>${obj.content}</t>`
          }).then((post) => {
            Discussion.updateById(dis.id,{
              start_post_id: post.id,
              last_post_id: post.id
            })
            DiscussionTag.createOne({
              discussion_id: dis.id
            })
            User.findById(uid).then((user) => {
              User.updateById(uid,{
                discussions_count: Sequelize.literal('`discussions_count` +1'),
                comments_count: Sequelize.literal('`comments_count` +1')
              })
            })
          })
        })
      }
    })
  }
}

module.exports = Insert
