const Sequelize = require('sequelize');
const seq = require('../modules/db');


const Thread = seq.define('thread',{
    subject: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING(10000),
        defaultValue: 0
    },
    view: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    love: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    author: {
        type: Sequelize.STRING
    }
})
Thread.sync().then( ()=>{
// Thread.sync({force: true}).then( ()=>{
//     return User.create({
//         name: 'john',
//         password: '123456'
//     })
})

const A = {
    modalName: Thread,
    findById: (id) => {
        return Thread.findById(id)
    },
    findBySubject: (t) => {
        return Thread.findOne({
            where: {
                subject: t
            }
        })
    },
    createOne: (obj) => {
        return Thread.create(obj)
    },
    bulkCreate: (arr) => {
        return Thread.bulkCreate(arr)
    },
    updateById: (id, obj) => {
        return Thread.update(obj,{
            where:{
                id: id
            }
        })
    },
}

module.exports = A