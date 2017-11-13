const Sequelize = require('sequelize');
const S = require('../settings')

const seq = new Sequelize(S.SQL.DATABASE,S.SQL.USER,S.SQL.PASSWORD,{
    host: S.SQL.HOST,
    port: S.SQL.PORT,
    dialect: 'mysql',
    pool:{
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = seq ;