/**
 * Created by Brook on 2019/3/14 0014.
 */

(function(){
    module.exports = function(sequelize, DataTypes) {
        var fortune_year = sequelize.define('fortune_year', {
            id: {type: DataTypes.INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true,allowNull: false,comment:'ID'},
            name:{type:DataTypes.STRING(3),defaultValue:'',allowNull: false,comment:''},
            date:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:''},
            year:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:''},
            info:{type:DataTypes.STRING(1000),defaultValue:'',allowNull: false,comment:''},
            text:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            career:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            love:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            health:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            finance:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            luckeyStone:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:''},
            data_date:{type:DataTypes.INTEGER,defaultValue:0,allowNull: false,comment:''},
            createtime:{type: DataTypes.DATE, defaultValue: DataTypes.NOW,allowNull: false,comment:'入库时间'}

        });
        return fortune_year;
    }
}).call(this);