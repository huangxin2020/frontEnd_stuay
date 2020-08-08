// 单对象模式 - 命名空间  减少污染全局变量
var myfunction = {
    /**
     * 判断一个数是不是偶数
     * @param {number} n 需要判断的数字 
     */
    iseven: function (n) {
        if (n % 2 === 0) {
            return true;
        }
        return false;
    },
    /**
    * 判断一个数是不是素数
    * @param {number} n 需要判断的数
    */
    isPrime: function (n) {
        if (n === 1) {
            return false;
        }
        for (var i = 2; i < n; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    },
    /**
     * 对一个数组求和
     * @param {"object"} arr 需要求和的数组 
     */
    sumOfArray: function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    },
    /**
     * 求一个数组中的最大的数字
     * @param {'object'} arr 需要求最大值的数字 
     */
    maxOfArray: function (arr) {
        var max = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (max < arr[i]) {
                max = arr[i];
            }
        }
        return max;
    },
    /**
     * 判断一个数组是不是稀松数字
     * @param {obje} arr 判断是否是稀松数组的数字 
     */
    hasEmptyInArray: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            // 判断i是都是arr的属性名
            if (!(i in arr)) {
                return true;
            }
        }
        return false;
    },
    /**
     * 给数组等基本类型去重
     * @param {*} arr 传入的数组或者字符串
     */
    unique: function (ary) {
        let obj = {};
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i];
            if (obj[item] !== undefined) {
                ary[i] = ary[arr.length - 1];
                ary.length--;
                i--;
                continue;
            }
            obj[item] = item;
        }
        return ary;
    },
    /**
     * 给出一个数组中出现频率最多的数字和出现的频率
     * @param {object} arr 要输出的数组 
     * @returns {object} 返回的值是一个对象
     */
    getTopFreqInArray: function (arr) {
        var obj = {}, // 记录频率
            num; // 记录出现频率最高的数字和频率
        for (var i = 0; i < arr.length; i++) {
            var n = arr[i];
            if (obj[n]) {
                obj[n]++;
            } else {
                obj[n] = 1;
            }
        }
        for (var porp in obj) {
            if (!num || num.freq < obj[porp]) {
                num = {
                    numner: +porp,
                    freq: obj[porp]
                }
            }
        }
        return num;
    },
    /**
     * 验证哥德巴赫猜想 - 任意一个大于2的偶数都可以写成 两个素数之和
     * 利用之前编写的两个函数
     * @param {number} n 输入的偶数 
     */
    Goldbach: function (n) {
        if (isNaN(n) || n <= 2 || this.iseven(n) === false) {
            return false;
        }
        for (var i = 2; i < n - 1; i++) {
            var j = n - i;
            if (this.isPrime(i) && this.isPrime(j)) {
                console.log(`${i} + ${j} = ${n}`);
                return;
            }
        }
    },
    /**
     * 给一个数字数字进行升序排序 - 冒泡排序法
     * @param {object} arr - 需要排序的数组 
     */
    numbersort: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    var mep = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = mep;
                }
            }
        }
    },
    /**
     * 得到一个最小值到最大值之间的随机整数
     * @param {*} min 最小值
     * @param {*} max 最大值 （取不到）
     */
    getRandom: function (min, max) {
        // 若要取到最大值
        // Math.floor 向下取整 使得负数取值也会正确

        return Math.floor(Math.random() * (max + 1 - min) + min);
    },
    /**
     * 输入一个字符串然后输出字符串中出现次数最多的字符与其出现的频率
     * @param {string} str 输入的字符串
     */
    getTopFrequency: function (str) {
        var num = {};
        for (var i = 0; i < str.length; i++) {
            var n = str[i];
            if (num[n]) {
                num[n]++
            } else {
                num[n] = 1;
            }
        }

        var obj;
        for (var porp in num) {
            if (!(obj) || obj.frequency < num[porp]) {
                obj = {
                    number: porp,
                    frequency: num[porp]
                }
            }
        }
        // console.log(`出现频率最高的字符是${obj.number},出现的次数是${obj.frequency}`);
        return obj;
    },
    /**
     * 给一个字符串变成大驼峰式命名法 hello world -> helloWorld
     * @param {string} str 要输入的字符串 
     */
    bigCamel: function (str) {
        var result = "";
        // 记录所有的空白字符
        var empties = '\t\n\r ';
        for (var i = 0; i < str.length; i++) {
            if (!empties.includes(str[i])) {
                // 判断是否是首字母，如果是首字母需要变成大写
                // 规律 除了第一个单词的首字母外，剩下的每个单词的首字母前一个都是空白字符
                if (empties.includes(str[i - 1]) || i === 0) {
                    result += str[i].toUpperCase();
                } else {
                    result += str[i];
                }
            }
        }
        return result;
    },
    // 小驼峰式命名法就把i===0 给去掉就行了

    // 书写一个能产生指定长度的随机字符串，字符串中只能包含大写字母、小写字母、数字
    /**
     * 产生指定长度的随机字符串，字符串中只能包含大写字母、小写字母、数字
     * @param {number} n 需要返回字符串的长度
     */
    getRandomString: function (n) {
        // 思路：建立一个由大写字母、小写字母、数字组成的模板字符串，然后在里面随机取出n个字符组成返回的字符串
        var template; // 两种创建方法
        // template = 'ABCDEFGHIJKLMNOPQRFTUVWXYZabcdefghijklmnopqrftuvwxyz0123456789';
        for (var i = 65; i < 65 + 26; i++) {
            template += String.fromCharCode(i);
        }
        for (var i = 97; i < 97 + 26; i++) {
            template += String.fromCharCode(i);
        }
        for (var i = 48; i < 48 + 10; i++) {
            template += String.fromCharCode(i);
        }

        var result = '';
        for (var i = 0; i < n; i++) {
            // 从模板字符串中获取一位字符
            var index = myfunction.getRandom(0, template.length - 1);
            result += template[index];
        }

        return result;
    },

    // 从一个标准的身份证号中取出用户的出生年月日与性别，保存到对象中 522629199707180023
    // 性别取倒数第二位的值看是奇数为男，偶数为女
    /**
     * 从一个标准的身份证号中取出用户的出生年月日与性别，保存到对象中,并返回
     * @param {string} pid 传入的身份证号
     */
    getInFormPID: function (pid) {
        var Pid = pid.toString();
        return {
            birthYear: +Pid.substr(6, 4),
            birthMonth: +Pid.substr(10, 2),
            brithDay: +Pid.substr(12, 2),
            gender: Pid[Pid.length - 2] % 2 === 0 ? '女' : '男'
        }
    },
    /**
     * 返回一个 年-月-日 小时:分钟:秒钟 格式的字符串
     * @param {*} date 传入的时间 
     */
    getGoodTime: function (date) {
        var year = date.getFullYear().toString().padStart(4, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');

        var hour = date.getHours().toString().padStart(2, "0");
        var minute = date.getMinutes().toString().padStart(2, "0");
        var second = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    /**
     * 根据用户的出生年月日,计算出用户的年龄
     * 年龄的判断还要考虑是不是已经过了生日
     * @param {number} year 年份
     * @param {number} month 月份
     * @param {number} day 日期
     */
    getAge: function (year, month, day) {
        // 得到当前的日期
        var now = new Date();
        var age = now.getFullYear() - year;
        // 处理闰年2月29号出生的人 判断其生日为2月28号
        if (month === 2 && day === 29) {
            day = 28;
        }
        // 得到今年的生日的日期与的现在的时间做对比
        var birthdayThisYear = new Date(now.getFullYear(), month - 1, day);
        birthdayThisYear > now ? age-- : age;

        return age;
    },
    /**
     * 根据传入的月份与天数计算,现在距离生日还有几天,如果已经超过了则计算明年的距离
     * @param {number} month 月份
     * @param {number} day 日期
     */
    getBrithbay: function (month, day) {
        var now = new Date();
        var birthdayThisYear = now.getFullYear();

        // 今年的生日
        var brithday = new Date(birthdayThisYear, month - 1, day);
        // 如果已经超过了则计算明年的距离
        if (brithday < now) {
            brithday.setFullYear(now.getFullYear() + 1);
        }

        var daydec = brithday - now;
        return Math.ceil(daydec / (24 * 60 * 60 * 1000));
    },
    /**
     * 打印当前月份的每一天是星期几 
    */
    printNowMonthDays: function () {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;

        // 得到这个月有几天
        var days = new Date(y, m, 0).getDate();
        for (var i = 1; i <= days; i++) {
            // console.log(`${y}年${m}月${i}日 : 星期${new Date(y, m - 1, i).getDay()}`);
            console.log(`${y}年${m}月${i}日 : 星期${this.dayHelp(y, m, i)}`);
        }
    },
    dayHelp: function (year, month, day) {
        var d = new Date(year, month - 1, day);
        // 得到星期几
        var day = d.getDay();
        switch (day) {
            case 0:
                return "日"
            case 1:
                return "一"
            case 2:
                return "二"
            case 3:
                return "三"
            case 4:
                return "四"
            case 5:
                return "五"
            case 6:
                return "六"
        }
    },

    // 获取dom节点的函数
    /**
     * 获取某个元素下面所有的a元素的内容数组
     * @param {node} dom 传入所要获取的元素 
     */
    getLinkContents: function (dom) {
        // 方法1
        // 获取传入元素下所有a元素的数组
        /* var arr = dom.getElementsByTagName("a");
        var newArr = [];

        for(let i = 0 ; i < arr.length ; i++){
            var a = arr[i];
            newArr.push(a.firstChild.nodeValue);
        }
        return newArr; */

        // 方法2
        return Array.from(dom.getElementsByTagName("a")).map(function (a) {
            return a.firstChild.nodeValue;
        })
    },
}
