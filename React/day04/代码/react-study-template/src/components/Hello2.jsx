import React from 'react'

// 使用 class 创建的类，通过 extends 关键字，继承了 React.Component 之后，这个类，就是一个组件的模板了
// 如果想要引用这个组件，可以把 类的名称， 以标签形式，导入到 JSX 中使用
export default class Hello2 extends React.Component {
  constructor(props) {
    // 注意： 如果使用 extends 实现了继承，那么在 constructor 的第一行，一定要显示调用一下 super()
    //  super() 表示父类的构造函数
    super(props)
    // 在 constructor 中，如果想要访问 props 属性，不能直接使用 this.props， 而是需要在 constructor 的构造器参数列表中，显示的定义 props 参数来接收，才能正常使用；
    // console.log(props)

    // 注意： 这是固定写法，this.state 表示 当前组件实例的私有数据对象，就好比 vue 中，组件实例身上的 data(){ return {} } 函数
    // 如果想要使用 组件中 state 上的数据，直接通过 this.state.*** 来访问即可
    this.state = {
      msg: '这是 Hello2 组件的私有msg数据',
      info: '瓦塔西***'
    }
  }
  // 保存信息1： No `render` method found on the returned component instance: you may have forgotten to define `render`.
  // 通过分析以上报错，发现，提示我们说，在 class 实现的组件内部，必须定义一个 render 函数
  render() {
    // 报错信息2： Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.
    // 通过分析以上报错，发现，在 render 函数中，还必须 return 一个东西，如果没有什么需要被return 的，则需要 return null

    // 虽然在 React dev tools 中，并没有显示说 class 组件中的 props 是只读的，但是，经过测试得知，其实 只要是 组件的 props，都是只读的；
    // this.props.address = '123'

    // console.log(this.props)


    return <div>
      <h1>这是 使用 class 类创建的组件</h1>
      <h3>外界传递过来的数据是： {this.props.address} --- {this.props.info}</h3>
      <h5>{this.state.msg}</h5>

      {/* 1.1 在React中，如果想要为元素绑定事件，不能使用 网页中 传统的 onclick 事件，而是需要 使用 React 提供的  onClick */}
      {/* 1.2 也就是说：React中，提供的事件绑定机制，使用的 都是驼峰命名，同时，基本上，传统的 JS 事件，都被 React 重新定义了一下，改成了 驼峰命名 onMouseMove  */}
      {/* 2.1 在 React 提供的事件绑定机制中，事件的处理函数，必须直接给定一个 function，而不是给定一个 function 的名称 */}
      {/* 2.2 在为 React 事件绑定 处理函数的时候，需要通过 this.函数名， 来把 函数的引用交给 事件 */}
      <input type="button" value="修改 msg" id="btnChangeMsg" onClick={this.changeMsg} />

      <br />

    </div>
  }

  changeMsg = () => {
    // console.log('ok')
    // 注意： 这里不是传统网页，所以 React 已经帮我们规定死了，在 方法中，默认this 指向 undefined，并不是指向方法的调用者
    // console.log(this)

    // 直接使用 this.state.msg = '123' 为 state 上的数据重新赋值，可以修改 state 中的数据值，但是，页面不会被更新；
    // 所以这种方式，React 不推荐，以后尽量少用；
    // this.state.msg = '123'

    // 如果要为 this.state 上的数据重新赋值，那么，React 推荐使用 this.setState({配置对象}) 来重新为 state 赋值
    // 注意： this.setState 方法，只会重新覆盖那些 显示定义的属性值，如果没有提供最全的属性，则没有提供的属性值，不会被覆盖；
    /* this.setState({
      msg: '123'
    }) */

    // this.setState 方法，也支持传递一个 function，如果传递的是 function，则在 function 内部，必须return 一个 对象；
    // 在 function 的参数中，支持传递两个参数，其中，第一个参数是 prevState，表示为修改之前的 老的 state 数据
    // 第二个参数，是 外界传递给当前组件的 props 数据
    this.setState(function (prevState, props) {
      // console.log(props)
      return {
        msg: '123'
      }
    }, function () {
      // 由于 this.setState 是异步执行的，所以，如果想要立即拿到最新的修改结果，最保险的方式， 在回调函数中去操作最新的数据
      console.log(this.state.msg)
    })
    // 经过测试发现， this.setState 在调用的时候，内部是异步执行的，所以，当立即调用完 this.setState 后，输出 state 值可能是旧的
    // console.log(this.state.msg)
  }
}