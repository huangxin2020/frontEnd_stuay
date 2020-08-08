class Person {
  constructor(name, age) {
    console.log(3)
    this.name = name
    this.age = age
  }

  say() {
    console.log('这是 Person中的 say 方法')
  }
  static info = 123
}


// 使用 extends 实现继承，extends 前面的是子类，后面的是父类
class Chinese extends Person {
  constructor(name, age, color, language) {
    console.log(1)
    // 注意： 当使用 extends 关键字实现了继承， 子类的 constructor 构造函数中，必须显示调用 super() 方法，这个 super 表示父类中 constructor 的引用
    super(name, age)
    this.color = color
    this.language = language
    console.log(2)
  }
}


// var p1 = new Person('zs', 12)
// console.log(p1)

var c1 = new Chinese('张三', 22, 'yellow', '汉语')
console.log(c1)
// 父类中任何东西，子类都能继承到
// c1.say();
// console.log(Chinese.info)


// 真正的面向对象语言是由 三部分组成： 封装、继承、多态
// 多态 和 接口、虚拟方法有关


class Animal {
  // 父类只定义了方法的名称，和作用，但是并没有具体的实现逻辑
  say() {
    // console.log('喵喵')
  }
}

class Cat extends Animal {
  // 当子类继承了父类之后，必然要继承父类中的方法，但是，发现say方法空有其壳，如果子类想要调用 say， 必须自己先实现这个方法，才能调用；
  say() {
    console.log('miaomiao')
  }
}

class Dog extends Animal {
  say() {
    console.log('wangwang')
  }
}