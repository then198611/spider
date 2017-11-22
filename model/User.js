const Sequelize = require('sequelize');
const seq = require('../modules/db');


const User = seq.define('fl_users',{
    "discussions_count": {
        type: Sequelize.INTEGER
    },
    "comments_count": {
        type: Sequelize.INTEGER
    }
},{
    'timestamps': false,  
    "createdAt": false,  
    "updatedAt": false,  
    "deletedAt": false
})

const A = {
    modalName: User,
    findById: (id) => {
        return User.findById(id)
    },
    createOne: (obj) => {
        return User.create(obj)
    },
    updateById: (id, obj) => {
        return User.update(obj,{
            where:{
                id: id
            }
        })
    }
}

module.exports = A