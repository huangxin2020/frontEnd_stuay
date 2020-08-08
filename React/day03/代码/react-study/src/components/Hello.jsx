import React from 'react'

function Hello(props) {
  return <div>
    <h1>这是在Hello组件中定义的元素 --- {props.name}</h1>
    <p id="">哈哈哈哈</p>
  </div>
}

// 把创建的组件暴露出去
export default Hello