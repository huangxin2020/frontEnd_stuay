import React from 'react'
// 注意： 在使用 import 的时候，import 只能放到模块的 开头位置
import inlineStyles from './cmtItemStyles.js'

// 导入评论项的样式文件【这种直接 import '../路径标识符' 的 CSS 导入形式，并不是模块化的CSS】
// import '../../css/commentItem.css'
// 默认情况下，如果没有为 CSS 启用模块化，则接收到的 itemStyles 是个空对象，因为 .css 样式表中，不能直接通过 JS 的 export defualt 导出对象

// 当启用 CSS 模块化之后，导入 样式表得到的 itemStyles 就变成了一个 样式对象，其中，属性名是 在样式表中定义的类名，属性值，是自动生成的一个复杂的类名（防止类名冲突）
import itemStyles from '../../css/commentItem.css'
console.log(itemStyles)

// 封装一个 评论项 组件，此组件由于不需要自己的 私有数据，所以直接定义为 无状态组件
export default function CommentItem(props) {
  // 注意： 如果要使用 style 属性，为 JSX 语法创建的DOM元素，设置样式，不能像网页中那么写样式；而是要使用JS语法来写样式
  // 在 写 style 样式的时候，外层的 { } 表示 要写JS代码了，内层的 { } 表示 用一个JS对象表示样式
  // 注意： 在 style 的样式规则中，如果 属性值的单位是 px, 则 px 可以省略，直接写一个 数值 即可


  //#region 样式优化1
  /*  const boxStyle = { border: '1px solid #ccc', margin: '10px 0', paddingLeft: 15 }
   const titleStyle = { fontSize: 16, color: "purple" }
   const bodyStyle = { fontSize: 14, color: "red" } */
  //#endregion


  //#region 样式优化2 把 样式对象，封装到唯一的一个对象中
  /* const inlineStyles = {
    boxStyle: { border: '1px solid #ccc', margin: '10px 0', paddingLeft: 15 },
    titleStyle: { fontSize: 16, color: "purple" },
    bodyStyle: { fontSize: 14, color: "red" }
  } */
  //#endregion


  /* return <div style={inlineStyles.boxStyle}>
    <h1 style={inlineStyles.titleStyle}>评论人：{props.user}</h1>
    <h3 style={inlineStyles.bodyStyle}>评论内容：{props.content}</h3>
  </div> */


  // 注意： 当你怀念 vue 中 scoped 指令的时候，要时刻知道 ， react 中并没有指令的概念
  return <div className={itemStyles.box}>
    <h1 className={itemStyles.title}>评论人：{props.user}</h1>
    <h3 className={itemStyles.body}>评论内容：{props.content}</h3>
  </div>
}