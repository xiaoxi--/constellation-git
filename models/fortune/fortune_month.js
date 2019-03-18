/**
 * Created by Brook on 2019/3/14 0014.
 */

(function(){
    module.exports = function(sequelize, DataTypes) {
        var fortune_month = sequelize.define('fortune_month', {
            id: {type: DataTypes.INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true,allowNull: false,comment:'ID'},
            name:{type:DataTypes.STRING(3),defaultValue:'',allowNull: false,comment:''},
            date:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:''},
            all:{type:DataTypes.STRING(1000),defaultValue:'',allowNull: false,comment:''},
            happyMagic:{type:DataTypes.STRING(50),defaultValue:'',allowNull: false,comment:''},
            health:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            love:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            money:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            month:{type:DataTypes.INTEGER,defaultValue:0,allowNull: false,comment:''},
            work:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            data_date:{type:DataTypes.INTEGER,defaultValue:0,allowNull: false,comment:''},
            createtime:{type: DataTypes.DATE, defaultValue: DataTypes.NOW,allowNull: false,comment:'入库时间'}

        });
        return fortune_month;
    }
}).call(this);