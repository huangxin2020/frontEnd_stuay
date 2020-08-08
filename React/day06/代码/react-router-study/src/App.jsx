import React from 'react'

// 如果要使用 路由模块，第一步，运行 yarn add react-router-dom 
// 第二步，导入 路由模块

// HashRouter 表示一个路由的跟容器，将来，所有的路由相关的东西，都要包裹在 HashRouter 里面，而且，一个网站中，只需要使用一次 HashRouter 就好了；
// Route 表示一个路由规则， 在 Route 上，有两个比较重要的属性， path   component
// Link 表示一个路由的链接 ，就好比 vue 中的 <router-link to=""></router-link>
import { HashRouter, Route, Link } from 'react-router-dom'

import Home from './components/Home.jsx'
import Movie from './components/Movie.jsx'
import About from './components/About.jsx'


// 导入 日期选择组件
import { DatePicker } from 'antd'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // 当 使用 HashRouter 把 App 根组件的元素包裹起来之后，网站就已经启用路由了
    // 在一个 HashRouter 中，只能有唯一的一个根元素
    // 在一个网站中，只需要使用 唯一的一次 <HashRouter></HashRouter> 就行了
    return <HashRouter>
      <div>
        <h1>这是网站的APP根组件</h1>

        <DatePicker></DatePicker>

        <hr />

        <Link to="/home">首页</Link>&nbsp;&nbsp;
        <Link to="/movie/top250/10">电影</Link>&nbsp;&nbsp;
        <Link to="/about">关于</Link>

        <hr />

        {/* Route 创建的标签，就是路由规则，其中 path 表示要匹配的路由，component 表示要展示的组件 */}
        {/* 在 vue 中有个 router-view 的路由标签，专门用来放置，匹配到的路由组件的，但是，在 react-router 中，并没有类似于这样的标签，而是 ，直接把 Route 标签，当作的 坑（占位符） */}
        {/* Route 具有两种身份：1. 它是一个路由匹配规则； 2. 它是 一个占位符，表示将来匹配到的组件都放到这个位置， 如果想让路由规则，进行精确匹配，可以为 Route，添加 exact 属性，表示启用精确匹配模式 */}
        <Route path="/home" component={Home}></Route>

        <hr />

        {/* 注意：默认情况下，路由中的规则，是模糊匹配的，如果 路由可以部分匹配成功，就会展示这个路由对应的组件 */}
        {/* 如果要匹配参数，可以在 匹配规则中，使用 : 修饰符，表示这个位置匹配到的是参数 */}
        <Route path="/movie/:type/:id" component={Movie} exact></Route>

        <hr />

        <Route path="/about" component={About}></Route>
      </div>
    </HashRouter>
  }
}