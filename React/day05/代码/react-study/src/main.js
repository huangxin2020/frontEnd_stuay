// JS打包入口文件
// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

// 导入计数器组件
// import Counter from './components/Counter.jsx'
// import Test from './components/TestReceiveProps.jsx'
// import BindThis from './components/BindThis.jsx'

// import CmtList from './components/Comment/CmtList.jsx'

import Context from './components/Context.jsx'

// 使用 render 函数渲染 虚拟DOM
ReactDOM.render(<div>
  {/* 规定，每个用户在使用 组件的时候，必须传递一个 默认的 数量值，最为 组件初始化的 数据 */}
  {/* <Counter initcount={0}></Counter> */}

  {/* <hr /> */}

  {/* <Counter initcount={4}></Counter> */}

  {/* <Test></Test> */}
  {/* <BindThis></BindThis> */}
  {/* <CmtList></CmtList> */}

  <Context></Context>
</div>, document.getElementById('app'))