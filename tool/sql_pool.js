/**
 * Created by Brook on 2019/3/14 0014.
 */
//引用mysql模块
var mysql=require('mysql');

//创建连接池
exports.CreateMysqlPool=function(db_config){
    return mysql.createPool(db_config);
};