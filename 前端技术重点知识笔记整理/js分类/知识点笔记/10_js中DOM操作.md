# DOM及其操作基础部分

DOM : Doucument Object Model - 文档对象模型 - 提供一些属性和方法给我们操作页面中的元素

# js中获取DOM元素的方法

- doucment.getElementById() - 指定文档中，基于元素的ID获得该元素对象 
1. 上下文只能是document（只有document这个实例的原型链上才能找到这个方法，其它实例都找不到）
2. ID重复了获取第一个 
3. IE6~7中会把表单元素的name当做id使用

- doucment.getElementsByTagName() - 指定上下文(容器)中，通过标签名获得一组元素集合 
1. 获取当前上下文中，所有子子孙孙中标签名叫做XXX的元素

- [context].getElementByClassName() - 在指定上下文中，通过样式类名获取一组元素集合 (不兼容IE6~8)

- document.getElementsByName() - 在整个文档中，通过元素的name属性值获取一组节点集合 (在IE中只有表单元素的name才能识别，所以我们一般只应用于表单元素的处理) 上下文也只能是document

- [context].querySelector([selector]) - 在指定上下文中，通过选择器获取到指定的元素对象  (不兼容IE6~8)

- [context].querySelectorAll([selector]) - 在指定上下文中，通过选择器获取到指定的元素集合 (不兼容IE6~8)

**querySelector与querySelectorAll 没有DOM映射关系**

- document.head / document.body / doucment.documentElement - 获取页面中中的 head / body / html 三个元素

获取的是集合，哪怕集合中只有一个元素那它也是一个集合 但是可以通过访问数组的方式 - 集合[索引] 来得到元素

# js中的节点和描述节点之间关系的属性

节点 ：Node 

节点集合 ：NodeList (getElementByName / querySelectorAll 获取的都是节点集合)

页面中的所有东西都是节点

我们常见到节点

- 元素节点 (标签) - nodeType : 1  nodeName : 大写的标签名 nodeValue : null

- 文本节点 - nodeType : 3  nodeName : '#text' nodeValue : 文本内容

- 注释节点 - nodeType : 8  nodeName : '#commen' nodeValue : 注释内容

- 文档节点 document - nodeType : 9  nodeName : '#document' nodeValue : null

- .....

## 描述这些节点之间关系的属性

- childNodes : 获取所有子节点

- children : 获取所有的元素子节点 (子元素标签集合)

- firstChild : 获取第一个子节点

- lastChild : 获取最后一个子节点

- firstElementChild/lastElementChild : 获取第一个和最后一个元素子节点 (不兼容IE6~8)

- previousSibling : 获取上一个哥哥节点

- nextSibling : 获取下一个弟弟节点

- previousElementSibling / nextElementSibling : 获取哥哥和弟弟元素节点 (不兼容IE6~8)

- .....

在传统的浏览器中(非IE6~8) 会把空格、换行当做文本节点处理 (childNodes包含所有的节点)

IE6~8下 使用children会把注释也当做元素节点

```JS

// 封装一个兼容所有浏览器获取元素子节点的函数
function children(context){
   // 1. 先获取所有的子节点
   var res = [],
   nodeList = context.childNodes;
   // 循坏遍历所有的子节点，找到元素子节点 (nodeType === 1)，存储到数组res中
   for(var i = 0 ; i < nodeList.length ; i++){
      var item = nodeList[i];
      item.nodeType === 1 ? res.push[item] : null;
   }
   return res;
}

// 封装一个兼容所有浏览器获取上一个哥哥元素节点
function prev(context){
   // 先找自己的哥哥
   var pre = context.previousSibling;
   // 如果哥哥节点不是元素节点，则找哥哥节点的哥哥节点，一直找到元素节点为止
   while(pre.nodeType !== 1){
      pre = pre.previousSibling;
   }
   return pre;
}
```

## 在js中动态增删改DOM元素的方法

- `createElement` - 创建元素对象

- `createTextNode` - 创建文本对象

```JS
// 动态创建一个DIV元素对象，把其赋值给BOX
let box = document.createElement('div');
box.id = 'bax';

// 动态添加一个文本
let text = document.createTextNode('好好学习 天天向上');
                                        
```

