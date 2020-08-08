// JS打包入口文件
// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'

// 全局导入 Ant Design 的样式表
// 一般，我们使用的 第三方UI组件，它们的样式表文件，都是 以 .css 结尾的，所以，我们最好不要为 .css 后缀名的文件，启用 模块化；
// 我们推荐自己不要直接手写 .css 的文件，而是自己手写 scss 或 less 文件，这样，我们只需要为 scss 文件 或 less 文件启用模块化就好了；

// 由于 直接使用 Ant Design 的全部包，体积过大，所以，建议大家使用 按需导入，这样，能减少 bundle.js 文件的体积
// import 'antd/dist/antd.css'

// 使用 render 函数渲染 虚拟DOM
ReactDOM.render(<App></App>, document.getElementById('app'))