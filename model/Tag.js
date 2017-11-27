const Sequelize = require('sequelize');
const seq = require('../modules/db');


const Tag = seq.define('fl_tags',{
    "discussions_count": {
        type: Sequelize.INTEGER
    },
    "last_time": {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    "last_discussion_id": {
        type: Sequelize.INTEGER
    }
},{
    'timestamps': false,  
    "createdAt": false,  
    "updatedAt": false,  
    "deletedAt": false
})

const A = {
    modalName: Tag,
    findById: (id) => {
        return Tag.findById(id)
    },
    createOne: (obj) => {
        return Tag.create(obj)
    },
    updateById: (id, obj) => {
        return Tag.update(obj,{
            where:{
                id: id
            }
        })
    }
}

module.exports = A