var Sequelize = require('sequelize');
var sequelize = new Sequelize('DB', 'root', 'pass@word1', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

var License = sequelize.define('license', {
    license: { type: Sequelize.STRING, allowNull: false },
    state: { type: Sequelize.STRING, allowNull: false },
    userid: { type: Sequelize.STRING, allowNull: true },
    username: { type: Sequelize.STRING, allowNull: true }
}, {
        freezeTableName: true
    });

module.exports = License;