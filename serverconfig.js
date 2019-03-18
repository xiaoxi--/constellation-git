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
        key:'2e7c1ad4a3b994a954fdbf3739ada04e', //158
        key1:'ddfbd6713f5e6f24fbb7f3549a096aa1' //迷歌
        //key:'128f574b559b03d93856b7e814543f71' //叶哥
    };

    module.exports = {
        MySqlConfigs:MySqlConfigs,
        SqlQueryFormat:SqlQueryFormat,
        Constellation:Constellation
    };
}).call(this);
