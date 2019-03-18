/**
 * Created by Brook on 2019/3/14 0014.
 */

(function(){
    module.exports = function(sequelize, DataTypes) {
        var fortune_day = sequelize.define('fortune_day', {
            id: {type: DataTypes.INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true,allowNull: false,comment:'ID'},
            name:{type:DataTypes.STRING(3),defaultValue:'',allowNull: false,comment:''},
            datetime:{type:DataTypes.STRING(20),defaultValue:'',allowNull: false,comment:''},
            date:{type:DataTypes.INTEGER,defaultValue:0,allowNull: false,comment:''},
            all:{type:DataTypes.STRING(10),defaultValue:'',allowNull: false,comment:''},
            color:{type:DataTypes.STRING(10),defaultValue:'',allowNull: false,comment:''},
            love:{type:DataTypes.STRING(10),defaultValue:'',allowNull: false,comment:''},
            money:{type:DataTypes.STRING(10),defaultValue:'',allowNull: false,comment:''},
            number:{type:DataTypes.STRING(10),defaultValue:'',allowNull: false,comment:''},
            qfriend:{type:DataTypes.STRING(10),defaultValue:'',allowNull: false,comment:''},
            summary:{type:DataTypes.STRING(2000),defaultValue:'',allowNull: false,comment:''},
            work:{type:DataTypes.STRING(10),defaultValue:'',allowNull: false,comment:''},
            data_date:{type:DataTypes.INTEGER,defaultValue:0,allowNull: false,comment:''},
            createtime:{type: DataTypes.DATE, defaultValue: DataTypes.NOW,allowNull: false,comment:'入库时间'}

        });
        return fortune_day;
    }
}).call(this);