- `appendChild` - 把元素添加到容器的后面

- `insertBefore` - 把元素添加到指定容器中指定元素的前面
放到指定的元素之前: 容器.insertBefore([新增元素],[指定元素])

- `cloneNode(true/false)` : 克隆元素或者节点 true - 深度克隆 ; false - 浅度克隆
                        - 深度克隆 : 包含后代元素一起复制
                        - 浅克隆   : 只克隆元素结构不包含文本和子元素 

- `removeChild` : 移除容器中的某个元素

# 设置自定义属性的方法

- `setAttribute` - 把属性信息写在元素标签的结构上

```js
<button>点击1</button>
<button>点击2</button>
<button>点击3</button>
 
var btnList = document.querySelectorAll('button'); 
for(var i = 0 ; i < btnList.length ; i++){
   /// 因为当点击事件放生的时候，循环早已结束 所以不管点击那个按钮都是3
   // 使用自定义属性解决 利用属性对象
   // btnList[i].index = i;
   // 自定义的其他方法 - 基于set-attribute是把属性信息写在元素标签的结构上
   btnList[i].setAttribute('data-index', i); // 页面的按钮会增加在元素上
   btnList[i].onclick = function(){
      // 获取自定义属性: 元素对象.属性名 (原理是从堆内存中获取相应的属性值)
      // console.log(this.index + 1)
      console.log(this.getAttribute('data-index'));
   }
}
```

- `setAttribute / getAttribute / removeAttribute` - 设置获取移除元素的自定义属性信息 (这种方式是把自定义属性放在元素结构上)

[散]
xxx.style.xxx=xxx  设置行内样式
=>xxx.style.xxx  获取行内样式
xxx.className='xxx'
xxx.onclick=function...
...前面的都是基础

# 一些经典面试题

## 获取页面中的所有ID项
```js
// 1. 首先要获取页面中的所有标签
// 2. 依次遍历这些标签对象，谁的ID等于我们想要的就保存起来就可以了
/**
* id - 表示我们需要的id的属性值
*/
function queryAllById(id){
   // -> 用通配符选择器 把页面中的所有标签选中 
   var nodeList = document.getElementsByTagName('*'),
       arr = [];
   // 遍历集合把我们需要的保存下来
   for(var i = 0 ; i < nodeList.length ; i++){
      var item = nodeList[i];
      item.id === id ? arr.push[item[i]] : null;
   }
   return arr;
}
```
或者使用下面的直接使用console.log()方法来返回 - 不推荐在实际项目中使用
**在js中可以直接把ID当做变量名来使用**
```html
<body>
   <div id="A">
      <ul>
         <li id="B">1</li>
         <li id="C">2</li>
         <li id="D">3</li>
         <li id="E">4</li>
      </ul>
    </div>

   <script>
      console.log(A);
   </script> 
<body>
```
## JS中有一个insertBefore方法，目的是实现把新元素插入到指定元素之前，现在你实现一个 InsertAfter 方法，把新元素插入到指定元素之后

```js
function insertAfter(newEle, originEle) {
    //=>newEle:新插入的元素
    //=>originEle:指定的老元素
    //=>插入到原有元素的后面，其实就是插入到原有元素弟弟的前面
    let next = originEle.nextElementSibling,
        par = originEle.parentNode;
    if (next) {
        //=>有弟弟插入到弟弟的前面
        par.insertBefore(newEle, next);
    } else {
        //=>没有弟弟插入到容器的末尾
        par.appendChild(newEle);
    }
}

let link = document.createElement('a');
insertAfter(link, p2);

//=>JQ:prepend 把新元素插入到指定容器的开头
```


# js中的盒子模型属性 - DOM操作高级部分

在JS中通过相关的属性可以获取(设置)元素的样式信息,这些属性就是盒子模型属性（基本上都是有关于样式的）

分为三个系列 - 记下来就行

client
    top
    left
    width
    height

offset
    top
    left
    width
    height
    parent

scroll
    top
    left
    width
    height

## 第一组 client

有四个属性 clientTop/Left/Width/Height

1.clientWidth & clientHeight：获取当前元素可视区域的宽高（内容的宽高+左右/上下PADDING）
和内容是否有溢出无关（和是否设置了OVERFLOW:HIDDEN也无关），就是我们自己设定的内容的宽高+PADDING

