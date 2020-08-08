import React from 'react'
// 在 function 定义的组件中，如果想要使用 props，必须先定义，否则无法直接使用
// 但是，在class定义的组件中，可以直接使用 this.props 来直接访问，不需要预先接收 props
export default function Hello(props) {
  // console.log(props)
  return <p>haha --- {props.name}</p>
}