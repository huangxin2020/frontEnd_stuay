# JS中的函数

js中只有7种数据类型 - Number类型、String类型、Boolean类型、Null(空指针)、Undefined(未定义类型)、引用类型、Symbol(唯一值)

js要用这7种值来表现所有的复杂类型

函数在js中是一个特殊的值 - 既是对象又是函数还有类

# 函数在JS中的三种角色
函数在JS中有三种角色
  1.普通函数
    ->堆栈内存释放
    ->作用域链
  2.类
    ->prototype：原型
    ->__proto__：原型链
    ->实例
  3.普通对象
    ->和普通的一个OBJ没啥区别,就是对键值对的增删改查

三种角色间没有什么必然关系
```js
// 作为一个普通函数
function Fn() {
    var n = 10;
    this.m = 100;
}
// 作为类
Fn.prototype.aa = function () {
    console.log('aa');
};
// 作为一个对象
Fn.bb = function () {
    console.log('bb');
};

//=>普通函数
// Fn();//=>this:window  有一个私有变量n  和原型以及属性bb没有关系

//=>构造函数执行
// var f = new Fn;//=>this:f
// console.log(f.n);//=>undefined：n是私有变量和实例没有关系
// console.log(f.m);//=>100 实例的私有属性
// f.aa();//=>实例通过__proto__找到Fn.prototype上的方法
// console.log(f.bb);//=>undefined：bb是把Fn当做一个普通的对象设置的属性而已，和实例等没有半毛钱关系

//=>普通对象
// Fn.bb();
```
![](img/Number的两种角色.png)

## 在实际中我们会混合着这两种角色使用
```js
//=>JQ这个类库中提供了很多的方法,其中有一部分是写在原型上的,有一部分是把它当做普通对象来设置的
~function () {
    function jQuery() {
        //...
        return [JQ实例]
    }
    jQuery.prototype.animate=function(){}
    //...
    jQuery.ajax=function(){}
    //....
    window.jQuery = window.$ = jQuery;
}();
$().ajax() //=>调不了
$().anaimte() //=>这样可以调取
$.ajax() //=>直接的对象键值对操作
$.animate() //=>对象上没有animate这个属性，这个属性在和实例相关的原型上
```

## 做题来解决问题

```js
// 阿里经典面试题
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}


// 函数作为对象与类是不同的 new 函数 -> 产生的是一个实例，而这不是完全的等同于对象
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName();  // 因为Foo后面有.xxx 所以它的运行机制与之前的完全不同 就是new (Foo.getName()整体) 运算符计算优先级 
new Foo().getName();
new new Foo().getName();
```

上面这道题的详细图解
详细解释上面的这到经典阿里前端js题
![](img/阿里巴巴关于函数三种角色的面试题.png)

## 函数的三种角色分别的运行机制

![](img/函数的三种角色运行机制图.png)