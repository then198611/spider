const Sequelize = require('sequelize');
const seq = require('../modules/db');


const DiscussionTag = seq.define('fl_discussions_tags',{
    "discussion_id": {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    "tag_id": {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        primaryKey: true
    }
},{
    'timestamps': false,  
    "createdAt": false,  
    "updatedAt": false,  
    "deletedAt": false
})

const A = {
    modalName: DiscussionTag,
    createOne: (obj) => {
        return DiscussionTag.create(obj)
    }
}

module.exports = A