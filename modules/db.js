const Sequelize = require('sequelize');

const seq = new Sequelize('test','root','',{
    host: '127.0.0.1',
    dialect: 'mysql',
    pool:{
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = seq ;