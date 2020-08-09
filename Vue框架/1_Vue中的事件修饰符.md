## Vue中的事件修饰符

```html
<!-- 阻止点击事件继续传播(阻止冒泡) -->
<a v-on:click.stop = 'doThis'></a>
<!-- 提交事件不再重载 -->
<form v-on:submit.prevent = 'onSubmit'></form>
<!-- 修饰符可以串联 -->
<a v-on:click.prevent = 'doThat'></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent = 'doThis'></form>


<!-- 添加事件监听器时使用事件捕获模式 -->
<!--即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture='doThis'>...</div>
<!-- 只当在event.target 是当前元素自身时触发处理函数(事件代理) -->
<!-- 即事件不是从内部元素触发 -->
<div v-on:click.self='doThat'>...</div>
```


## Vue中的案件修饰符

```html
<!-- 即使Alt或者shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有Ctrl被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候触发 -->

<button @click.exact = "onClick">A</button>
```