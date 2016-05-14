define(function(require, exports, module) {
    require('./snake-body.css');
    var $ = require('jquery');
    var events = require('events');

    var eventsEat = events.register('snake', 'eat');
    var eventsDead = events.register('snake', 'dead');

    // 数据
    var _data = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}];
    var _lastSnakeTrailPos = {x:7, y:10};
    var _dir = 'right';
    var _timer;
    var _foodPos = {x:12, y:12};
    var _isStop = false;

    // 游戏区域
    var $game = $('[node-type="game"]');
    var widthStr = $game.css('width');var heightStr = $game.css('height');
    var xMax = Math.floor(widthStr.substr(0, widthStr.length-2)/10);
    var yMax = Math.floor(heightStr.substr(0, heightStr.length-2)/10);

    // 吃
    function _eat() {
        _data.push(_lastSnakeTrailPos);
        events.trigger(eventsEat, _data);
    }

    // 是否碰到食物
    function isCollisionFood() {
        var headPos = {x: _data[0].x, y: _data[0].y};
        if (_foodPos.x === headPos.x && _foodPos.y === headPos.y) {
            return true;
        }
        return false;
    }
    
    // 蛇头是否碰到不应该喷到的地方
    function isCollisionZooe() {
        var headPos = {x: _data[0].x, y: _data[0].y};
        if (headPos.x > xMax - 1 || headPos.x < 0 || headPos.y > yMax - 1 || headPos.y < 0) {
            return true;
        }
        for (var i=1; i<_data.length; i++) {
            if (headPos.x == _data[i].x && headPos.y == _data[i].y) {
                return true;
            }
        }
        return false;
    }
    // 移动一步，更新data和尾巴位置数据
    function _nextStep(dir) {
        if (_isStop) {
            return;
        }
        var headPos = {x: _data[0].x, y: _data[0].y};
        var trailPos = {x: _data[_data.length-1].x, y: _data[_data.length-1].y};
        switch(dir) {
            case 'right':
                headPos.x = headPos.x + 1;
                break;
            case 'left':
                headPos.x = headPos.x - 1;
                break;
            case 'up':
                headPos.y = headPos.y - 1;
                break;
            case 'down':
                headPos.y = headPos.y + 1;
                break;
        }
        _data.unshift(headPos);
        _data.pop();
        _lastSnakeTrailPos = trailPos; // 更新上一次移动状态的尾巴位置

        if (isCollisionFood()) {
            _eat();
        }
        if (isCollisionZooe()) {
            _dead();
        }
    }

    // bind events
    function _bindEvents() {
        // 方向键事件
        $(window).keydown(function (e) {
            switch(e.which) {
                case 38: //上
                    if (_dir === 'up') {
                        _nextStep(_dir);
                    } else if (_dir === 'down') {
                        // dir = 'up';
                    } else {
                        _dir = 'up';
                    }
                    break;
                case 40: // down
                    if (_dir === 'down') {
                        _nextStep(_dir);
                    } else if (_dir === 'up') {

                    } else {
                        _dir = 'down';
                    }
                    break;
                case 37:
                    if (_dir === 'left') {
                        _nextStep(_dir);
                    } else if (_dir === 'right') {

                    } else {
                        _dir = 'left';
                    }
                    break;
                case 39:
                    if (_dir === 'right') {
                        _nextStep(_dir);
                    } else if (_dir === 'left') {

                    } else {
                        _dir = 'right';
                    }
                    break;
            }

        });

    }

    // live
    function live() {
        _timer = setInterval(function () {
            _nextStep(_dir);
            _render();
        }, 100);
    }

    // dead
    function _dead() {
        _isStop = true;
        _data.shift();
        _data.push(_lastSnakeTrailPos);
    }
    // 渲染
    function _render() {
        var $snakePartArr = $('[node-type="snake"]').children();
        if ($snakePartArr.length < _data.length) {
            var dif = _data.length - $snakePartArr.length;
            var tempHtml = $('<div class="snake-part"></div>');
            // tempHtml.css('left', )
            tempHtml[0].style.left = _lastSnakeTrailPos.x * 10 + 'px';
            tempHtml[0].style.top = _lastSnakeTrailPos.y * 10 + 'px';
            $('[node-type="snake"]').append(tempHtml);
        }
        $snakePartArr.each(function(index, element) {
            element.style.left = _data[index].x * 10 + 'px';
            element.style.top = _data[index].y * 10 + 'px';
        });
        if (_isStop) {
            clearInterval(_timer);
            events.trigger(eventsDead);
        }
    }

    function init() {
        var html = require('./snake-body.html');
        $('[node-type="game"]').append(html);
        _bindEvents();
        live();
    }

    init();
    setTimeout(function () {
        events.listen('snake:food', function (pos) {
            _foodPos = pos;
        })
    });

});