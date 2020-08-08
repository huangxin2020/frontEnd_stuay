# ES6中的新语法

- let / const - 声明变量
>和ES5中的var的区别
1） let不存在变量提升机制(变量不允许在声明之前使用)
2） let不允许重复声明 (被let声明的变量在后面不允许再一次声明 - function与var任何形式都不行)
3） 在全局作用域中基于let声明的变量不是window的一个属性 (切断了和window的映射关系)
4） typeof 未声明的变量 => 不是undefined而会报错 (暂时性死区)
5） let会形成块级作用域 (类似于私有作用域，大部分大括号都会形成块级作用域链)
...

- 解构赋值

- '...'拓展、剩余、展开运算符

- 箭头函数
>和普通函数的区别
1) 没有arguments，但是可以基于 ...arg获取实参集合 (结果是一个数组)
2) 没有自己的this，箭头函数中的this是上下文的this

- ES6中的模板字符串

- Promise (async/await)

- class (ES中创建类的)

- interator (for of 循环)

- Map / Set

- ...

## let声明与var声明的区别
> 在ES6中基于LET/CONST等方式创建变量或者函数,不存在变量提升机制
  切断了全局变量和WINDOW属性的映射机制
  在相同的作用域中，基于LET不能声明相同名字的变量（不管用什么方式在当前作用域下声明了变量，再次使用LET创建都会报错- 用var声明的变量 在一次用let来定义也会报错）
  虽然没有变量提升机制，但是在当前作用域代码自上而下执行之前，浏览器会做一个重复性检测（语法检测）：自上而下查找当前作用域下所有变量，一旦发现有重复的，直接抛出异常，代码也不会在执行了（虽然没有把变量提前声明定义，但是浏览器已经记住了，当前作用域下有哪些变量）
```js
console.log(a);//=>Uncaught ReferenceError: a is not defined Uncaught ReferenceError - 引用错误
let a = 12;
console.log(window.a);//=>undefined
console.log(a);//=>12
```
> 1.不存在变量提升机制
> 2.不允许出现重复定义
> 3.不会暂时性死区
暂时性死区 - 原本用var声明的变量如果没有声明之前使用 typeof检测会显示 undefined
```js
// console.log(a);//=>Uncaught ReferenceError: a is not defined
console.log(typeof a);//=>"undefined" 在原有浏览器渲染机制下,基于typeof等逻辑运算符检测一个未被声明过的变量，不会报错，返回UNDEFINED - 这就是暂时性死区
```
而在ES6中
```js
// console.log(a);//=>Uncaught ReferenceError: a is not defined
console.log(typeof a);//=>Uncaught ReferenceError: a is not defined
let a;//=>如果当前变量是基于ES6语法处理，在没有声明这个变量的时候，使用TYPEOF检测会直接报错，不会是UNDEFINED，解决了原有的JS的死区
```
## 基于ES6中的LET来创建变量,是存在块级作用域的(类似于私有作用域)
```js
//作用域：（栈内存）
//1.全局作用域
//2.私有作用域（函数执行）
//3.块级作用域（一般用大括号包起来的都是块级作用域，前提是ES6语法规范）
/*
{
    let a = 12;
    console.log(a);//=>12
}
console.log(a);//=>Uncaught ReferenceError: a is not defined
*/

/*let a = 100;
{
    let a = 100;
    {
        {
            console.log(a);//=>100
        }
    }
}
*/

if (1 === 1) {
    //=>判断体也是块级作用域
    let a = 12;
}
console.log(a);//=>Uncaught ReferenceError: a is not defined*/

for (let i = 0; i < 5; i++) {
    //=>循环体也是块级作用域，初始值设置的变量是当前本次块级作用域中的变量(形成了五个块级作用域，每个块级作用域中都有一个私有变量I，变量值就是每一次循环I的值)
}
console.log(i);//=>Uncaught ReferenceError: i is not defined

// var obj={};//=>对象的大括号不是块级作用域
```

## ES6中的展开运算符

### 找数组中的最大值操作

```js
let ary = [12, 13, 14, 23, 24, 13, 15, 12];

let max = Math.max.apply(null, ary);
console.log(max);

// 基于ES6中的展开运算符完成 

let max = Math.max(...ary);
console.log(max);
```

### ES6的解构赋值

一般来说除了null、undefined其他类型都能解构赋值

解构赋值：按照一个数据值的结构，快速解析获取到其中的内容
    -真实项目中一般都是针对于数组或者对象进行结构赋值

