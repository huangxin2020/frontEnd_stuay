import React from 'react'

// 导入当前组件需要的子组件
import CommentItem from './CommentItem.jsx'

// 评论列表组件
export default class CommentList extends React.Component {
  constructor(props) {
    super(props)

    // 定义当前评论列表组件的 私有数据
    this.state = {
      cmts: [
        { user: '张三', content: '哈哈，沙发' },
        { user: '张三2', content: '哈哈，板凳' },
        { user: '张三3', content: '哈哈，凉席' },
        { user: '张三4', content: '哈哈，砖头' },
        { user: '张三5', content: '哈哈，楼下山炮' }
      ]
    }
  }

  // 在 有状态组件中， render 函数是必须的，表示，渲染哪些 虚拟DOM元素并展示出来
  render() {
    //#region 循环 评论列表的方式1，比较low，要把 JSX 和 JS 语法结合起来使用
    /* var arr = []
    this.state.cmts.forEach(item => {
      arr.push(<h1>{item.user}</h1>)
    }) */
    //#endregion

    return <div>
      <h1 className="title">评论列表案例</h1>
      {/* 我们可以直接在 JSX 语法内部，使用 数组的 map 函数，来遍历数组的每一项，并使用 map 返回操作后的最新的数组 */}
      {this.state.cmts.map((item, i) => {
        // return <CommentItem user={item.user} content={item.content} key={i}></CommentItem>
        return <CommentItem {...item} key={i}></CommentItem>
      })}
    </div>
  }
}