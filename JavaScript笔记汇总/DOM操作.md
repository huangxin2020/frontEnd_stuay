# web api概述

标准库：ECMAScript中的对象和函数

web Api：浏览器宿主环境中的对象和函数

1. 知识繁杂
2. 成体系的知识
3. 程序思维：知识 + 程序思维 = 应用
4. 兼容性：了解 不记忆

web api：

- BOM: Browser Object Model，浏览器对象模型

- Dom：Document Object Model，文档对象模型

BOM；控制浏览器本身

DOM：控制HTML文档(重点)

ES 由 ECMAScript 规定
webApi 由 W3C 制定

**DOM的核心理念**

DOM的核心理念就是将一个HTML文档或者XML文档,用对象模型表示 每个对象称之为DOM对象

DOM对象又被称为节点Node

节点的类型：

- DocumentType：文档类型节点
- Document：文档节点，表示整个节点
- Comment：注释节点
- Element：元素节点（重点）
- Text：文本节点
- Attribute：属性节点
- DocumentFragment：文档片断节点

DOM树：文档中不同的节点形成的树形结构。

# 获取DOM节点

获取DOM对象

## 通过方法获取

- document.getElementById: 通过id获取对应id的元素 (常用)
- document.getElementsByTagName: 通过元素的名称获取元素 返回类数组 (常用)
- document.getElementsByClassName: 通过类样式获取元素 返回的也是类数组 IE9以下无效
- document.getElementsByName: 通过元素的name属性值获取元素

- document.querySelector: 通过CSS选择器获取第一个符合条件元素，IE8以下无效 (常用)
- document.querySelectorAll：通过CSS选择器获取所有符合条件元素，IE8以下无效 (常用)
- document.documentElement：获取根元素 - html元素

细节：
1. 在所有的得到类数组的方法中，除了querySelectorAll，其他的方法都是实时更新的
2. getElementById得到元素执行效率最高
3. 书写了id的元素，会自动成为window的属性。它是一个实时的单对象。事实上的标准，不推荐使用
4. getElementsByTagName、getElementsByClassName、querySelector、querySelectorAll，都可以作为其他元素节点对象的方法使用

### 根据节点关系获取节点

- **parentNode**: 获取父节点、父元素
- previousSibling：获取上一个兄弟节点
- nextSibling：获取下一个兄弟节点
- childNodes: 获取所有的子节点 返回类数组
- firstChild: 获取第一个子节点
- lastChild: 获取最后一个子节点
- attributes: 获取某个元素的属性节点

都不太常用

**常用的方法**
获取元素的方法

- parentElement: 获取父元素
- previousElementSibling：获取上一个兄弟元素节点
- nextElementSibling：获取下一个兄弟元素节点
- children: 获取子元素 返回类数组
- firstElementChild: 获取第一个子元素
- lastElementChild: 获取最后一个子元素

## 获取节点信息

- nodeName: 获取节点名称
- nodeValue：获取节点的值

# dom元素操作

## 初识元素事件

元素事件：某个元素发生一件事(被点击 click)

事件处理程序：是一个函数，发生了一件事，应该做什么事情

注册事件：将事件处理程序与某个事件关联 - onclick

**this关键字在事件处理程序中指代当前发生的事件源**

## 获取和设置元素属性

- 通用方式：getAttribute(不推介 必须在html中才能获取 得到原始值)、setAttribute

### 可识别属性

正常的HTML属性

- dom对象.属性名 （最常见）

细节：
1. 正常的属性即使没有复制,也有默认值
2. 布尔属性在dom对象中,得到的是boolean
3. 某些表单元素可以获取到不存在的属性
4. 某些属性与标识符冲突,此时,需要更换属性名 如 iabel标签的for属性与循环for语句相同所有被改为htmlfor  class属性也被改classname

### 自定义属性

自定义的属性使用通用方法

HTML5 建议自定义属性使用 ```data-``` 作为前缀

如果遵从HTML5 自定义属性规范，可以使用``` dom对象.dataset.属性名 ``` 控制属性 (尽量使用这种方式)
> li.setAttribute("data-abc","123") - 在li标签中添加入了data-abc属性，属性值为123

删除自定义属性

- removeAttribute("属性名");

- delete dom.dataset 属性名 (更建议使用这种)

## 获取和设置元素内容

- innerHTML: 获取和设置元素内部HTML文本与元素
- innerText：获取和设置元素内部纯文本 仅仅得到的是元素内部显示部分文本
- textContent：获取和设置元素内部都纯文本 得到的时内部源代码的文本 包括空格、换行等

## 元素结构重构

- 父元素.appendChild(元素)：在某个元素末尾加入一个子元素

- 父元素.insertBefore(待插入的元素/节点, 哪个元素之前)：在第二个参数元素之前加入一个第一个参数元素

- 父元素.replaceChild(替换的元素, 被替换的元素) 

细节：

更改元素结构效率低，尽量少用

