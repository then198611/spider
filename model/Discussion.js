const Sequelize = require('sequelize');
const seq = require('../modules/db');


const Discussion = seq.define('fl_discussions',{
    "title": {
        type: Sequelize.STRING
    },
    "slug": {
        type: Sequelize.STRING
    },
    "comments_count": {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    "participants_count": {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    "number_index": {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    "start_time": {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    "start_user_id": {
        type: Sequelize.INTEGER
    },
    "start_post_id": {
        type: Sequelize.INTEGER
    },
    "last_user_id": {
        type: Sequelize.INTEGER
    },
    "last_post_id": {
        type: Sequelize.INTEGER
    },
    "last_post_number": {
        type: Sequelize.INTEGER
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
    modalName: Discussion,
    findById: (id) => {
        return Discussion.findById(id)
    },
    findByContent: (t) => {
        return Discussion.findOne({
            where: {
                content: `<t>${t}</t>`
            }
        })
    },
    createOne: (obj) => {
        return Discussion.create(obj)
    },
    bulkCreate: (arr) => {
        return Discussion.bulkCreate(arr)
    },
    updateById: (id, obj) => {
        return Discussion.update(obj,{
            where:{
                id: id
            }
        })
    },
}

module.exports = A