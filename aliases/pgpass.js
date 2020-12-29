// alias/pgpass.js
'use strict';

var fs = require('fs')
  , helper = require( 'pgpass/lib/helper.js' )
;


module.exports.warnTo = helper.warnTo;

module.exports = function(connInfo, cb) {
    var file = helper.getFileName();

    fs.stat(file, function(err, stat){
        if (err || !helper.usePgPass(stat, file)) {
            return cb(undefined);
        }

        var st = fs.createReadStream(file);

        helper.getPassword(connInfo, st, cb);
    });
};