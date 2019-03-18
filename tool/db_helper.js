/**
 * Created by Brook on 2019/3/14 0014.
 */
//sql执行
var sqlclient = module.exports;
var dbpool=require('./sql_pool.js');
var _pool = null;
var NND = {};

NND.init=function(db_config){
    if(!_pool){
        _pool= dbpool.CreateMysqlPool(db_config);
    }
};

NND.query = function(sql, args, callback){
    _pool.getConnection(function(err, client) {
        if (!!err) {
            console.error('[sqlqueryErr] '+err.stack);
            return;
        }
        client.query(sql, args, function(err, res) {
            _pool.releaseConnection(client);
            callback.apply(null, [err, res]);
        });
    });
};

NND.shutdown = function(){
    _pool.end();
};

sqlclient.init = function(db_config) {
    if (_pool){
        return sqlclient;
    } else {
        NND.init(db_config);
        sqlclient.query = NND.query;
        return sqlclient;
    }
};

sqlclient.shutdown = function() {
    NND.shutdown();
};