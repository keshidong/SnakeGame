// 数据控制，喷撞控制
define(function(require, exports, module) {
    var data;
    data.snake = {};
    data.snake.bodyPosArr = [{x:10, y:10}, {x:9, y:10}, {x:8, y:10}];
    data.snake.headPos = data.snake.bodyPosArr[0];
    data.snake.lastSnakeTrailPos = {x:7, y:10};
    data.snake.dir = 'right';
    data.foodPos = {x:12, y:12};

    function isCollsionFood() { // 判断是否碰到食物
        if (foodPos.x === snake.headPos.x && foodPos.y === snake.headPos.y) {
            return true;
        }
        return false;
    }

    model = {data: data, isCollsionFood: isCollsionFood};
    module.exports = model;

});