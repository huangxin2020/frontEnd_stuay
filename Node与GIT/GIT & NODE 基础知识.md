## GIT & NODE 基础知识
@(201802)

### NODE安装
https://nodejs.org/zh-cn/ 
推荐大家使用LTS稳定版本，把安装包下载下来后，直接一路下一步安装即可（最好把它安装到C盘 [默认盘符] ，记号安装目录）

1. 如果安装不了，我们可以把别人安装完成的内容拷贝过来，通过修改环境变量完成安装
> 高级系统设置 -> 环境变量 -> 系统变量 -> Path，把原有的变量值备份一份，在原有的基础上增加node的安装目录即可
![Alt text](img/1523328122667.png)

2.验证安装是否成功
WIN + R  => 打开运行窗口 => 输入cmd => 打开DOS窗口
在DOS窗口中，输入 node -v / node --version / npm -v 能出现版本号，则代表安装成功，不能出现版本号，提示node不是内部或者外部命令的，遵循第一步配置环境变量即可
![Alt text](img/1523328336867.png)

**我现在的电脑中安装的是10.16.0版本的node.js**
**npm -v 是6.9.0**


### NODE基础概念
1. node并不是一门语言，它是一个工具或者环境
- 基于V8引擎（webkit）渲染和解析JS的
- 单线程
- 无阻塞I/O操作
- 事件驱动
- ...

之所以把node称之为服务器端语言，是因为node给予JS操作服务器的能力：我们在服务器端安装node，只用js完成服务器端需要处理的一些事情，最后把写好的js代码交给node环境运行即可

----

2. 在node环境中把JS代码执行
- REPL命令（Read-Evaluate-Print-Loop：输入-求值-输出-循环）
- 基于 node xxx.js 命令执行
- 基于WB这类编辑工具直接执行

基于node命令执行，我们需要先找到当前文件所在的文件夹，然后再这个目录下打开DOS窗口，在窗口中执行 node xxx.js，这样就相当于在node环境下把JS文件中的代码执行了
> 如何在当前文件目录中打开DOS窗口
> - 基于DOS命令中的“cd”一层层进入
> - 在当前目录地址栏中输入cmd，快速在当前目录打开
> - shift+鼠标右键，在此处打开命令窗口

在WB中配置node环境
![Alt text](img/1523330784877.png)
![Alt text](img/1523330835959.png)


### 扫盲：常用的DOS命令
`ping www.baidu.com -t`：测试网速 一直监听网速
`Ctrl+c`：结束当前正在运行的操作
`exit`：退出当前窗口
`ipconfig -all`：查看当前电脑的 物理地址/IP地址/子网掩码/DNS等信息
`cls`：清屏
`cd`：进入到指定的文件目录（windows电脑需要先进入到对应的磁盘 `E:`）
`cd ../`：返回上级目录
`cd ./`：当前目录
`cd /`：根目录
`dir`：查看当前目录下所有的文件
`mkdir`：创建文件夹
`copy con xxx.xx`：创建文件并且给文件中输入内容，输入完成后，用Ctrl+c结束并保存 可以创建任何类型的文件
`del xxx.xx`：删除文件
`rmdir xxx`：删除文件夹
...

### NPM模块管理 npm - node package manger : node模块管理工具
安装完成node后，基本上自带npm模块管理器

`node -v` 

`npm -v` 出现版本号就表示按照成成功了

我们需要一个第三方（别人写的）模块、插件、类库或者框架等，需要提前下载安装才可以使用
- 百度搜索，找到下载地址，然后基于浏览器下载即可（资源比较混乱，不好搜索）
- 也可以基于npm等第三方包管理器下载（yarn / bower ... 都是第三方模块管理器）

1.npm下载的资源都是在https://www.npmjs.com/ 中下载的
`npm install xxx`：把资源或者第三方模块下载到当前目录下
`npm install xxx -g (--global)`：把资源或者第三方模块安装到全局环境下（目的：以后可以基于命令来操作一些事情）
`npm i xxx@1.0.0` : 安装指定版本号的模块
`npm view xxx versions > xxx.version.json` : 查看某个模块的版本信息(输出到指定JSON文件中)

`npm init -y` : 初始化当前项目的配置依赖清单
`npm i xxx --save` : 把模块保存在清单生产依赖中
`npm i xxx --save-dev` : 把模块保存在清单开发依赖中
`npm install` : 跑环境，按照清单按照所需的模块

`npm root -g` 查看全局按照模块的目录
`npm uninstall xxx / npm uninstall xxx -g`：从本地或者全局卸载

> 基于npm安装的一些细节点：
> - 需要连网（基于npm是从国外服务器上下载资源，所以下载速度较慢）
> - 下载成功后，当前目录中多增加一个 node_modules文件夹，在这个文件夹中找到我们安装的模块
> - 一般来说，下载下来的内容包含源码和最后供开发者使用的压缩版本

2.解决下载慢的问题
**`基于nrm切换到国内下载源（一般是淘宝镜像）`**
首先安装nrm，而且是把它安装到全局环境下（因为我们需要使用命令）
> npm install nrm -g
>  
> 安装完成后，我们可以使用 nrm 命令
> - nrm ls 查看当前可用源
> - nrm use xxx 使用某个源
>  
> 切完源，还是基于npm安装操作

**`可以基于yarn来安装管理`**
首先还是需要先安装yarn，安装到全局，然后基于yarn安装我们需要的模块
> npm install yarn -g
>  
> 基于yarn安装（只能安装在本地，不能安装到全局）
> yarn add xxx
> yarn remove xxx

