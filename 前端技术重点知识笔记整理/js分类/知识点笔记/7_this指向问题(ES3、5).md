# 这里主要是ES3/ES5的this指向 ES6有不同的指向规则

1. this指向

1) 直接调用函数，this指向全局对象
2) 在函数外，this指向全局变量
3) 通过对象调用或new一个函数，this指向调用的对象或者新对象

函数要确定了this指向后才能执行

```js

// THIS
// 1.给当前元素的某个事件绑定方法, 当事件触发方法执行的时候，方法中的THIS是当前操作的元素对象
oBox.onclick=function(){
   //=>this:oBox
}

// 2.普通函数执行，函数中的THIS取决于执行的主体，谁执行的，THIS就是谁（执行主体：方法执行，看方法名前面是否有“点”，的话，点前面是谁this就是谁，没有this是window）
function fn(){//=>AAAFFF000
   console.log(1);
}
var obj={
   fn:fn //=>fn:AAAFFF000
};
//=>执行的是相同的方法（不同地方在于函数执行方法中的this是不一样的）
obj.fn();//=>this:obj
fn();//=>this:window
//=>自执行函数执行，方法中的this是window
~function(){
    //=>this:window
}();

```

# JS中改变this指向的方法 call、apply、bind

## JS中用来改变某一个函数中THIS关键字指向的方法
call、apply、bind
```js
window.name = '珠峰';
let fn = function () {
    console.log(this.name);
};
let obj = {
    name: "OBJ",
    fn: fn
};
let oo = {name: "OO"};
fn();//=>this:window "珠峰"
obj.fn();//=>this:obj "OBJ"
```
```js
/*
 * call
 *  1. [fn].call([this],[param]...)
 *   fn.call：当前实例(函数FN)通过原型链的查找机制，找到Function.prototype上的call方法  =>function call(){[native code]}
 *   fn.call()：把找到的call方法执行
 *
 *   当call方法执行的时候，内部处理了一些事情
 *    =>首先把要操作函数中的THIS关键字变为CALL方法第一个传递的实参值
 *    =>把CALL方法第二个及第二个以后的实参获取到
 *    =>把要操作的函数执行，并且把第二个以后的传递进来的实参传给函数
*/
fn.call(oo);//=>this:oo
fn.call(obj,10,20,30);//=>this:obj

/*Function.prototype.call = function () {
    let param1 = arguments[0],
        paramOther = [];//=>把ARG中除了第一个以外的实参获取到

    //=>this:fn 当前要操作的函数(函数类的一个实例)
    //把FN中的THIS关键字修改为PARAM1 =>把THIS(CALL中)中的this关键字修改为param1

    //=>把fn执行，把paramOther分别传递给fn
    // this(paramOther)  =>fn(paramOther)
};
fn.call({name:'xx'})
sum.call({..})
*/

let sum=function(a,b){
    console.log(this);//=>opt
};
let opt={n:20};

// sum.call(opt,20,30);//=>call执行 call中的this是sum  把this(call中的)中的“this关键字”改为opt 把this(call中的)执行，把20,30分别传递给它 //=>sum中this:opt  a=20 b=30

sum.call.call(opt)
//1.sum.call 找到Function.prototype上的call方法(也是一个函数，也是函数类的一个实例，也可以继续调用call/apply等方法)  =>A（函数）
//2.A.call(opt)  继续找到原型上的call方法，把call方法执行：把A中的this关键字修改为opt，然后把A执行
```
## 练习题
```js
/*
如果函数没有this就无视修改
Function.prototype.call=function callAA(){
    //=>1.把THIS(FN)中的"THIS关键字"修改为第一个参数值(OBJ)
    //=>2.把THIS(FN)执行,把第二个及以后接受的参数值传递给函数(10,20)
    //this(10,20)
};
fn.call(obj,10,20)
*/
function fn1(){console.log(1);}
function fn2(){console.log(2);}
fn1.call(fn2);//=>找到CALL-AA把它执行,CALL-AA中的THIS是FN1,第一个参数传递的是FN2  =>在CALL-AA中执行的是FN1 =>1

// 先执行后面的call(fn2) 再执行fn1.call
fn1.call.call(fn2);//=>找到CALL-AA让它执行,CALL-AA中的THIS是FN1.CALL,第一个参数是FN2  (把FN1.CALL中的THIS变为FN2，再让FN1.CALL执行  =>先找到CALL-AA，把它执行，只不过此时它中的THIS是FN2 =>让FN2中的THIS变为UNDEFINED，因为执行FN1.CALL的时候没有传递参数值，然后让FN2执行)  =>2

Function.prototype.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是Function.prototype =>让F.P中的THIS变为FN1,然后让F.P执行,F.P是一个匿名函数也是一个空函数，执行没有任何的输出

Function.prototype.call.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是F.P.CALL =>把F.P.CALL中的THIS修改为FN1,让F.P.CALL执行  =>F.P.CALL(CALL-AA)第二次把它执行(此时它里面的THIS已经是FN1) =>这一次其实在CALL-AA中是让FN1执行 =>1
//<==> fn1.call.call(fn2)
//<==> fn1.call===Function.prototype.call ：true

fn1.call.call.call.call.call(fn2);
//=>fn1.call.call.call.call===Function.prototype.call

// 规律 一个call是让前面的执行 两个及两个以上的call是让()里面的执行
```
## 理解call、apply、bind之间的区别

