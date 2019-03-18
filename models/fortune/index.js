/**
 * Created by sam.li on 2014/5/15.
 */

(function(){
    var fs = require('fs');
    var path = require('path');
    var Sequelize = require('sequelize');
    var lodash = require('lodash');
    var ServerConfig = require('../../serverconfig.js');
    var sequelize = new Sequelize('constellation', ServerConfig.MySqlConfigs.My_config.user,ServerConfig.MySqlConfigs.My_config.pass, {
        host:ServerConfig.MySqlConfigs.My_config.host,
        port:ServerConfig.MySqlConfigs.My_config.port,
        timezone:'local',
        define: {
            engine: 'MYISAM',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false
        }
    });
    var db = {};

    fs.readdirSync(__dirname)
        .filter(function (file) {
            return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
        })
        .forEach(function (file) {
            var model = sequelize.import(path.join(__dirname, file))
            db[model.name] = model
        });

    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].options.hasOwnProperty('associate')) {
            db[modelName].options.associate(db)
        }
    });

    module.exports = lodash.extend({
        sequelize: sequelize,
        Sequelize: Sequelize
    }, db);
}).call(this);

