define(function(require, exports, module) {
    // var obj = require('./test.js');
    require('./testa.js');
    var obj = require('./test.js');
    console.log('testb:' + 'a = ' + obj.a);
});