- 获取当前页面一屏幕(可视区域)的宽度和高度
```js
document.documentElement.clientWidth || document.body.clientWidth
document.documentElement.clientHeight || document.body.clientHeight
```

2.clientTop & clientLeft：获取(上/左)边框的宽度

## 第二组 offset
1. offsetWidth & offsetHeight：在client的基础上加上border（和内容是否溢出也没有关系）
2. offsetParent：获取当前盒子的父级参照物
3. offsetTop / offsetLeft：获取当前盒子距离其父级参照物的偏移量(上偏移/左偏移)  当前盒子的外边框开始~父级参照物的内边框



## 第三组 scroll
1. scrollWidth & scrollHeight：真实内容的宽高（不一定是自己设定的值，因为可能会存在内容溢出，有内容溢出的情况下，需要把溢出的内容也算上）+ 左/上PADDING，而且是一个约等于的值 （没有内容溢出和CLIENT一样）
在不同浏览器中，或者是否设置了OVERFLOW:HIDDEN都会对最后的结果产生影响，所以这个值仅仅做参考，属于约等于的值

2. scrollTop / scrollLeft：滚动条卷去的宽度或者高度

获取当前页面的真实宽高（包含溢出的部分）
```js
document.documentElement.scrollWidth || document.body.scrollWidth
document.documentElement.scrollHeight || document.body.scrollHeight
```

# 通过JS盒模型属性获取值的特点
1.获取的都是数字不带单位
2.获取的都是整数，不会出现小数（一般都会四舍五入，尤其是获取的 偏移量）
3.获取的结果都是复合样式值（好几个元素的样式组合在一起的值），如果只想获取单一样式值（例如：只想获取PADDING），我们的盒子模型属性就操作不了了（这不能说没有用，真实项目中，有时候我们就是需要获取组合的值来完成一些操作）

# 获取元素具体的某个样式值
1.[元素].style.xxx 操作获取
> 只能获取所有写在元素行内上的样式(不写在行内上,不管你写没写都获取不到,真实项目中我们很少会把样式写在行内上)
outer.style.width =>'' (width是写在样式表中的)

2.获取当前元素所有经过浏览器计算的样式
> 经过计算的样式：只要当前元素可以在页面中呈现（或者浏览器渲染它了），那么它的样式都是被计算过的
不管当前样式写在哪
不管你是否写了(浏览器会给元素设置一些默认样式)

```js
// 标准浏览器(IE9+)
// window.getComputedStyle([元素],[伪类,一般都写null]) 获取到当前元素所有被浏览器计算过的样式(对象)

// 元素可以使用css选择器来获取 - 获取当前元素所有的经过浏览器渲染的样式
// window.getComputedStyle([className],null).padding  获取这个歌class名dom的padding
 
// IE6~8
// [元素].currentStyle 获取经过计算的样式


/* 
getCss：获取当前元素某一个样式属性值

@param
   curEle[object]：当前要操作的元素
   attr[string]：当前要获取的样式属性名
@return
   获取的样式属性值 
*/  

// 封装一个函数getCss
// curEle - 元素  ||   attr - 想要回去的属性
let getCss = function getCss(curEle, attr) {
    if ('getComputedStyle' in window) {
        let val = window.getComputedStyle(curEle, null)[attr];
        //=>把获取的结果去除单位（不是所有的值都能去单位的，例如：display\一些复合值(border)都去不掉单位），只有符合 数字+单位 这种模式的结果才能基于PARSE-FLOAT去单位 没有单位更方便我们使用
        let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    }
    //=>throw new SyntaxError：抛出一个错误(语法错误),让浏览器崩溃,不在继续执行JS
    throw new SyntaxError('您的浏览器版本过低，请升级到最新版本，谢谢配合！！');
};
console.log(getCss(outer, 'width'));

//=>获取当前元素的某一个样式属性值
let getCss = function (curEle, attr) {
    if (typeof window.getComputedStyle === 'undefined') {
        //=>当前浏览器不兼容GET-COMPUTED-STYLE
        return;
    }
    let val = window.getComputedStyle(curEle, null)[attr],
        reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
    reg.test(val) ? val = parseFloat(val) : null;
    return val;
};

```

