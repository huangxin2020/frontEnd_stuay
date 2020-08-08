import React from 'react'
import CMTItem from './CmtItem.jsx'
import CMTBox from './CmtBox.jsx'

// 评论列表组件
export default class CMTList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        { user: 'zs', content: '123' },
        { user: 'ls', content: 'qqq' },
        { user: 'xiaohong', content: 'www' }
      ]
    }
  }

  // 在组件尚未渲染的时候，就立即 获取数据
  componentWillMount() {
    this.loadCmts()
  }

  render() {
    return <div>
      <h1>这是评论列表组件</h1>

      {/* 发表评论的组件 */}
      {/* 相对于 Vue 中，把 父组件传递给子组件的 普通属性 和 方法属性，区别对待， 普通属性用 props 接收， 方法 使用 this.$emit('方法名') */}
      {/* react 中，只要是传递给 子组件的数据，不管是 普通的类型，还是方法，都可以使用 this.props 来调用 */}
      <CMTBox reload={this.loadCmts}></CMTBox>

      <hr />


      {/* 循环渲染一些评论内容组件 */}
      {this.state.list.map((item, i) => {
        return <CMTItem key={i} {...item}></CMTItem>
      })}
    </div>
  }

  // 从本地存储中加载 评论列表
  loadCmts = () => {
    var list = JSON.parse(localStorage.getItem('cmts') || '[]')
    this.setState({
      list
    })
  }
}