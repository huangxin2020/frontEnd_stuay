//  class 实现面向对象的新形式

function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log('娃哈哈，你行吗？')
}
Person.info = 123

var p1 = new Person('zs', 20)
// console.log(p1.say())
// console.log(Person.info)





//  class 后面跟上类名， 类名后面，不需要加 () ，直接上 {}
class Per {
  // 在每个class类内部，都有一个 constructor 构造器， 如果没有显示定义 构造器，那么类内部默认都有个看不见的 constructor
  // constructor 的作用，就好比 咱们之前的 function Person(){ }
  // 每当，使用 new 关键字，创建 class 类实例的时候，必然会优先调用 constructor 构造器
  // constructor(){}
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 这是实例方法，必须通过 new 出来的对象调用
  say() {
    console.log('ok a ')
  }

  static info = 123

  static sayHello() {
    console.log('这是静态方法')
  }
}

var p2 = new Per('王多多', 22)
console.log(p2)
console.log(Per.info)
console.log(Per.sayHello())