数组解构赋值
```js
let ary = [12,23,24];
/* let a=ary[0],
    b=ary[1],
    c=ary[2]; */
// 上面试ES3中获取数组每一项的方式

// 利用解构赋值
let [a, b, c] = ary;//=>让等号左边出现和右边相同的数据结构,左边可以创建一些变量快速获取到右侧对应位置的值(解构赋值)
console.log(a, b, c); // 12,23,24

// 还可以获取第一个的值
let [a] = ary;
console.log(a);//=>12
// 获取最后一个的值
let [,,c] = ary;
console.log(c); //=>24
// 获取第一项和最后一项
let [a,,c] = ary;
console.log(a,c); //=> 12,24
// 以上方法都是需要知道数组有多少项的情况下才能使用的

// =>需求：获取第一项，把剩下的项作为一个数组返回
let ary = [12, 23, 34, 45, 56];
let [a, ...b] = ary;
console.log(a, b);//=>12 [23,34,45,56]  “...”在此处称之为剩余运算符：除了前面以外的项，都放在一个数组中
let [a, ...b, c] = ary;//=>Uncaught SyntaxError: Rest element must be last element 剩余运算符只能处于解构中最后的位置

// 解构赋值的其他使用方式

let ary = [12];
let [a, b = 0] = ary;//=>在解构的时候可以给变量设置默认值：如果当前变量对应结构中的这一项没有值，变量用默认值
console.log(a, b);//=>12 0

// 解构赋值在实际开发中，我们会经常使用

// 解构赋值的面试题 - a&b互换位置
let a = 12,
    b = 13;
// 利用一个其他的变量做中间变量来交换
let c=a;
    a=b;
    b=c;
console.log(a, b);
// 利用算法来交换
a=a+b;
b=a-b;
a=a-b;
console.log(a, b);

// 利用解构赋值来交换 - 简单方便建议使用
[a, b] = [b, a];//=>[13,12]
console.log(a, b);
```
对象的解构赋值
```js
let obj = {name: 'xxx', age: 25, sex: 0};
let {name, age} = obj;//=>对象解构赋值默认情况下要求：左侧变量名和对象中的属性名一致才可以
console.log(name, age);

// 获取某个属性名的值
let {sex} = obj;
console.log(sex);//=>0

// 修改属性名
let {age: ageAA} = obj;
// console.log(age);//=>Uncaught ReferenceError: age is not defined
console.log(ageAA);//=>25 给解构的属性名起别名作为我们使用的变量

// 给属性设置默认值
let {friend = 0} = obj;
console.log(friend);//=>0 给不存在的属性设置默认值


// 在以后开发中使用解构赋值的方式 - 必定要使用
let fn = function ({
        name = '珠峰',
        age = 0
    } = {}) {
    //=>把传递的对象解构了(不传递值,默认赋值为空对象：现在传递对象或者不传递，形参接收到的都是对象)，解构的时候可以把传递进来对象中，如果某个属性不存在，我们赋值默认值
    console.log(name, age);
};
fn({
    name: 'xxx',
    age: 25
});
// 输出前面结果 'xxx' 25
```

## ES6语法中 '...' 的含义

>“...”在ES6的语法中，三个点有三种含义
   1.剩余运算符
   2.拓展运算符
   3.展开运算符：把数组(对象/类数组)中的每一项展开 xxx,xxx,xxx...
```js
// 剩余运算符
let ary = [12, 23, 34];
let [...arg] = ary; //=>ary.slice(0)

function fn(context, ...arg) {
    //=>获取传递值中的第一个和剩下的
    console.log(context, arg);
    //=>ARG是一个数组 / ARGUMENTS是类数组
}
let obj = {};
fn(obj, 10, 20, 30); // => {} [10,20,30]

function sum(...arg) {
    //=>传递几个实参,ARG中就存储多少个,此时的ARG和ARGUMENTS一样的,区别是ARG是一个数组,ARGUMENTS是一个类数组
}
```

```js
// 展开运算符
// 不能直接...[12,12,34]这样会报错
[...[12,12,34]];  // 这样是可以的

let ary = [12, 23, 34];
let fn = function (a, b, c) {
    console.log(a, b, c);
};
Math.max(...ary);//=>Math.max(12,23,34)
fn(ary);//=>a:ary b/c:undefined
fn(...ary);//=>fn(12, 23, 34) 把数组中的每一项分别传递给一个函数,此时我们使用展开运算符把数组展开即可

// 可以给对象克隆并增加新的属性
let obj = {name: 'xxx', age: 20};
let newObj = {...obj, sex: 0};//=>{name: 'xxx', age: 20,sex:0} 把原有对象展开(克隆)放到新对象中

let ary = [12, 23];
let newAry = [...ary, 100];//=>[12, 23, 100]
```

## 箭头函数
```js
// 箭头函数创建方法
let fn = ( x , y) => {

};
fn(10,20);

// 当只有一个行参
let fn = x => {

};

let fn = (x =0,y=0) => x + y; // 如果函数体体中只有一句操作，并且还是return的话，我们可以省略大括号
// 给形参赋值默认值

// 箭头函数里面没有arguments
let fn = (...arg) => {
    // console.log(arguments); // 会报错

    console.log(arg); // 可以使用剩余运算符代替，而且arg是一个数组 更好使用
}

// 箭头函数里面没有自己的执行主体(this)，它的this都是继承上下文中的this
var obj = {
    fn : (function(){
        // 2.利用作用域
        var _this = this; // this => window
        return function(){
            // console.log(this);

            console.log(_this);
        }
    })()
}

obj.fn(); // this => obj
// 如果想要obj.fn() 执行的this也是window
// 1. 利用call
obj.fn.call(window); // this => window

// 3.利用箭头函数 ，没有this的特性 改写上面的函数fn
var obj = {
    fn : (function(){
        return ()=> {
            console.log(this);
        }
    })()
};

obj.fn(); // this => window 
// 箭头函数执行和是否有点，点前面的是谁都没有关系了，因为它没有自己的执行主体，在箭头函数中使用到的this都是直接找上下文的中的this来使用(简单的理解 上下文就是上级作用域 实际上并不是)
```