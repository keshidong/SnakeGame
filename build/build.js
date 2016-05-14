var fs=require("fs");
var path = require('path');

// 文件遍历
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

// 文件操作
function addExtal(data) {
    var headStr = 'define(function(require, exports, module) {module.exports =\'';
    var tealStr = '\';});';
    return headStr + data + tealStr;
}

travel('../modules', function (pathname) {
    var fileDir = path.dirname(pathname);
    var fileName = path.basename(pathname);
    var newDir = fileDir.substr(1);
    var newPathName = path.join(newDir, fileName);
    var contentText = fs.readFileSync(pathname, 'utf-8');

    //
    if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir);
    }
    if (path.extname(fileName) === '.html') {
        var htmlArr = contentText.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n');
        contentText = addExtal(htmlArr.join(''));
        newPathName = newPathName + '.js';

    }
    fs.writeFileSync(newPathName, contentText);
});