## 创建和删除元素

- document.createElement("元素名")：创建一个元素对象
- document.createTextNode('文本')
- document.creatDocumentFragment()：创建文档片段 创建多个时使用

### 克隆元素

- dom对象.cloneNode(是否深度克隆)：复制一个新的dom对象并返回

### 实时集合

- childNodes() : 也是实时更新的

### 删除元素

- removeChild：父元素调用删除子元素 传入子元素 页面不显示，但是对象在内存内存在

- remove：自己调用，删除自身

# dom元素样式

## 控制dom元素的类样式

- className：获取和设置元素类名 兼容性很好，各种浏览器都可以用 但是不推荐使用
- classList：dom4新属性 是一个用于控制元素类名的对象 IE10以下都不行
  - add: 用于添加一个类名
  - remove：用于移除一个类名
  - contains：用于判断一个类名是否存在
  - toggle：用于添加/移除一个类名 (有就删除，没有就增加)

## 获取元素样式

**css的短横线命名，需要转换为小驼峰命名 - backgroundColor**

-dom.style: 只能得内联样式对象

- window.getComputedStyle(dom元素)：得到某个元素最终计算的样式
 - 还可以加第二个参数：得到某个元素的某个伪元素的样式

## 设置样式

- dom.style.样式名 = 值  设置的是行内样式

# DOM事件

## 术语

- 事件：发生一件事
- 事件类型：点击、鼠标按下、鼠标抬起、鼠标移入、鼠标移出、键盘按下、键盘抬起、、、

- 事件处理程序：一个函数，当某件事发生时运行
- 事件注册：将一个事件处理程序，挂载到某个事件上

## 事件流

事件流 - 当某个事件发生的时候，哪些元素会监听到该事件的发生，这些元素发生该事件的顺序

**当一个元素发生了某个事件时，那么该元素的所有祖先元素都发生了该事件**

对于事件流的规定：

事件冒泡：先触发最里层的元素，然后再依次触发外层的元素 - IE的规定
事件捕获：先触发外层的元素，然后再依次触发里面的元素 - 网景的规定

目前规定：标准规定，默认情况下，事件是冒泡的方式触发的 - 由内向外的触发

事件源、事件目标：事件目标阶段的元素 - 触发事件中最里层的元素 

# 事件注册

**最里层元素没有冒泡与捕获阶段 - 只有目标源阶段**
**事件的默认触发过程是先捕获后冒泡，事件的触发发生在冒泡阶段(可设置)**

事件绑定

## dom0

将事件名称前面加上on，作为dom的属性名，给该属性赋值为一个函数，即为事件注册

移出：重新给事件属性赋值，通常赋值为null/undefined  

## dom2

dom对象.addEventListener：注册事件

与dom0的区别

1. dom2可以为某个元素的同一事件，添加多个处理程序 按照注册先后顺序运行
2. dom2允许开发者控制事件处理的阶段 ，使用第三个参数boolean值，表示是否在捕获阶段触发 - 不加on
  - 如果元素是目标元素 (事件源) ， 第三个参数无效 多个处理程序按注册顺序来运行

事件的移除：dom对象.removeEventListener(事件名,处理函数) - 要求处理函数必须有函数名

**细节**

1. dom2在IE8及以下不兼容，需要使用attachEvent,detachEvent 添加、删除移除事件
2. 添加移除事件时，可以将第三个参数写作一个对象，进行相关配置 once: true 是否只运行一次

# 事件对象

事件对象封装了事件的相关信息

## 获取事件对象

- 通过事件处理函数的参数获取 - 现代

- 旧版本IE8以下 通过window.event获取

## 事件对象的通用成员

- target & srcElement - IE浏览器

表示事件目标/事件源 

事件委托：通过给祖先元素注册事件，在程序处理中判断事件源进行不同的处理

通常，事件委托用于动态生成元素的场景

- currentTarget

当前目标：获取绑定事件的元素，等效于this 使用方式：e.currentTarget

- type

得到事件的类型 - 字符串 e.type

- preventDefault & returnValue - IE8 以下 非标准-尽量不要使用

阻止浏览器默认行为 (很常使用) e.preventDefault(); / returnValue = false;

dom0的方式：在事件处理程序中返回false

针对a元素，可以设置为功能性链接解决跳转问题 在href属性中写"javascript:;" 变成一个功能性链接

- stopPropagation方法

一个函数 阻止继续往上冒泡 e.stopPropagation();

- eventPhase

得到事件所处的阶段 得到数字

1：事件捕获
2：事件目标
3：事件冒泡

# 鼠标事件

## 事件类型

- click：用户单击主鼠标主按钮(一般指左键) 或者在聚焦时按下回车键时触发 按下抬起
- dblclick：用户双击主鼠标按键触发 (频率取决于系统配置)
- mousedown：用户按下鼠标任意键时触发
- mouseup：用户抬起鼠标任意按键时触发
- mousemove：鼠标在元素上移动时触发
- mouseover：鼠标在进入元素时触发
- mouseout：鼠标进入元素时触发
- mouseenter：鼠标进入元素时触发，该事件不会冒泡
- mouseleave：鼠标离开元素时触发，该事件不会冒泡

