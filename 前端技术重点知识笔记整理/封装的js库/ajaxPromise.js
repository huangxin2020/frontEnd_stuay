;(function anonymous(window) {
    // 设置默认的参数配置项
    let _default = {
        method: 'GET',
        url: '',
        baseURL: '',
        headers: {},
        dataType: 'JSON',
        data: null,// POST系列请求基于请求主体传递给服务器的内容
        params: null,// GET系列请求基于问号传参传递给服务器的内容
        cache: true // get配置下的清缓存
    };

    // 基于promise设计模式管理ajax请求
    let ajaxPromise = function ajaxPromise(options) {
        // OPTIONS中融合了:默认配置信息、用户基于DEFAULTS修改的信息、用户执行GET/POST方法时候传递的配置信息，
        // 越靠后的优先级越高
        let {
            url, baseURL, method, data, dataType, headers, cache, params
        } = options;

        // 把传入的参数进行进一步处理
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)){
            // GET系列 ?后面传参
            // formaDate 封装这个方法用于把对象转换成URLENCODED格式
            if (params) {
                url += `${ajaxPromise.check(url)}${ajaxPromise.formatData(params)}`;
            }
            if (cache === false) {
                url += `${ajaxPromise.check(url)}_=${+(new Date())}`;
            }
            data = null;//=>GET系列请求主体就是什么都不放
        } else {
            // POST系列 请求主体传参
            if (data) {
                data = ajaxPromise.formatData(data);
            }
        }
        
        // 基于promise发送ajax
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open(method, `${baseURL}${url}`);
            // 如果headers存在，我们需要设置请求头 （不能存在中文）
            if (headers !== null && typeof headers === 'object') {
                for (let attr in headers) {
                    if (headers.hasOwnProperty(attr)) {
                        let val = headers[attr];
                        if (/[\u4e00-\u9fa5]/.test(val)) {
                            //=>VAL中包含中文:我们把它进行编码成非中文
                            //encodeURIComponent/decodeURIComponent 编码/解码 中文字符
                            val = encodeURIComponent(val);
                        }
                        xhr.setRequestHeader(attr, val);
                    }
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    // 自己规定 当Http状态码以2/3开头的时候表示成功
                    if (/^(2|3)\d{2}$/.test(xhr.status)) {
                        // 把返回的对应数据进行些处理
                        let result = xhr.responseText;
                        dataType = dataType.toUpperCase();
                        dataType === 'JSON' ? result = JSON.parse(result) :
                            (dataType === 'XML' ? result = xhr.responseXML : null);

                        // 当满足这些条件的时候，执行resolve 并把结果返回
                        resolve(result);
                        return;
                    }
                    // 如果不满足 - 表示请求失败 执行reject 返回错误原因与实例
                    // reject/resolve只能传一个参数
                    reject(xhr.statusText);
                }
            };
            xhr.send(data);
        });
    };

    // 我们要是_default的值是用户可以修改的 所以我们需要把它暴露出去 便于让用户修改
    // 把默认配置暴露出去,后期用户在使用的时候可以自己设置一些基础的默认值(发送AJAX请求的时候按照用户配置的信息进行处理)
    ajaxPromise.defaults = _default;
    // 这时用户只要通过使用ajaxPromise.defaults 既可以修改了default的属性了
    /*原理 ：因为_default是一个对象 让ajaxPromise.defaults等于_default 就是把地址赋给了ajaxPromise.default
    所以修改了ajaxPromise.default就相当于是修改了_default */

    // 把对象转换为URLENCODED格式的字符串 
    ajaxPromise.formatData = function formatData(obj) {
        let str = ``;
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                str += `${attr}=${obj[attr]}&`;
            }
        }
        return str.substring(0, str.length - 1);
    };
    // 判断url字符串里是否含有？有返回& 没有返回？
    ajaxPromise.check = function check(url) {
        return url.indexOf('?') > -1 ? '&' : '?';
    };

    // GET 给ajaxPromise这个实例增加这些方法
    ['get', 'delete', 'head', 'options'].forEach(item => {
        ajaxPromise[item] = function anonymous(url, options = {}) {
            // options是用户参数的配置 需要进行处理再使用
            options = {
                ..._default,//默认值或者基于defaults修改的值
                ...options,//用户调取方法传递的配置项
                url: url,//请求的URL地址(第一个参数:默认配置项和传递的配置项中都不会出现URL，只能这样获取)
                method: item.toUpperCase()
                //以后执行肯定是ajaxPromise.head执行，不会设置METHODS这个配置项，我们自己需要配置才可以
            };
            return ajaxPromise(options);
        };
    });

    // POST
    ['post', 'put', 'patch'].forEach(item => {
        ajaxPromise[item] = function anonymous(url, data = {}, options = {}) {
            options = {
                ..._default,
                ...options,
                url: url,
                method: item.toUpperCase(),
                data: data
            };
            return ajaxPromise(options);
        };
    });

    window.ajaxPromise = ajaxPromise;
})(window);