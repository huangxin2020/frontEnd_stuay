# jQuery(JQ)是一款非常优秀的JS“类库”

## 一些专业术语

类库、插件、UI组件、框架
1. 类库:JQ/ZEPTO...  提供一些真实项目中常用的方法，任何项目都可以把类库导入进来，调取里面的方法实现自己需要的业务逻辑
2. 插件:具备一定的业务功能，例如，我们可以封装轮播图插件、选项卡插件、模态框插件等（插件规定了当前这个功能的样式结构，把实现功能的JS进行封装，以后想实现这个功能直接导入插件即可） 

swiper\iscroll\jquery-dialog\jquery-drag\jquery-datepicker\ECharts... - 常用的插件

3. UI组件:把结构、CSS、JS全部都封装好了,我们想实现一个功能直接导入进来即可（偶尔需要我们修改一下） bootstrap...
4. 框架:具备一定的编程思想，要求我们按照框架的思想开发，一般框架中提供了常用的类库方法，提供了强大的功能插件，有的也提供了强大的UI组件...  React(React native) / Vue / Angular / Backbone / Sea.js / Require.js ...

jQuery(JQ)非常优秀的JS“类库”
- 基于原生JS封装的一个类库，提供了很多的方法，而且这些方法是兼容所有浏览器的
- JQ版本
    + V1 (常用) 1.8.3  1.9.3  1.11.3
    + V2 (用于移动端 - 去掉了很多兼容性)
    + V3

## JQuery 的部分源码分析-基本结构部分

```js
(function () {
    var version = "1.11.3",
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);//=>创建了init这个类的实例，也相当于创建了jQuery这个类的实例（因为在后面的时候，让init.prototype=jQuery.prototype）
        };

    //=>JQUERY是一个类，在它的原型上提供了很多的属性和方法，供JQ的实例调取使用
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,//=>当前类的原型重定向后,自己开辟的堆内存中是没有CONSTRUCTOR的，需要手动增加保证它的完整性
        filter:function(){

        },
        ...
    };

    // 给JQ原型上增加EXTEND方法，同时把JQ当做一个普通对象，给这个对象设置了一个私有的方法
    /*
     JQ是一个类（也是一个普通对象）：函数的两种角色，JQ是一个类库提供了很多的方法，其中这些方法有两部分
       1.放到JQ原型上的(jQuery.fn/jQuery.prototype)，这里面的方法是供JQ实例调取使用的
       2.把JQ当做一个普通的对象，在对象上设置一些私有的属性和方法，这类方法以后用的时候直接的jQuery.xxx()执行即可
    */
    jQuery.extend = jQuery.fn.extend = function () {
        //=>EXTEND是把一个对象中的属性和方法扩展到指定的对象上
    };

    jQuery.extend({
        isFunction: function (obj) {

        },
        isArray: function () {

        },
        ...
    });
    //jQuery:{extend:...,isFunction:...,isArray:...}

    // jQuery.fn.extend({
    //     find:...
    // });
    // //jQuery.prototype:{...,find:...}

    var init = jQuery.fn.init = function (selector, context) {

    };
    init.prototype = jQuery.fn;//=>把init当做一个类，但是让这个类的原型指向了jQuery.prototype（init这个类的实例最后找到的也是jQuery这个类原型上的方法 =>init的实例其实也可以理解为jQuery的实例）

    window.jQuery = window.$ = jQuery;
})();
$().filter() //=>创建一个JQUERY类的实例，可以调取JQ.FN中的方法
$.isFunction() //=>把JQ当做一个普通对象，直接的使用对象上扩展的那些私有属性和方法（这些方法和实例没关系）
*/

let Fn = function () {
    return new init();//=>创建INIT的实例
};
let init = function () {

};
init.prototype = Fn.prototype;
// let f = Fn();//=>目的：不加NEW也能创建FN的实例
```
# jquery使用
在head中使用script标签中像引用外部js文件一样引用就行

JQ选择器：基于各种选择器创建一个JQ实例(JQ对象)
1. selector 选择器的类型(一般都是字符串，但是支持函数或者元素对象)
2. context 基于选择器获取元素时候指定的上下文（默认document）

JQ对象：一个类数组结构(JQ实例)，这个类数组集合中包含了获取到的元素

jq选择器本质就是通过输入css选择器获得一个jq实例，实例中封装了多种属性

```js
console.log($('.tabBox'));
/* 
JQ对象（类数组）=>JQ实例
  0: div.tabBox
  length: 1
  context: document
  selector: '.tabBox'
  __proto__:jQuery.prototype
    add
    ...
  __proto__:Object.prototype
    hasOwnProperty
    ... 
*/

```
获取页面中的元素对象
1. 基于原生JS提供的属性和方法(getElementsByTagName之类的)获取 =>"原生JS对象"
    - 可以调取使用内置的JS属性和方法
        + className
        + onclick
        + ...

2. 基于JQ选择器获取 =>"JQ对象"
    - 可以调取JQ原型上提供的属性和方法
        + add
        + find
        + ...

把JQ对象和原生JS对象之间相互的转换

