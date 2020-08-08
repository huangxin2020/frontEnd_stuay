// 设置成this，在仁和场景下都能使用
if(!this.myPlugin){
    this.myPlugin = {};
}

this.myPlugin.inherit = (function (son,father) {
    // 圣杯模式
    /* son.prototype = Object.create(father.prototype);
    son.prototype.constructor = son;
    // 标准写法
    // son.prototype.uber = father.prototype;
    // 更好的写法
    son.prototype.uber = father; */

    // 考虑了兼容老版本浏览器继承方法
    var Temp = function() {}
    return function ( son , father){
        Temp.prototype = father.prototype;
        son.prototype = new Temp();
        son.prototype.constructor = son;
        // son.prototype.uber = father;
        // 标准写法
        son.prototype.uber = father.prototype; 
    }
}());