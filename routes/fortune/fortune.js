/**
 * Created by Brook on 2019/3/14 0014.
 */

(function() {
    var async = require('async');
    var SqlQureyFormat = require('../../serverconfig.js').SqlQueryFormat;
    var Constellation = require('../../serverconfig.js').Constellation;
    var Fortune_Sql = require('../../models/fortune');
    var moment = require('moment');
    var request = require('request');
    var later = require('later');
    later.date.localTime();
    var abnormal_tyep = 0;

    /**
     * @param req {"consName":"金牛座"}
     * @param res list
     */
    exports.post_fortune = function(req, res) {
        var r = {code:0,message:'成功！',data:{}};

        if(JSON.stringify(req.query) != "{}"){
            var pars = req.query;
        } else {
            var str_data = JSON.stringify(req.body);
            var pars = JSON.parse(str_data);
        };

        // console.log(JSON.parse(req.body))

        var data_date = moment().format('YYYYMMDD');
        async.auto({
            get_today:function(cb){
                Fortune_Sql.fortune_day.findAll({where:{data_date:data_date, name:pars.consName}},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            },
            get_tomorrow:['get_today', function(cb, result){
                Fortune_Sql.fortune_tomorrow.findAll({where:{data_date:data_date, name:pars.consName}},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            }],
            get_week:['get_tomorrow', function(cb, result){
                Fortune_Sql.fortune_week.findAll({where:{data_date:data_date, name:pars.consName}},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            }],
            get_month:['get_week', function(cb, result){
                Fortune_Sql.fortune_month.findAll({where:{data_date:data_date, name:pars.consName}},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            }],
            get_year:['get_month', function(cb, result){
                Fortune_Sql.fortune_year.findAll({where:{data_date:data_date, name:pars.consName}},SqlQureyFormat).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb(null,db_result);
                });
            }],
            Arrangement:['get_year', function(cb, result) {
                var map = {};
                map.today = result.get_today;
                map.tomorrow = result.get_tomorrow;
                map.week = result.get_week;
                map.month = result.get_month;
                map.year = result.get_year;
                cb(null, map);
            }]
        },function(err,results){
            if(err){
                r.message = err;
            }else{
                r.code = 200;
                r.data = results.Arrangement
            };
            res.json(r);
        });
    };

    /**
     * 定时任务
     * 每天早上零点
     * 请求数据
     * 整理数据
     * 写入数据库
     * END...
     */

    /**
     * 定时器
     * 每天零点零分
     */
    //Get_Constellation_Data(Constellation.key);

    var hour_sched = later.parse.recur().on(0).hour().on(0).minute();
    var run_sched_data = later.setInterval(function(){
        Get_Constellation_Data(Constellation.key);
    },hour_sched);

    //异常处理
    var hour_sched = later.parse.recur().on(4).hour().on(0).minute();
    var run_sched_data = later.setInterval(function(){
        if (abnormal_tyep == 1){
            Get_Constellation_Data(Constellation.key1);
        };
    },hour_sched);


    function Get_Constellation_Data(key){
        async.auto({
            get_parameter: function (cb) {
                var type = ['today','tomorrow','week','month','year'];
                var consName = ['处女座','狮子座','双鱼座','天蝎座','摩羯座','金牛座','巨蟹座','双子座','天秤座','水瓶座','白羊座','射手座'];
                var list = [];
                for (var i in consName) {
                    for (var n in type) {
                        list.push({consName:encodeURI(consName[i]), type:type[n]});
                    };
                };
                cb(null, list);
            },
            get_api_data: ['get_parameter', function (cb, result) {
                async.forEach(result.get_parameter,function(item,fcb){
                    var url = 'http://web.juhe.cn:8080/constellation/getAll?consName='+item.consName+'&type='+item.type+'&key='+key;
                    console.log(url)
                    request.get(url,function(err,response,body){
                        var obj = eval('(' + body + ')');
                        if (obj.resultcode == '200'){
                            if (item.type == 'today') {
                                today(obj, fcb);
                            } else if (item.type == 'tomorrow') {
                                tomorrow(obj, fcb);
                            } else if (item.type == 'week') {
                                week(obj, fcb);
                            } else if (item.type == 'month') {
                                month(obj, fcb);
                            } else if (item.type == 'year') {
                                year(obj, fcb);
                            };
                            abnormal_tyep = 0;
                        } else {
                            abnormal_tyep = 1;
                            fcb();
                        };
                    })
                },function(ferr){
                    ferr?cb(ferr):cb();
                });
            }],
        }, function (errror, results) {
            if (errror) {
                console.log(errror);
            }
            console.log('OK......');
        });
    };

    function today(data, callback){
        async.auto({
            del_data:function (cb){
                Fortune_Sql.fortune_day.destroy({data_date:moment().format('YYYYMMDD'), name:data.name}).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb();
                });
            },
            insert_data:['del_data', function (cb, result) {
                var condition = {
                    date:data.date,
                    name:data.name,
                    datetime:data.datetime,
                    all:data.all,
                    color:data.color,
                    love:data.love,
                    money:data.money,
                    number:data.number,
                    qfriend:data.QFriend,
                    summary:data.summary,
                    work:data.work,
                    data_date:moment().format('YYYYMMDD'),
                    createtime:moment().add(+8,'hour').format('YYYY-MM-DD HH:mm:ss'),
                }
                Fortune_Sql.fortune_day.create(condition, SqlQureyFormat).complete(function (dberr, user_role) {
                    dberr ? cb(dberr) : cb(null, user_role);
                });
            }]
        }, function (errror, results) {
            if (errror) {
                console.log(errror);
            }
            callback();
        });

    };
    function tomorrow(data, callback){
        async.auto({
            del_data:function (cb){
                Fortune_Sql.fortune_tomorrow.destroy({data_date:moment().format('YYYYMMDD'), name:data.name}).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb();
                });
            },
            insert_data:['del_data', function (cb, result) {
                var condition = {
                    date:data.date,
                    name:data.name,
                    datetime:data.datetime,
                    all:data.all,
                    color:data.color,
                    love:data.love,
                    money:data.money,
                    number:data.number,
                    qfriend:data.QFriend,
                    summary:data.summary,
                    work:data.work,
                    data_date:moment().format('YYYYMMDD'),
                    createtime:moment().add(+8,'hour').format('YYYY-MM-DD HH:mm:ss'),
                }
                Fortune_Sql.fortune_tomorrow.create(condition, SqlQureyFormat).complete(function (dberr, user_role) {
                    dberr ? cb(dberr) : cb(null, user_role);
                });
            }]
        }, function (errror, results) {
            if (errror) {
                console.log(errror);
            }
            callback();
        });

    };
    function week(data, callback){
        async.auto({
            del_data:function (cb){
                Fortune_Sql.fortune_week.destroy({data_date:moment().format('YYYYMMDD'), name:data.name}).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb();
                });
            },
            insert_data:['del_data', function (cb, result) {
                var condition = {
                    name:data.name,
                    date:data.date,
                    weekth:data.weekth,
                    health:data.health,
                    job:data.job,
                    love:data.love,
                    money:data.money,
                    work:data.work,
                    data_date:moment().format('YYYYMMDD'),
                    createtime:moment().add(+8,'hour').format('YYYY-MM-DD HH:mm:ss'),
                }
                Fortune_Sql.fortune_week.create(condition, SqlQureyFormat).complete(function (dberr, user_role) {
                    dberr ? cb(dberr) : cb(null, user_role);
                });
            }]
        }, function (errror, results) {
            if (errror) {
                console.log(errror);
            }
            callback();
        });

    }
    function month(data, callback){
        async.auto({
            del_data:function (cb){
                Fortune_Sql.fortune_month.destroy({data_date:moment().format('YYYYMMDD'), name:data.name}).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb();
                });
            },
            insert_data:['del_data', function (cb, result) {
                var condition = {
                    name:data.name,
                    date:data.date,
                    all:data.all,
                    happyMagic:data.happyMagic,
                    health:data.health,
                    love:data.love,
                    money:data.money,
                    month:data.month,
                    work:data.work,
                    data_date:moment().format('YYYYMMDD'),
                    createtime:moment().add(+8,'hour').format('YYYY-MM-DD HH:mm:ss'),
                }
                Fortune_Sql.fortune_month.create(condition, SqlQureyFormat).complete(function (dberr, user_role) {
                    dberr ? cb(dberr) : cb(null, user_role);
                });
            }]
        }, function (errror, results) {
            if (errror) {
                console.log(errror);
            }
            callback();
        });

    }
    function year(data, callback){
        async.auto({
            del_data:function (cb){
                Fortune_Sql.fortune_year.destroy({data_date:moment().format('YYYYMMDD'), name:data.name}).complete(function(db_err,db_result){
                    db_err?cb(db_err):cb();
                });
            },
            insert_data:['del_data', function (cb, result) {
                var condition = {
                    name:data.name,
                    date:data.date,
                    year:data.year,
                    info:data.mima.info,
                    text:data.mima.text,
                    career:data.career,
                    love:data.love,
                    health:data.health,
                    finance:data.finance,
                    luckeyStone:data.luckeyStone,
                    data_date:moment().format('YYYYMMDD'),
                    createtime:moment().add(+8,'hour').format('YYYY-MM-DD HH:mm:ss'),
                }
                Fortune_Sql.fortune_year.create(condition, SqlQureyFormat).complete(function (dberr, user_role) {
                    dberr ? cb(dberr) : cb(null, user_role);
                });
            }]
        }, function (errror, results) {
            if (errror) {
                console.log(errror);
            }
            callback();
        });
    }

}).call(this);
