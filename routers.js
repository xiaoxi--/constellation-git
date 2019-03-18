/**
 * Created by Brook on 2019/3/14 0014.
 */

var r_fortune = require('./routes/fortune');


module.exports = function (app) {
    /**
     * API
     */
    app.post('/post/fortune',r_fortune.Fortune.post_fortune);                             //POST API
};