```js
// [把JQ->原生JS]
// JQ对象是一个类数组集合，集合中每个索引对应的都是原生JS对象，我们基于索引获取即可
let $tabBox=$('.tabBox');  // 变量名前面是以$开始的，一般代表基于JQ选择器获取的结果
let tabBox=$tabBox[0];
abBox=$tabBox.get(0); //=>GET是JQ原型上提供的方法，供JQ实例基于索引获取到指定的原生JS对象

abBox=$tabBox.eq(0); // 它也是基于索引获取集合中的某一项，只不过GET获取的是JS对象，EQ会把获取
// 的结果包裹成一个新的JQ对象(JQ实例返回)

// [把原生JS->JQ]
let tabBox=document.querySelector('.tabBox');
// $(tabBox) 直接使用选择器把原生JS对象包裹起来，就会把JS转换为JQ对象（因为$()就是创建JQ的一个实例）

let $tabBox = $('.tabBox');
let tabBox = document.querySelector('.tabBox');
```

>分析选择器源码，我们发现SELECTOR传递的值支持三种类型
1. STRING ：基于选择器获取元素
2. 元素对象 selector.nodeType：  把JS对象转换为JQ对象
3. 函数：把传递的函数执行，把JQ当做实参传递给函数 selector(jQuery)

```js
$(function () {
    console.log('ok');
});
// 会打印出ok
$(function ($) {
    //=>$:传递进来的jQuery
});

// 防止有人修改$了的时候 使用了jq的高级写法
$ = '哈哈哈';
// $();//=>Uncaught TypeError: $ is not a function
jQuery(function ($) {
    //=>$:私有变量,而且特定就是JQ
    $();
});

jQuery(() => {
    //=>函数肯定会执行，但是会在当前页面中的HTML结构都加载完成后再执行
    //=>函数执行会形成一个闭包
});

// API文档上标准的写法
$(function () {
    //=>写自己的代码
});
```

# jquery中的方法 - 常用的方法

JQ选择器的SELECTOR可以是字符串，字符串这种格式也有两种
1. 选择器
2. HTML字符串拼接的结构：把拼接好的HTML字符串转换为JQ对象，然后可以基于APPEND-TO等方法追加到页面中

```js
//  写一个HTML结构放在jq中 就是创建一个HTML文档结构

$('<div id="AA"></div>').appendTo(document.body);

/* 
EACH：JQ中的EACH方法是用来进行遍历的（类似于数组的FOR-EACH）
[可遍历内容]
    1.数组
    2.对象
    3.类数组(JQ对象)
    ...
[三种EACH] - 都是同一个each方法
    1.给JQUERY设置的私有属性  $.each()
    2.给实例设置的公有属性 $([selector]).each()
    3.内置的EACH 
*/

// 遍历数组
$.each([12, 23, 34], (index, item) => {
    //=>参数的顺序和内置FOR-EACH相反
    console.log(index, item);
});

// 遍历对象
$.each({name: 'xxx', age: 25, 0: 100}, (key, value) => {
    //=>原理其实就是FOR-IN循环
    console.log(key, value);
});

// 给实例设置的公有属性 (绑定事件)
$('.tabBox li').each(function (index, item) {
    //=>非箭头函数：THIS===ITEM，当前遍历的这一项 （原生JS对象）
    //=>$(THIS)把当前遍历的这一项转换为JQ对象
    $(this).click(function () {
        //=>给每一个遍历的LI都绑定一个点击事件
        //THIS:当前点击的LI（原生JS对象）
        $(this).css({
            color: 'red'
        });
    });
});

$('.tabBox li').click(function () {
    //=>获取的JQ集合中有三个，我们此处相当于给三个LI都绑定了点击事件（JQ在调取CLICK的时候，会默认的把集合进行EACH遍历，把每一项都给CLICK了）
    // jq中强大的内置语法
});
$('.tabBox li').css({
    color: 'green'
});


jQuery.noConflict();//=>转让JQ使用$的权利 此时的$不再代表jquery
console.log($);//=>UNDEFINED
jQuery();

let zzz = jQuery.noConflict(true);//=>深度转让:把jQuery这个名字也让出去，返回结果赋值给一个变量，此时这个变量是新的JQ代言人
console.log(jQuery);//=>UNDEFINED
console.log(zzz);

// jquery 中的ajax使用
// 获取数据的更方便的方法
$.ajax({
    url: 'json/product.json',
    method: 'GET',
    dataType: 'json',
    async: false,
    success: function (result) {
        console.log(result);
    }
});
```
常用的筛选方法：
- filter：同级筛选
- children：子集筛选
- find：后代筛选

# JQuery原理与理解
JQuery
JQ是一个JS类库，里面提供了很多的常用方法，有助于我们快速开发，而且这些方法是兼容所有浏览器的（V2 / V3 不兼容低版本浏览器）
我之前在学习原生JS的时候，或多或少的看了一部分JQ源码，之前看源码的时候，发现JQ就是一个类，而$()就是创建这个类的一个实例，这个实例是基于内置方法makeArray创造的类数组
JQ提供的方法有两部分，一部分是放到原型上的，供实例调取使用，一部分是放到对象上的，直接$.xxx调取使用，想要后期自己扩展方法（包括基于JQ写插件），都可以基于extend这个方法向JQ中扩展
JQ中提供了动画、事件、AJAX等常用的方法，我学习JQ源码的时候比较注重里面的一些封装和编程的思想，例如：发布订阅这种设计模式我就是依据JQ的$.Callbacks学习研究的，所以学习JQ给我带来了很多的好处...