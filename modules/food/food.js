define(function(require, exports, module) {
    var $ = require('jquery');
    var events = require('events');
    var $game = $('[node-type="game"]');
    var $this, foodPos = {x:12, y:12};
    var widthStr = $game.css('width');var heightStr = $game.css('height');
    var xMax = Math.floor(widthStr.substr(0, widthStr.length-2)/10);
    var yMax = Math.floor(heightStr.substr(0, heightStr.length-2)/10);
    var eventsFood = events.register('snake', 'food');
    require('./food.css');
    
    function randomPos() {
        var xPos = Math.floor(Math.random() * xMax);
        var yPos = Math.floor(Math.random() * yMax);
        return {x: xPos, y:yPos};
    }
    
    function isInside(pos, data) {
        for (var i=0; i<data.length; i++) {
            if (pos.x === data[i].x && pos.y === data[i].y) {
                return true;
            }
        }
        return false;
    }

    function init() {
        var html = require('./food.html');
        $game.append(html);
        $this = $game.children(':last');
        _draw();
    }

    function _draw() {
        $this[0].style.left = foodPos.x * 10 + 'px';
        $this[0].style.top = foodPos.y * 10 + 'px';
    }

    init();
    setTimeout(function () {
        events.listen('snake:eat', function (data) {
            foodPos = randomPos();
            while (isInside(foodPos, data)) {
                foodPos = randomPos();
            }
            events.trigger(eventsFood, foodPos);
            _draw();
        });       
    });
});