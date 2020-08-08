import React from 'react'
import ReactTypes from 'prop-types'

/* // 最外层的父组件
export default class Com1 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'red'
    }
  }

  render() {
    return <div>
      <h1>这是 父组件 </h1>
      <Com2 color={this.state.color}></Com2>
    </div>
  }
}



// 中间的子组件
class Com2 extends React.Component {
  render() {
    return <div>
      <h3>这是 子组件 </h3>
      <Com3 color={this.props.color}></Com3>
    </div>
  }
}


// 内部的孙子组件
class Com3 extends React.Component {
  render() {
    return <div>
      <h5 style={{ color: this.props.color }}>这是 孙子组件 </h5>
    </div>
  }
} */






// 最外层的父组件
export default class Com1 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'red'
    }
  }

  //   getChildContextTypes
  // 1. 在 父组件中，定义一个 function，这个function 有个固定的名称，叫做 getChildContext ，内部，必须 返回一个 对象，这个对象，就是要共享给 所有子孙自建的  数据
  getChildContext() {
    return {
      color: this.state.color
    }
  }

  // 2. 使用 属性校验，规定一下传递给子组件的 数据类型， 需要定义 一个 静态的（static） childContextTypes（固定名称，不要改）
  static childContextTypes = {
    color: ReactTypes.string // 规定了 传递给子组件的 数据类型
  }


  render() {
    return <div>
      <h1>这是 父组件 </h1>
      <Com2></Com2>
    </div>
  }
}



// 中间的子组件
class Com2 extends React.Component {
  render() {
    return <div>
      <h3>这是 子组件 </h3>
      <Com3></Com3>
    </div>
  }
}



// 内部的孙子组件
class Com3 extends React.Component {

  // 3. 上来之后，先来个属性校验，去校验一下父组件传递过来的 参数类型
  static contextTypes = {
    color: ReactTypes.string // 这里，如果子组件，想要使用 父组件通过 context 共享的数据，那么在使用之前，一定要先 做一下数据类型校验
  }

  render() {
    return <div>
      <h5 style={{ color: this.context.color }}>这是 孙子组件  ---  {this.context.color} </h5>

    </div>
  }
}