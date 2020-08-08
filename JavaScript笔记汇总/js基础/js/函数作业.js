// 函数作业

// 文档注释在js文件里 /写两个*号 自动补齐
/**
 * 判断一个数是不是偶数
 * @param {number} n 需要判断的数字 
 */
function iseven(n){
    if(n % 2 === 0){
        return true;
    }
    return false;
}
/**
 * 判断一个数是不是素数
 * @param {number} n 需要判断的数
 */
function isPrime(n) {
    if (n === 1) {
        return false;
    }
    for (var i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
/**
 * 对一个数组求和
 * @param {"object"} arr 需要求和的数组 
 */
function sumOfArray(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
/**
 * 求一个数组中的最大的数字
 * @param {'object'} arr 需要求最大值的数字 
 */
function maxOfArray(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}
/**
 * 判断一个数组是不是稀松数字
 * @param {obje} arr 判断是否是稀松数组的数字 
 */
function hasEmptyInArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        // 判断i是都是arr的属性名
        if (!(i in arr)) {
            return true;
        }
    }
    return false;
}
/**
 * 给出一个数组中出现频率最多的数字和出现的频率
 * @param {object} arr 要输出的数组 
 * @returns {object} 返回的值是一个对象
 */
function getTopFreqInArray(arr){
    var obj = {}, // 记录频率
        num     ; // 记录出现频率最高的数字和频率
    for(var i = 0 ; i < arr.length ; i++){
        var n = arr[i];
        if(obj[n]){
            obj[n]++;
        }else{
            obj[n] = 1;
        }
    }
    for(var porp in obj){
        if(!num || num.freq < obj[porp]){
            num = {
                numner : +porp,
                freq : obj[porp]
            }
        }
    }
    return num;
}
/**
 * 验证哥德巴赫猜想 - 任意一个大于2的偶数都可以写成 两个素数之和
 * 利用之前编写的两个函数
 * @param {number} n 输入的偶数 
 */
function Goldbach (n){
    if(isNaN(n) || n <= 2 || iseven(n) === false){
        return false;
    }
    for(var i = 2 ; i < n - 1 ; i++){
        var j = n - i;
        if(isPrime(i) && isPrime(j)){
            console.log(`${i} + ${j} = ${n}`);
            return;
        }
    }
}