**`基于cnpm淘宝镜像来处理`**
自己回去尝试

----

3.解决安装版本的问题
> 首先查看当前模块的历史版本信息
> `npm view jquery > jquery.version.json` ：把当前模块的历史信息输出到具体的某个文件中（文件名自己随便起的）
>  
> 安装指定的版本模块
> `yarn add jquery@1.11.3`：npm和yarn都是这样来指定安装具体版本模块的

----

课后扩展：
1. bower是从gitHub下载安装，有兴趣同学回去研究一下它的使用
2. 回去后向全局环境中安装：less /  babel-cli ...

-------------

### gitHub
> https://github.com/
> 
> 一个提供代码管理（托管）的公共平台，我们以及众多开发者，会把自己的生产的 组件/类库/插件/框架 等托管到这个平台中，供别人下载使用和研究
>  
> 在gitHub中，我们可以创建仓库来管理自己的项目文件，而gitHub支持开发者通过git操作，把本地的项目代码推送到指定的仓库中，它还提供静态web页面的发布等
>  
> 在国内有一个和gitHub类似的网站：coding，和gitHub类似，也是提供代码管理的平台


### git的基础知识
> git是一个分布式代码版本管理控制系统
> - 记录当前产品代码的所有版本信息（历史修改信息）,而且方便快速回退到某一个具体的版本
> - 方便团队协作开发，能够检测代码冲突，能够合并代码等

`svn`：在git诞生前就已经存在的版本控制系统，不过它是“集中式”管理 

`git`：是分布式版本管理体统

1.集中式版本控制系统

2.分布式版本控制系统

![Alt text](img/11.png)


#### git的分区与工作流程

- 工作区：我们能看到的，并且用来写代码的区域

- 暂存区：临时存储用的

- 历史区：生成历史版本

流程 —— 工作区 --> 暂存区 --> 历史区 --> 中央服务器(github的仓库上)
-----

### git的工作管理和基础操作
**`在本地创建git仓库管理我们的代码`**
> 初次使用git，先在本地配置一些基础信息 在DOS界面中操作
> \$ git config --global -l
> \$ git config --global user.name  xxx
> \$ git config --global user.email  xxx
> 建议大家配置的用户名和邮箱和gitHub保持一致（这样以后在本地向gitHub推送内容的时候，能够展示出是谁推荐的）

1. `git init`
> 会在当前目录中创建一个空的仓库，文件目录中生成一个 “.git” 的隐藏文件，这个文件很重要，我们本地仓库的版本信息等都存储在这里

2. `.gitignore`
> 在当前目录（git仓库根目录）创建一个 “.gitignore” 文件，这个文件中存储了当git提交的时候所忽略的文件
>  
> 可以基于WB创建（new -> file -> .gitignore）
> 可以基于linux命令 `$ touch .gitignore` （mac终端、git bash、或者集成了linux的dos，可以使用linux命令）

3. 在本地编写完成代码后(在工作区)，把一些文件提交到暂存区 原来的文件还在工作区中
> \$ git add xxx 把某一个文件或者文件夹提交到暂存区
> \$ git add ./ -A  把当前仓库中的所有的最新修改的文件都提交到暂存区 ‘/’ -> 或
> \$ git status  查看当前文件的状态 如果都为红色则表示都在工作区而不是在暂存区 绿色则表示在暂存区 看不见东西则表示都已经提交到了历史区

4. 把暂存区内容提交到历史区 都是拷贝-原区原文件上都还具有 这样才能对比出那些文件在某个区
> \$ git commit -m'本次提交内容的描述' : 不叫空格写描述信息
> \$ git log 查看历史信息
> \$ git reflog 查勘所有的历史记录(包括历史回滚后)

在**.gitignore文件中**写的代码

```
# dependencies
node_modules

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# npm or yarn
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# webStorm
.idea
```

# gitHub的使用

1. 使用邮箱注册gitHub账户
  - Settings 用户设置
     - Profile 修改自己的基本信息
     - Account 可以修改用户名
     - Security 可以修改自己的密码
     - Emails 邮箱(必须进行邮箱验证) 

2. 创建仓库
 new repository -> 填写信息 -> Creat repository
 - public 公共的仓库作为开源项目
 - private 私有仓库作为内部团队协作管理的项目 (现在已经免费可以使用)

settings -> 删除仓库Delete this repository
         -> Collaborators 设置协作开发得人员

Code 可以查看历史版本信息与分支信息

3. 把本地仓库信息提交到远程仓库
   1. 建立本地仓库与远程仓库的链接
     \$ git remote -v : 查看本地仓库和那些远程仓库链接 没有东西则表示没有链接
     \$ git remote add origin [git仓库地址] '[]'不用写
     \$ git remote rm origin 删除关联信息

在github中提交之前最好先拉取
$ git pull origin master
把本地代码提交到远程仓库 (第一次使用时需要输入github的用户名密码)
\$ git push origin master

\$ git clone [远程仓库git地址] [别名：可以不设置，默认为仓库名]

```shell
真实的项目开发流程:
   1. 组长或者负责人先创建中央仓库 (github仓库) 增加写作者
   2. 小组成员基于 \$git clone 把远程仓库及默认的内容克隆到本地一份(解决了三件事: 初始化一个本地仓库 ‘git init’、和对应的远程仓库保持了关联‘git remote add’、把远程仓库默认内容拉取到本地‘git pull’)
   3. 每个组员写完自己的程序后，基于‘git add/git commit’把自己修改的内容存放在历史区，然后通过‘git pull/ git push’把本地信息和远程仓库信息保持同步即可(可能涉及冲突的处理)
```