```js
"use strict";

let fn = function (a, b) {
    console.log(this);
};
let obj = {name: "OBJ"};

// document.onclick = fn;//=>把FN绑定给点击事件，点击的时候执行FN
// document.onclick = fn();//=>在绑定的时候,先把FN执行,把执行的返回值(UNDEFINED)绑定给事件,当点击的时候执行的是undefined

//=>需求：点击的时候执行FN，让FN中的THIS是OBJ
// document.onclick = fn;//=>this:document
// document.onclick = fn.call(obj);//=>虽然this确实改为obj了，但是绑定的时候就把fn执行了(call是立即执行函数)，点击的时候执行的是fn的返回值undefined
// document.onclick = fn.bind(obj);//=>bind属于把fn中的this预处理为obj，此时fn没有执行，当点击的时候才会把fn执行

/*
 * CALL中的细节
 *   1.非严格模式下，如果参数不传，或者第一个传递的是null/undefined，THIS都指向WINDOW
 *   2.在严格模式下，第一个参数是谁，THIS就指向谁（包括null/undefined），不传THIS是undefined
*/
// fn.call(obj, 10, 20);//=>this:obj a=10 b=20
// fn.call(10, 20);//=>this:10 a=20 b=undefined
// fn.call();//=>this:window a=undefined b=undefined
// fn.call(null);//=>this:window
// fn.call(undefined);//=>this:window

/*
 * apply：和call基本上一模一样，唯一区别在于传参方式
 *   fn.call(obj,10,20)
 *   fn.apply(obj,[10,20]) APPLY把需要传递给FN的参数放到一个数组（或者类数组）中传递进去，虽然写的是一个数组，但是也相当于给FN一个个的传递
*/

/*
 * bind：语法和call一模一样，唯一的区别在于立即执行还是等待执行
 *   fn.call(obj,10,20) 改变FN中的THIS,并且把FN立即执行
 *   fn.bind(obj,10,20) 改变FN中的THIS,此时的FN并没有执行（不兼容IE6~8） 这样写永远不执行fn
*/
```
## 利用call、apply、bind来实现下需求
### 基于apply获取数组中的最大值 - 面试中经常也会问到
```js
/*
 * 需求一：获取数组中的最大值(最小值)
 *   1.给数组先排序(由大到小排序),第一项就是最大值
 *   2.假设法:假设第一个值是最大值,依次遍历数组中后面的每一项,和假设的值进行比较,如果比假设的值要大,把当前项赋值给MAX...
 *   3.基于Math.max完成
 */
let ary = [12, 13, 14, 23, 24, 13, 15, 12];

//=>Math.max
onsole.log(Math.max(ary));//=>NaN =>Math.max是获取一堆数中的最大值,需要我们把比较的数,一个个的传递给这个方法 =>Math.max(12,13,14...) =>Math.max([12,13,14...])这样只是传递一个值
/*
[12,13,14].toString() =>"12,13,14"
eval("12,13,14") =>14

   1.eval：把字符串转换为JS表达式
    eval("1+2") =>3

   2.括号表达式（小括号的应用）
    用小括号包起来，里面有很多项（每一项用逗号分隔），最后只获取最后一项的内容（但是会把其它的项也都过一遍）
    (function(){
        console.log(1);
    },function(){
        console.log(2);
    })();
    =>2

    let a=1===1?(12,23,14):null;
    =>a=14

   不建议大家过多使用括号表达式，因为会改变THIS
*/


let fn=function(){console.log(this);}
let obj={fn:fn};
(fn,obj.fn)();//=>执行的是第二个OBJ.FN，但是方法中的THIS是WINDOW而不是OBJ
(obj.fn)();//=>this:obj


//=>基于EVAL转换字符串为JS表达式
console.log(eval("Math.max(" + ary.toString() + ")"));

//=>利用了APPLY的一个特征：虽然放的是一个数组，但是执行方法的时候，也是把数组中的每一项一个个的传递给函数
console.log(Math.max.apply(null, ary));

//=>排序

let max = ary.sort(function (a, b) {
    return b - a;
})[0];
console.log(max);


//=>假设法

let max = ary[0];
for (let i = 1; i < ary.length; i++) {
    let item = ary[i];
    item > max ? max = item : null;
}
console.log(max);

```

