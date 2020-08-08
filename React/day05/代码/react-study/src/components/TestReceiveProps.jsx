import React from 'react'

// 父组件
export default class Parent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      msg: '这是父组件中的 msg 消息'
    }
  }

  render() {
    return <div>
      <h1>这是父组件</h1>
      <input type="button" value="点击修改父组件的 MSG" onClick={this.changeMsg} />
      <hr />
      <Son pmsg={this.state.msg}></Son>
    </div>
  }

  changeMsg = () => {
    this.setState({
      msg: '娃哈哈'
    })
  }
}




// 子组件
class Son extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return <div>
      <h3>这是子组件 --- {this.props.pmsg}</h3>
    </div>
  }

  // 组件将要接收外界传递过来的新的 props 属性值
  // 当子组件第一次被渲染到页面上的时候，不会触发这个 函数；
  // 只有当 父组件中，通过 某些 事件，重新修改了 传递给 子组件的 props 数据之后，才会触发 componentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    // console.log('被触发了！');
    // 注意： 在 componentWillReceiveProps 被触发的时候，如果我们使用 this.props 来获取属性值，这个属性值，不是最新的，是上一次的旧属性值
    // 如果想要获取最新的属性值，需要通过 componentWillReceiveProps 的参数列表来获取
    console.log(this.props.pmsg + ' ---- ' + nextProps.pmsg);
  }
}