区别：

- over和out，不考虑子元素，从父元素移动到子元素，对于父元素而言，仍然算作离开
- enter和leave，考虑子元素，子元素仍然是父元素的一部分 - 不会冒泡

## 事件对象

所有的鼠标事件中，事件处理程序中的事件对象，都为 MouseEvent

- altKey ：判断触发事件时，是否按下了键盘的alt键
- ctrKey：判断触发事件时，是否按下了键盘的ctrl键
- shiftKey：判断触发事件时，是否按下了键盘的shift键
- button：触发事件时，按下的鼠标按键类型
  - 0：左键
  - 1：中键
  - 2：右键

关于位置：

- page：pageX、pageY，当前鼠标距离页面的横纵坐标 - 相对于整个页面
- client：clientX、clientY，鼠标相对于视口的坐标
- offset：offsetX、offsetY，鼠标相对于事件源内边距-填充盒 - padding+content 的坐标
- screen：screenX、screenY, 鼠标相对于屏幕的距离
- x,y 等同于clientX、clientY
- movement：movementX、movementY，只有在鼠标移动事件中有效，相对于上一次鼠标位置的偏移的位置
  - 指这一次触发与上一次触发的距离

# 键盘事件

## 事件类型
- keydown：按下键盘上任意键触发，如果按住不放，会重复触发此事件
- keypress：按下键盘上的一个**字符键**时触发 - 有反馈的效果
- keyup：抬起键盘上任意键触发

keydown、keypress 如果阻止了事件默认行为，文本不会显示 按键盘无效 return false

## 事件对象

keyborderEvent
- code：得到的是一个键盘字符串，适配键盘布局
- key：得到键盘字符，不适配键盘布局 能得到打印字符
- keycode、which：得到一个键盘编码 (不建议使用了)

## 键盘也有事件冒泡
- 给键盘事件注册的时候尽量给大的元素注册事件，利用冒泡 document、windows

# 其他事件

## 表单事件

测试不会回冒泡  可以使用e.bubbles来检查 
- focus：元素被聚焦的时候触发的事件 (能与用户发生交互的元素，都可以聚焦) 该事件不会冒泡 div没有聚焦事件
- blur：元素失去焦点时触发 该事件不会冒泡
- submit：提交表单事件 只在from表单中存在
- change；文本改变事件 - 常用在表达元素之间 - 离开文本框后才会触发
- input：文本改变事件，即使触发 - 在文本框中输入也会触发 - 不能阻止

## 其他事件

- load、DOMContentLoaded、readystatechange

Window.load：页面中所有资源全部加装完毕的事件 执行时间非常后面

img.load: 图片被加载后执行的事件

document.DOMContentLoaded：dom树构建完成后执行 不能使用dom0来创建

readystate: 准备的状态

readystate: loading、interactive、complete

loading: 表示正在加载中

interactive: 触发DOMContentLoaded事件

complete: 出发window的load事件

readystatechange：当属性发生改变的时候会触发该事件

> 浏览器渲染页面的过程
> 1. 得到页面的源代码
> 2. 创建document节点
> 3. 从上到下，将元素依次添加到dom树中，每添加一个元素，进行预渲染
> 4. 按照结构，依次渲染子节点

js、link代码默认同步进行 音频、视频都是异步渲染

**js代码应该尽量写在页面底部：避免阻塞后续的渲染，也避免运行js时得不到页面中的元素**

**css代码应该尽量写在页面顶部：避免出现页面闪烁**

- unload、beforeunload

beforeunload：width的事件，关闭窗口时运行，可以阻止关闭窗口
unload: window的事件，关闭窗口时运行 - 不可以阻止关闭窗口
执行顺序 先beforeunload、unload

Chrome浏览器不支持阻止关闭窗口

- scroll

窗口发生滚动时触发 - 可以写到window也可以写到元素上

- resize

窗口尺寸发生改版的时候发生的事件，监听的是视口尺寸 - window事件

window.screen.width/height ：获取屏幕的宽度与高度
window.outerWidth/height：获取浏览器的尺寸
window.innerWidth/height ：窗口的尺寸-包含滚动条
window.documentElement.clientWidth/height：获取视口的尺寸-不包含滚动条

元素的尺寸

元素.clientWidth/Height：获取不包含变宽/滚动条的尺寸
元素.offsetWidth/Height: 获取包含边框/滚动条的尺寸
元素.srcollWidth/Height：获取元素实际的尺寸 超出显示页面的整个实际尺寸

- contextmenu

右键菜单事件

- paste

粘贴事件

- copy

复制事件

- cut

剪切事件

以上三个个都可以阻止默认事件 + e.preventDefault();

clipboardDate 剪切板数据