# 给元素设置某个样式值

设置当前元素的某一个具体样式的属性值

JS中给元素设置样式只有两种
1. 设置元素的样式类名（前提：样式类及对应的样式已经处理完成）
2. 通过行内样式设置 xxx.style.xxx=xxx (下面封装的函数就是基于这种方式)

```js
// curEle - 要设置样式的元素 || atter - 要设置的属性 || value - 属性值
let setCss = function (curEle, attr, value) {
    /*
    细节处理
    1.如果需要考虑IE6~8兼容，透明度这个样式在低版本浏览器中不是使用opacity，而是filter（我们两套都要设置）
    2.如果传递进来的VALUE值没有带单位,我们根据情况设置PX单位
        ->某些样式属性才会加单位：WIDTH/HEIGHT/PADDING(LEFT...)/MARGIN(LEFT...)/FONT-SIZE/TOP/LEFT/BOTTOM/RIGHT...
        ->用户自己传递的VALUE值中是没有单位的
    */
    if (attr === 'opacity') {
        curEle.style.opacity = value;
        curEle.style.filter = `alpha(opacity=${value * 100})`;
        return;
    }
    if (!isNaN(value)) {
        //=>IS-NaN检测的结果是FALSE：说明VALUE是纯数字没单位
        let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
        reg.test(attr) ? value += 'px' : null;
    }
    curEle['style'][attr] = value;
};

//=>给元素批量设置样式
let setGroupCss = function (curEle, options = {}) {
    // 遍历传递的OPTIONS,有多少键值对,就循环多少次,每一次都调取SET-CSS方法逐一设置即可
    // 使用for in 循环
    for (let attr in options) {
        if (!options.hasOwnProperty(attr)) break;
        //=>options:传递进来的需要修改的样式对象(集合)
        //=>attr:每一次遍历到的集合中的某一项(要操作的样式属性名)
        //=>options[attr]:传递的要操作的样式属性值
        setCss(curEle, attr, options[attr]);
    }
};
setGroupCss(outer, {
    width: 400,
    height: 400,
    padding: 30
});

// CSS:集合GET/SET/SET-GROUP为一体的方法 
// 以后尽量使用...arg 而不是使用arguments
let css = function (...arg) {
    //=>ARG:传递的实参集合
    let len = arg.length;
    if (len >= 3) {
        //=>单一设置:SET-CSS
        // arg=[outer, 'width', 500];
        // setCss(outer, 'width', 500);
        // setCss.apply(null,arg);  
        setCss(...arg);
        return;
    }
    if (len === 2 && typeof arg[1] === 'object' && arg[1] !== null) {
        //=>传递两个参数，第二个参数是一个对象(不是NULL)，说明想要操作的是批量设置
        setGroupCss(...arg);
        return;
    }
    //=>剩下的代表获取样式
    return getCss(...arg);
};
let css = function (...arg) {
    let len = arg.length,
        fn = getCss;
    len >= 3 ? fn = setCss : null;
    len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null;
    return fn(...arg);
};
```

## for in循环

遍历一个对象中的键值对的，有多少组键值对，我们就遍历多少次

```js
let obj = {name: 'xxx', age: 27, 0: 0, sex: 0, score: 100, 1: 1};

for (let key in obj) {
    console.log(key);//=>KEY存储的是每一次循环获取的属性名
    console.log(obj[key]);//=>每一次循环基于KEY获取属性值

    if(key==='age'){
        break;  // 也支持BREAK和CONTINUE等关键词
    }
    console.log(key);
};

// FOR-IN遍历的时候有自己的顺序：先遍历数字属性名（按照小->大），再遍历字符串属性名（按照书写顺序）
for (let attr in obj) {
    console.log(attr);//=>0 1 name age sex score
}
// obj.__proto__===Object.prototype : obj是Object这个类的一个实例
// 大括号中的是OBJ的私有属性，Object.prototype上的是OBJ公有属性
Object.prototype.bbbb = 1000;
for (let key in obj) {
    //=>FOR-IN循环只遍历当前对象可枚举（可遍历）的属性
    //1.对象的私有属性(自己写的)是可枚举的
    //2.浏览器内置的属性一般都是不可枚举的
    //3.自己在类的原型上设置的属性也是可枚举的,FOR-IN循环的时候也会被遍历出来（一般情况下我们是不想遍历到原型上的公有属性的）
    if (obj.hasOwnProperty(key)) {//=>一般使用FOR-IN在遍历对象的时候，我们加一个私有属性的验证，只有是私有的属性，我们才做操作
        console.log(key);
    }
}
```

