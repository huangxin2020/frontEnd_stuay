import React from 'react'

export default class BindThis extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      msg: '这是默认的msg'
    }

    // 绑定 this 并传参的方式2: 在构造函数中绑定并传参
    // 注意，当为一个函数，调用 bind 改变了this指向后，bind 函数调用的结果，有一个返回值，这个值，就是被改变this指向后的函数的引用；
    // 注意： bind 不会修改 原函数的 this 指向
    this.changeMsg2 = this.changeMsg2.bind(this, '🚗', '👫')
  }

  render() {
    return <div>
      <h1>绑定This并传参的几种方式</h1>

      {/* bind 的作用： 为前面的函数，修改函数内部的 this 指向，让 函数内部的this，指向 bind 参数列表中的 第一个参数 */}
      {/* bind 和 call/apply 之间的区别： */}
      {/*  call/apply 修改完this指向后，会立即调用前面的函数，但是 bind 只是修改this指向，并不会调用 */}
      {/* 注意： bind 中的第一个参数，是用来修改 this 指向的，第一个参数后面的所有参数，都会当作将来调用 前面函数 时候的参数传递进去 */}
      {/* 方式1：在 事件处理函数中，直接使用 bind 绑定 this 并传参 */}
      <input type="button" value="绑定this并传参的方式1" onClick={this.changeMsg1.bind(this, '🐷', '🍕')} />
      <input type="button" value="绑定this并传参的方式2" onClick={this.changeMsg2} />
      {/* <input type="button" value="绑定this并传参的方式3" onClick={() => { this.changeMsg3('😊', '😘') }} /> */}
      <input type="button" value="绑定this并传参的方式3" onClick={() => { this.changeMsg3('😊', '😘') }} />

      <hr />

      <h3>{this.state.msg}</h3>

      {/* 在 Vue 中，有 v-model 指令来实现双向数据绑定，但是，在 React 中， 根本没有指令的概念，因此React 默认也不支持 双向数据绑定 */}
      {/* React 只支持，把数据从 state 上传输到 页面，但是，无法自动实现数据从 页面 传输到 state 中 进行保存，也就是，React 不支持数据的自动逆向传输， 只是实现了数据的单向绑定 */}
      {/* 注意：如果为 表单元素，提供了 value 属性绑定，那么，必须同时为 表单元素 绑定 readOnly, 或者提供要给 onChange 事件 */}
      {/* 如果提供了readOnly，表示这个元素只读的不能被修改  */}
      {/* 如果提供了onChange 表示，这个元素的值可以被修改，但是，要自己定义修改的逻辑  */}
      <input type="text" style={{ width: '100%' }} value={this.state.msg} onChange={this.txtChanged} ref="txt" />
    </div>
  }

  // 为 文本框 绑定 txtChanged 事件
  txtChanged = (e) => {
    // console.log('ok');
    // 如果想让 文本框在触发 onChange 的时候，同时把文本框最新的值，保存到 state 中，那么，我们需要手动调用 this.setState

    // 获取文本框中 最新文本的3种方式：
    //  1. 使用 document.getElementById 来拿
    //  2. 使用 ref 来拿
    // console.log(this.refs.txt.value);
    //  3. 使用 事件对象的 参数 e 来拿   e.target 就表示触发 这个事件的 事件源对象，得到的是一个原生的JS DOM 对象
    // console.log(e.target.value);
    this.setState({
      msg: e.target.value
    })
  }

  changeMsg1(arg1, arg2) {
    // 注意：这里的方式，是一个普通方法，因此，在触发的时候，这里的 this 是 undefined
    // console.log(this);
    this.setState({
      msg: '绑定this并传参的方式1' + arg1 + arg2
    })
  }

  changeMsg2(arg1, arg2) {
    // console.log(this);
    // 注意：这里的方式，是一个普通方法，因此，在触发的时候，这里的 this 是 undefined
    this.setState({
      msg: '绑定this并传参的方式2' + arg1 + arg2
    })
  }

  changeMsg3 = (arg1, arg2) => {
    // console.log(this);
    // 注意：这里的方式，是一个普通方法，因此，在触发的时候，这里的 this 是 undefined
    this.setState({
      msg: '绑定this并传参的方式3' + arg1 + arg2
    })
  }

}