// JS打包入口文件
// 1. 导入 React包
import React from 'react'
import ReactDOM from 'react-dom'

// 导入评论列表样式【注意：这种样式是全局的】
// import './css/commentList.css'

// 导入评论列表组件
import CommentList from './components/comment1/CommentList.jsx'

ReactDOM.render(<div>
  <CommentList></CommentList>
</div>, document.getElementById('app'))