# 面试题

## CALL APPLY 的作用
1. 改变函数中的THIS(并且让函数执行)

2. 可以基于CALL让类数组借用数组原型上的方法（例如：借用SLICE实现把类数组转换为数组）

   Array.prototype.slice.call([类数组])

3. 可以基于CALL实现继承

4. 可以基于APPLY获取数组中的最大值和最小值 
    ....

call、apply、bind的实现

```js
// call 方法的实现
Function.prototype.myCall = function () {
    var ctx = arguments[0] || window;
    ctx.fn = this;//谁调用myCall方法，this就指向谁
    //由于使用call方法的时候，参数的个数是不确定的，但是我们现在又想执行fn方法,可以使用eval来实现
    //也就是eval('ctx.fn(arguments[1],arguments[2]....'),这里使用一个args数组来拼接arguments[1],arguments[2].....字符串
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('ctx.fn(' + args.join(',') + ')');
    delete ctx.fn;
    return result;
}
// apply 方法的实现
Function.prototype.myApply = function (ctx, arr) {
    ctx = ctx || window;
    ctx.fn = this;
    var result;
    if (arr) {
        var args = [];
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('ctx.fn(' + args.join(',') + ')');
    } else {
        result = ctx.fn();
    }
    delete ctx.fn;
    return result;
}
// bind 方法的实现
// 1.bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体
// 2.bind方法的第一个参数也是用于改变this指向，如果传入null/undefined，this会指向window
// 3.一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略
// 4.bind方法可以使函数拥有预设的初始参数。这些参数（如果有的话）作为bind()的第二个参数跟在this（或其他对象）后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。
Function.prototype.myBind = function (target) {
    target = target || window;//如果没有传入,就为window
    var self = this;//谁调用myBind，this就指向谁
    var args = [].slice.call(arguments, 1);//args:[arguments[1],arguments[2]....]
    var temp = function () { };
    var fn = function () {
        var fnArgs = [].slice.call(arguments, 0);
        //this 如果new fn()  this 指向构造出来的对象，否则为window ;this instanceof fn看this的原型链上有没有fn的原形
        return self.apply(this instanceof fn ? this : target, args.concat(fnArgs));
    }
    temp.prototype = this.prototype;
    fn.prototype = new temp();  //形成继续关系  fn.prototype.__proto__ == this.prototype  true
    return fn;
}
```

