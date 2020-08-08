# 在JS中严格模式与非严格模式下区别
在以后的开发中使用严格模式进行开发
开启严格模式，在js文件最上面写"use strict" - 整个文档都会采用严格模式 或者在函数的最上面写
```js
~function(){
    "use strict"; // 此时这个函数就会按照严格模式来执行 其他的代码则不会按照严格模式进行
}
```
- 1. 再严格模式下不支持使用 arguments.callee / arguments.callee.caller() 会报错

- 2. 在严格模式下函数arguments没有映射机制

- 3. 在严格模式下不予许给一个对象设置重复属性名 { n : 10, n : 20 }

- 4. 在严格模式下函数执行如果没有明确指定执行的主体(函数前面没有点)，不再像非严格模式下一样，统一都交给window，而是让this指向undefined，代表没有执行主体: "严格模式下，有执行主体this就指向谁，没有执行主体，this就是undefined"
```js
function fn(){
    "use strict";
    console.log(this);
}
fn(); // undefined
```

# 逻辑或和逻辑与运算
```js
//=>逻辑与&& 和 逻辑或||
//1.条件判断中使用它们
/*
if(1===1 && 2===2){
    //=>条件中的&&：两个条件都成立，整体判断条件才会成立
    //=>条件中的||：只要有一个条件成立，整体判断条件就成立
}
*/

//2.在赋值操作中,我们有时候也会用他们
/*
var a = 1 || 2;//=>首先验证1是真假，如果为真，把1赋值给a，如果为假，把2赋值给a =>"A||B":先验证A的真假,为真结果是A,为假结果是B
var b = 1 && 2;//=>"A&&B"：先验证A的真假,为真结果是B,为假结果是A
*/

/*
function fn(x) {
    //=>“给形参赋值默认值”：验证传递的参数值,如果没有传递实参,让其默认值为零

    // if(x===undefined){
    //     x=0;
    // }

    // if (typeof x === 'undefined') {
    //     x = 0;
    // }

    x = x || 0;//=>如果X没传递值,X=undefined =>x=undefined||0 =>这种赋值的方式没有上面IF判断严谨（IF这种是没传值才会赋值默认值，||这种是不传值或者传递的值是假，都让它等于零）
}

fn(false);
*/

/*
function fn(callback) {
    //=>如果传递的值是个函数,我们才让其执行
    // if(typeof callback==='function'){
    //     callback();
    // }

    callback && callback();//=>上面IF判断的简写版（不严谨）：默认callback要不然就传函数，要不然就不传
}
fn(function () {
});
*/

//3.逻辑与和逻辑或的混合应用模式
//优先级：逻辑与的优先级高于逻辑或
// console.log(0 || 1 && 2 || 0 || 3 && 2 || 1); 

//4.逻辑或的实战应用：形参赋值默认值（初始化形参）

//在ES6新语法规范中可以直接给形参设置默认值 - 实战上使用的方法
function fn(x = 0) {
    //=>如果X没有传递值,默认值是零,一旦传递值,不管传递的是啥,都是按照传递的值处理的
    console.log(x);
}
fn();//=>0
fn(null);//=>null
fn(undefined);//=>0 传递undefined，浏览器也是按照没有传递值处理的
```


# call、apply、bind的作用 主要讲call
```js
/*
 * 用来改变某一个函数中THIS关键字指向的
 *  call
 *  apply
 *  bind
*/
window.name = '珠峰';
let fn = function () {
    console.log(this.name);
};
let obj = {
    name: "OBJ",
    fn: fn
};
let oo = {name: "OO"};
// fn();//=>this:window "珠峰"
// obj.fn();//=>this:obj "OBJ"

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
// fn.call(oo);//=>this:oo
// fn.call(obj,10,20,30);//=>this:obj

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
练习题
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
## 深入理解原型之call、apply、bind之间的区别
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
# 利用call、apply、bind来实现下需求
## 基于apply获取数组中的最大值 - 面试中经常也会问到
```js
/*
 * 需求一：获取数组中的最大值(最小值)
 *   1.给数组先排序(由大到小排序),第一项就是最大值
 *   2.假设法:假设第一个值是最大值,依次遍历数组中后面的每一项,和假设的值进行比较,如果比假设的值要大,把当前项赋值给MAX...
 *   3.基于Math.max完成
 */
let ary = [12, 13, 14, 23, 24, 13, 15, 12];

//=>Math.max
// console.log(Math.max(ary));//=>NaN =>Math.max是获取一堆数中的最大值,需要我们把比较的数,一个个的传递给这个方法 =>Math.max(12,13,14...) =>Math.max([12,13,14...])这样只是传递一个值
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

/*
let fn=function(){console.log(this);}
let obj={fn:fn};
(fn,obj.fn)();//=>执行的是第二个OBJ.FN，但是方法中的THIS是WINDOW而不是OBJ
(obj.fn)();//=>this:obj
*/

//=>基于EVAL转换字符串为JS表达式
// console.log(eval("Math.max(" + ary.toString() + ")"));

//=>利用了APPLY的一个特征：虽然放的是一个数组，但是执行方法的时候，也是把数组中的每一项一个个的传递给函数
// console.log(Math.max.apply(null, ary));

//=>排序
/*
let max = ary.sort(function (a, b) {
    return b - a;
})[0];
console.log(max);
*/

//=>假设法
/*
let max = ary[0];
for (let i = 1; i < ary.length; i++) {
    let item = ary[i];
    item > max ? max = item : null;
}
console.log(max);
*/
```
