// JS打包入口文件

// 1. 在 React 学习中，需要安装 两个包 react  react-dom
// 1.1 react 这个包，是专门用来创建React组件、组件生命周期等这些东西的；
// 1.2 react-dom 里面主要封装了和 DOM 操作相关的包，比如，要把 组件渲染到页面上
import React from 'react'
import ReactDOM from 'react-dom'

// 2. 在 react 中，如要要创建 DOM 元素了，只能使用 React 提供的 JS API 来创建，不能【直接】像 Vue 中那样，手写 HTML 元素
// React.createElement() 方法，用于创建 虚拟DOM 对象，它接收 3个及以上的参数
// 参数1： 是个字符串类型的参数，表示要创建的元素类型
// 参数2： 是一个属性对象，表示 创建的这个元素上，有哪些属性
// 参数3： 从第三个参数的位置开始，后面可以放好多的虚拟DOM对象，这写参数，表示当前元素的子节点
// <div title="this is a div" id="mydiv">这是一个div</div>

// var myH1 = React.createElement('h1', null, '这是一个大大的H1')
// var myDiv = React.createElement('div', { title: 'this is a div', id: 'mydiv' }, '这是一个div', myH1)
// 由于，React官方，发现，如果直接让用户手写 JS 代码创建元素，用户会疯掉的，然后，用户就开始寻找新的前端框架了，于是，
// React 官方，就提出了一套 JSX 语法规范，能够让我们在 JS 文件中，书写类似于 HTML 那样的代码，快速定义虚拟DOM结构；
// 问题： JSX（符合 XML 规范的 JS 语法）的原理是什么？？？
// 注意： 千万要记住，哪怕你在 JS 中可以写 JSX 语法了，但是，JSX内部在运行的时候，也是先把 类似于HTML 这样的标签代码，
// 转换为了 React.createElement 的形式；
// 也就是说：哪怕我们写了 JSX 这样的标签，也并不是直接把 我们的 HTML 标签渲染到页面上，而是先转换成 React.createElement 这样的JS代码，再渲染到页面中；（JSX是一个对程序员友好的语法糖）


// 如果要直接使用 JSX 语法，需要先安装相关的 语法转换工具
// 运行 cnpm i babel-preset-react -D
// var mytitle = '这是使用变量定义的 tilte 值'

// var arr = []
// for (var i = 0; i < 10; i++) {
//   var p = <p className="myp" key={i}>但是，你知道它的本质吗？？？</p>
//   arr.push(p)
// }
// var mydiv = <div>
//   这是使用 jsx 语法创建的div元素
//   <h1 title={mytitle + 'aaaaa'}>哈哈哈，JSX真好用啊</h1>
//   <p className="myp">但是，你知道它的本质吗？？？</p>
//   <label htmlFor=""></label>

//   {arr}

//   /* 这是多行注释，你肯定看不到我 */
//   { 
//     // zheshi zhushi 
//   }

//   { /* 这是注释 */ }
//   {/* 1234 */}
// </div>


// 在React中，构造函数，就是一个最基本的组件
// 如果想要把组件放到页面中，可以把 构造函数的名称，当作 组件的名称，以 HTML标签形式引入页面中即可
// 注意：React在解析所有的标签的时候，是以标签的首字母来区分的，如果标签的首字母是小写，那么就按照 普通的 HTML 标签来解析，如果 首字母是大写，则按照 组件的形式去解析渲染
// 结论：组件的首字母必须是大写
// function Hello(props) {
//   // 在组件中，如果想要使用外部传递过来的数据，必须，显示的在 构造函数参数列表中，定义 props 属性来接收；
//   // 通过 props 得到的任何数据都是只读的，不能从新赋值
//   // props.name = '000'
//   return <div>
//     <h1>这是在Hello组件中定义的元素 --- {props.name}</h1>
//   </div>
// }

// var name = 'zs'
// var age = 20
var person = {
  name: 'ls',
  age: 22,
  gender: '男',
  address: '北京'
}

import Hello from './components/Hello.jsx'

// import myclass from './class_study.js'
import myClass from './class_study2.js'


// ReactDOM.render('要渲染的虚拟DOM元素', '要渲染到页面上的哪个位置中')
// 注意： ReactDOM.render() 方法的第二个参数，和vue不一样，不接受 "#app" 这样的字符串，而是需要传递一个 原生的 DOM 对象
ReactDOM.render(<div>
  {/* <Hello name={person.name} age={person.age} gender={person.gender} address={person.address}></Hello> */}

  <Hello {...person}></Hello>
</div>, document.getElementById('app'))

// 注意：这里 ...Obj  语法，是 ES6中的属性扩散， 表示，把这个对象上的所有属性，展开了，放到这个位置