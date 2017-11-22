const Sequelize = require('sequelize');
const seq = require('../modules/db');


const Post = seq.define('fl_posts',{
    "discussion_id": {
        type: Sequelize.INTEGER
    },
    number: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    time: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    "user_id": {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'comment'
    },
    content: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    is_approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},{
    'timestamps': false,  
    "createdAt": false,  
    "updatedAt": false,  
    "deletedAt": false
})

const A = {
    modalName: Post,
    findById: (id) => {
        return Post.findById(id)
    },
    findByContent: (t) => {
        return Post.findOne({
            where: {
                content: `<t>${t}</t>`
            }
        })
    },
    createOne: (obj) => {
        return Post.create(obj)
    },
    bulkCreate: (arr) => {
        return Post.bulkCreate(arr)
    },
    updateById: (id, obj) => {
        return Post.update(obj,{
            where:{
                id: id
            }
        })
    },
}

module.exports = A