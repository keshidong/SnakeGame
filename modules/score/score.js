define(function(require, exports, module) {
    var score = 0;
    var html = require('./score.html');
    var $ = require('jquery');
    var events = require('events');
    require('./score.css');
    $('[node-type="game"]').prepend(html);
    var $this = $('[node-type="game"]').children(':first');

    // 分数闪动
    function shake() {
        var colorAarry = ['red', '#66f1f1'];
        var timer;
        var k = false;

        timer = setInterval(function () {
            $this[0].style.color = colorAarry[Number(k)];
            k = !k;
        },100);
        /*
        **setTimeout(function () {
        **    clearInterval(timer);
        **}, 1000);
        */
    }
    setTimeout(function () {
        events.listen('snake:eat', function (data) {
            score++;
            $this.html(score);
        });
        events.listen('snake:dead', function () {
            shake();
        })
    });
});