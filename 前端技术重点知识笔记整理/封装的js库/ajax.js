// 当我们不想在项目中增加太多的插件的时候，我们想有ajax就可以使用自己封装的这个ajax库
(function anonymous(window) {
    function AJAX(options) {
        return new init(options);
    }

    let init = function init(options = {}) {
        //=>INIT PARAM
        let {
            url,
            method = 'GET',
            data = null,
            dataType = 'JSON',
            async = true,
            cache = true,
            success,
            error
        } = options;

        //=>MOUNT:把配置项挂载到实例上(说是加载也行)
        ['url', 'method', 'data', 'dataType', 'async', 'cache', 'success', 'error'].forEach(item => {
            // 把当前的得到的字符串变成json格式 并获取对应的值
            // 这里使用的是箭头函数 - this指向执行上下文，也就是init实例
            this[item] = eval(item);
        });

        //=>SEND:发送AJAX请求
        this.sendAjax();
    };

    AJAX.prototype = {
        constructor: AJAX,
        init,
        //=>发送AJAX请求
        sendAjax() {
            this.handleData();
            this.handleCache();

            //=>SEND
            let {method, url, async, error, success, data} = this,
                xhr = new XMLHttpRequest;
            xhr.open(method, url, async);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    //=>ERROR
                    if (!/^(2|3)\d{2}$/.test(xhr.status)) {
                        error && error(xhr.statusText, xhr);
                        // 第一个参数是状态码的描述 后一个是返回的全部信息
                        return;
                    }
                    //=>SUCCESS 处理Date-Type
                    let result = this.handlDataType(xhr);
                    success && success(result, xhr);
                }
            };
            xhr.send(data);
        },
        //=>处理DATA-TYPE
        handlDataType(xhr) {
            // Data-Type区分大小写 -> 全转换为大写
            let dataType = this.dataType.toUpperCase(),
                result = xhr.responseText;
            // 只处理常用的三种格式就行了
            switch (dataType) {
                case 'TEXT':
                    break;
                case 'JSON':
                    result = JSON.parse(result);
                    break;
                case 'XML':
                    result = xhr.responseXML;
                    break;
            }
            return result;
        },
        //=>处理CACHE - 缓存
        handleCache() {
            let {url, method, cache} = this;
            if (/^GET$/i.test(method) && cache === false) {
                //=>URL末尾追加时间辍
                url += `${this.check()}_=${+(new Date())}`;
                this.url = url;
            }
        },
        //=>处理DATA
        handleData() {
            let {data, method} = this;
            if (!data) return;
            //=>如果是个OBJECT对象,我们把它转换为x-www-form-urlencoded这种模式,方便后期传递给服务器
            // 把{XXX:XXX,XXX:XXX}  转换成XXX=XXX&XXX=XXX
            if (typeof data === 'object') {
                let str = ``;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        str += `${key}=${data[key]}&`;
                    }
                }
                data = str.substring(0, str.length - 1);
            }

            //=>根据请求方式不一样,传递给服务器的方式也不同
            if (/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)) {
                this.url += `${this.check()}${data}`;
                this.data = null;
                return;
            }
            this.data = data;//=>POST系列
        },
        //=>检测URL中是否存在问号  URL中只能有一个问号所有需要先判断是否存在问号
        check() {
            return this.url.indexOf('?') > -1 ? '&' : '?';
        }
    };

    init.prototype = AJAX.prototype;
    window.ajax = AJAX;
})(window);