**封装了一个公共方法库 utils.js**

# offsetParent、offsetTop、offsetLeft
- offsetParent：获取当前盒子的父级参照物
## 参照物
“参照物”：同一个平面中，元素的父级参照物和结构没有必然联系，默认他们的父级参照物都是BODY（当前平面最外层的盒子） BODY的父级参照物是NULL

```js
center.offsetParent  //=>BODY
inner.offsetParent   //=>BODY
outer.offsetParent   //=>BODY
```

“参照物可以改变”：构建出不同的平面即可（使用zIndex，但是这个属性只对定元素有作用），所以改变元素的定位(position:relative/absolute/fixed)可以改变其父级参照物
```js
utils.css(outer, {
    position: 'relative' //=>把OUTER脱离原有的平面，独立出一个新的平面，后代元素的父级参照物都会以它为参考
});
console.log(center.offsetParent);//=>OUTER
console.log(inner.offsetParent);//=>OUTER
console.log(outer.offsetParent);//=>BODY 脱离文档流之前的参照物


utils.css(inner, {position: 'absolute'});
console.log(center.offsetParent);//=>INNER
console.log(inner.offsetParent);//=>OUTER
console.log(outer.offsetParent);//=>BODY
console.log(document.body.offsetParent);//=>NULL

```
- offsetTop / offsetLeft：获取当前盒子距离其父级参照物的偏移量(上偏移/左偏移) - 当前盒子的外边框开始到父级参照物的内边框的距离
```js
utils.css(outer, {
    position: 'relative'
});
utils.css(inner, {
    position: 'absolute',
    top: 20,
    left: 20
});

// 不管你的父级参照物是谁，我都要获取当前元素距离BODY的偏移量（左偏移和上偏移）
// 1.不能修改既定的样式(不能基于POSITION方式改它的参照物了)
```
![](img/DOM盒子offet.png)

```js
// 封装一个不管父级参照物是谁都可以获取其到body的偏移量的函数
function offset(curEle) {
    //1.先获取当前元素本身的左/上偏移
    let curLeft = curEle.offsetLeft,
        curTop = curEle.offsetTop,
        p = curEle.offsetParent;
    //2.累加父参照物的边框和偏移(一直向上找,找到BODY为止,每当找到一个父参照物都把它的边框和偏移累加起来,根据元素不一样,具体找几次也不知道)
    //TAG-NAME获取当前元素的标签名(大写的)
    while (p.tagName !== 'BODY') {//=>当找到的父参照物是BODY结束查找和累加操作
        //3.把找到的父参照物的边框和偏移值累加起来
        curLeft += p.clientLeft;
        curLeft += p.offsetLeft;
        curTop += p.clientTop;
        curTop += p.offsetTop;
        p = p.offsetParent;//=>基于当前找到的父参照物继续向上查找
    }

    return {
        top: curTop,
        left: curLeft
    };
};
```

# scrollTop / scrollLeft：滚动条卷去的宽度或者高度

最小卷去值：0
最大卷去值：真实页面的高度 - 一屏幕的高度   document.documentElement.scrollHeight-document.documentElement.clientHeight

**在JS盒子模型13个属性中，只有scrollTop/scrollLeft是“可读写”属性，其余都是“只读”属性**

操作浏览器的盒子模型属性，我们一般都要写两套，用来兼容各种模式下的浏览器
怪异模式下 - document.body才能获取

```js
// 都需要写两套太麻烦了 封装函数解决 - 但现在实际的开发中不用太考虑这些兼容性

let winHandle = function (attr, value) {
    if (typeof value !== 'undefined') {
        //=>设置盒子模型属性值:SCROLL-TOP/LEFT
        document.documentElement[attr] = value;
        document.body[attr] = value;
        return;
    }
    return document.documentElement[attr] || document.body[attr];
};

```