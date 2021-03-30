/**
 * Created by Brook on 2019/3/14 0014.
 */

(function (){
    var SqlQueryFormat={raw:true};

    //MYSQL 配置
    var MySqlConfigs={
        My_config:{user:'root',pass:'123456',host:'127.0.0.1',port:3309}
    };

    //聚合KEY
    var Constellation={
        key:'00000'
    };

    module.exports = {
        MySqlConfigs:MySqlConfigs,
        SqlQueryFormat:SqlQueryFormat,
        Constellation:Constellation
    };
}).call(this);
