# AJAX在实际开发中的应用

## 1. 获取数据 - 在实战项目SHOP中有基于高级单例模式的数据绑定写法
> 真实的项目中，页面的大部分数据都不会写死的，而是动态绑定的 流程一般为

> A:从服务器端获取到数据(基于AJAX/JSONP等技术，通过服务器端提供的数据API接口数据地址，把数据请求回来)
> B:把获取的数据进行绑定
> C:把数据绑定在HTML页面中(数据绑定): ES6中的模板字符串

通过这四步就可以通过Ajax把数据拿到 - 处理地址 其它的都是需要记住的
```JS
let xhr = new XMLHttpRequest(); // =>创建一个AJAX实例
xhr.open('GET', 'json/product.json', false); //=>打开一个请求的地址(一般地址都是服务器提供好的，会给我们一个API接口文档)，最后一个参数是设置同步还是异步(false: 同步 true: 异步)，真实项目中最常使用的是异步，这个商品排序项目中为了简单使用了同步 - 一件一件的做

// onreadystatechange - 事件监听
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
};
xhr.send(null);

// => 获取到结果是一个字符串：'JSON格式的字符串'
// 我们实际需要的是操作对象而不是字符串，所有我们会把JSON格式的字符串给转换成对象
// console.log(productData);

// => 一般此时的JSON对象都是存放在一个数组中的
productData = JSON.parse(productData);
```
## JSON格式

JSON格式：JSON不是一种数据类型，而是一种数据格式，只要把对象的属性名用双引号括起来，此时的对象就不再称之为普通对象，而是叫做JSON格式的对象

```js
let obj = {"name": "xxx"};//=>OBJ是JSON格式对象（操作起来和普通对象没啥太大区别）

// 从服务器端获取的数据格式一般都是JSON格式的(大部分都是JSON格式字符串)
let str = '{"name": "xxx"}';//=>JSON格式的字符串 

// 我们在使用的时候需要把获取到的JSON格式字符串转换成JSON格式对象
// window为我们提供的方法

/* window.JSON
    1.parse：把JSON格式的字符串转换为对象
    2.stringify：把对象转换为JSON格式的字符串
*/

window.JSON.parse();
JSON.parse(); 

JSON.parse('{"name":"haha"}'); // {name: "haha"}
JSON.stringify({"name":"xixi"}); // "{"name":"xixi"}"

```
## 2.实现数据绑定

数据绑定（DOM数据绑定）：依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的数据和结构放到页面指定容器中

常用的绑定方法
>1.字符串拼接
   ->传统字符串拼接 (操作繁琐)
   ->ES6模板字符串拼接
   ->模板引擎:原理也是字符串拼接 (Vue这些框架)
>2.动态创建DOM
   ->createElement
   ->appendChild
   弊端：操作起来太麻烦，而且性能消耗更大（DOM回流）

使用ES6模板字符串来实现数据绑定

```js
let list = document.getElementById('list');
let str = ``;//=>这是两个撇(TAB上边按键) ES6模板字符串
for (let i = 0; i < productData.length; i++) {
    let {
        title,
        img = 'img/1.jpg',//=>没有返回IMG,我们用默认图占位
        price
    } = productData[i];

    str += `<li><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>${price}</span>
        </a></li>`;
}
list.innerHTML = str;
```

更详细的细节去看项目文件


# 如果使用了querySelector获取DOM结构 我们需要做的优化处理 数据绑定的方法
> 1.字符串拼接
    普通字符串拼接
    ES6模板字符串
    模板引擎
> 2.DOM操作

```js
let str = ``;
data.forEach(item => {
    str += `<li><a href="#">
            <img src="img/1.jpg" alt="">
            <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）</p>
            <span>￥4888</span>
            <span>时间：2014-01-01</span>
            <span>热度：9999</span>
        </a></li>`;
});
document.querySelector('.productBox').innerHTML = str;
//=>只引发一次DOM回流  +=str 把原有容器中的结构都以字符串的方式获取到，然后和新的STR字符串拼接，最后统一在插入到原有的容器中  =str 用新的字符串替换原有的结构

data.forEach((item, index) => {
    //=>动态创建DOM的方式(外层容器基于CREATE-ELEMENT完成，容器中的具体内容可以基于创建DOM完成，也可以基于字符串拼接完成)
    //=>之所以不建议使用这种方式，因为循环十次，每一次都改变了原有的DOM结构，引发浏览器的十次回流
    let curLi = document.createElement('li');
    curLi.innerHTML = `<a href="#">
            <img src="img/1.jpg" alt="">
            <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）</p>
            <span>￥4888</span>
            <span>时间：2014-01-01</span>
            <span>热度：9999</span>
        </a>`;
    document.querySelector('.productBox').appendChild(curLi);
});

//=>基于文档碎片(虚拟内存中开辟的一个容器)可以解决这个问题：每当创建一个LI，我们首先把它存放到文档碎片中（千万不要放到页面中，避免回流），当我们把需要的元素都创建完成，并且都添加到文档碎片中，在统一把文档碎片放到页面中（只会引发一次回流操作）
let frg = document.createDocumentFragment();//=>创建文档碎片容器
data.forEach((item, index) => {
    let curLi = document.createElement('li');
    curLi.innerHTML = `<a href="#">
            <img src="img/1.jpg" alt="">
            <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）</p>
            <span>￥4888</span>
            <span>时间：2014-01-01</span>
            <span>热度：9999</span>
        </a>`;
    frg.appendChild(curLi);//=>每一次把创建的LI存放到文档碎片中
});
document.querySelector('.productBox').appendChild(frg);//=>把文档碎片中的内容，统一存放到页面中
frg = null;

/* 
DOM的回流(reflow)和重绘(repaint)
  1.计算DOM结构(DOM TREE)
  2.加载CSS
  3.生成渲染树(RENDER TREE)，渲染树是和样式相关的
  4.浏览器基于GPU(显卡)开始按照RENDER TREE画页面

重绘：当某一个DOM元素样式更改（位置没变只是样式更改，例如：颜色变为红色...）浏览器会重新渲染这个元素
  box.style.color='red'
  //...还有一些其它代码
  box.style.fontSize='16px'

  上面的操作触发了两次重绘，性能上有所消耗，真实项目中为了优化这个性能，我们最好一次性把需要修改的样式搞定，例如：
  .xxx{
     color:'red',
     fontSize:'16px'
  }
  box.className='xxx'
回流：当DOM元素的结构或者位置发生改变（删除、增加、改变位置、改变大小...）都会引发回流，所谓回流，就是浏览器抛弃原有计算的结构和样式，从新进行DOM TREE或者RENDER TREE，非常非常非常...消耗性能 
*/

/*
 * 分离读写 - 在实际开发中我们应该尽量的减少回流，但是实际上产生重绘回流确实无法避免，这时我们就需要尽量减少回流对性能的消耗
*/
//[引发两次回流]
// box.style.top = '100px';
// console.log(box.style.top);//=>'100px'
// box.style.left = '100px';

//[引发一次回流]
box.style.top = '100px';
box.style.left = '100px';
console.log(box.style.top);//=>'100px'
```

