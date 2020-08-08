if (!window.myPlugin) {
    window.myPlugin = {};
}
// 减少污染全局变量的方法
window.myPlugin.openConfirm = (function () {
    // 设置变量便于后面使用
    var divModal, // 朦层
        divCenter, // 中间的容器
        options,
        spanTitle,
        spanClose,
        divContent,
        btnConfirm,
        btnCancel,
        isReEvent = false; // 防止重复设置事件 判断是否注册过事件
    /**
     * 打开一个是对话框 
     * @param {object} opts 传入的对象 
    */
    function openConfirm(opts) {
        if (!opts) {
            opts = {}; // 没有传入 默认为空对象
        }
        options = opts;
        initModel();
        initCenterDiv();
        regEvent();
    }

    /**
     * 注册事件 
    */
    function regEvent() {
        if (!isReEvent){
            spanClose.onclick = function(){
                divModal.style.display = 'none';
            }
            divModal.onclick = function(e){
                if(e.target === this){
                    divModal.style.display = 'none';
                }
            }
            btnCancel.onclick = function(){
                if(options.oncancel){
                    options.oncancel();
                }
                divModal.style.display = 'none';
            }

            btnConfirm.onclick = function(){
                if(options.onconfirm){
                    options.onconfirm();
                }
                divModal.style.display = 'none';
            }
        }
    }
    /**
     * 初始化朦层
    */
    function initModel() {
        if (!divModal) {
            divModal = document.createElement('div');
            divModal.style.position = 'fixed';
            divModal.style.background = 'rgba(0,0,0,0.1)';
            divModal.style.width = divModal.style.height = '100%';
            divModal.style.left = divModal.style.top = 0;
            document.body.appendChild(divModal);
        }
        divModal.style.display = 'block';
    }

    /**
     * 初始化中间的div 
    */
    function initCenterDiv() {
        if (!divCenter) {
            divCenter = document.createElement('div');
            divCenter.style.position = 'absolute';
            divCenter.style.width = '260px';
            divCenter.style.height = '160px';
            divCenter.style.background = '#fff';
            divCenter.style.left = divCenter.style.right = divCenter.style.top = divCenter.style.bottom = 0;
            divCenter.style.margin = 'auto';
            divCenter.style.fontSize = '15px';

            initDivCenterContent();
            divModal.appendChild(divCenter);
            btnConfirm = divCenter.querySelector("[data-plugin-id=confirm]");
            btnCancel = divCenter.querySelector('[data-plugin-id=cancel]');
            spanClose = divCenter.querySelector('[data-plugin-id=close]');
            spanTitle = divCenter.querySelector('[data-plugin-id=title]');
            divContent = divCenter.querySelector('[data-plugin-id=content]');
        }
        // console.log(btnConfirm,btnCancel,spanClose,spanTitle,divContent);
        // 设置配置的内容
        spanTitle.innerText = options.title || '提示';
        divContent.innerHTML = options.content || '';

        btnConfirm.className = options.onfirmClassName || '';
        btnConfirm.innerText = options.confirmText || '确定';
        btnCancel.className = options.cancelClassName || '';
        btnCancel.innerText = options.cancelText || '取消';
    }
    /**
     * 创建生成divCenter 内部的元素 
    */
    function initDivCenterContent() {
        // 创建标题
        var div = document.createElement('div');
        div.style.height = '40px';
        div.style.background = '#eee';
        div.style.boxSizing = 'border-box';
        div.style.padding = '10px 20px 0';
        div.innerHTML = `
            <span style="float:left" data-plugin-id="title"></span>
            <span data-plugin-id="close" style="cursor:pointer">
                <img style="width:18px;height:18px; float:right" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABlklEQVRoQ+2ZUW7CQAxEhxMWTkB7ssIJCjdERl0pIiT2eLxpI20kvkjG83a8m2RzwM6Pw879YwD8dYIjgZGAOAJsCx0BfAC4A7iJtV8vT2kzAJ8AvidVvwBciiDS2lGA1wLNdwWEpB0BWCpQASFrewDWlz+BNskk4ZlvZU9r880DsB4/BwDsFAYiat50rwDs/LeHBxBNgGknxrzpSgmYAFtwLYlKreegeQm0ka0oXKExa6MogJpEF/NMAkoSdu30BuitCcxiEG6haVF2ND3D0/8p85kEsklEIGjzCkBmTqxBpMyrAFUQafMVACqEZL4KIAshmx8Av7NSWVblFJg78btVRDHPPAAurmAKQIV5GSILUGlegsgA9DCfhmABWPM2Sf/Nw1zGfNt2Ua5dfY6KJlBhoEJjBhMBqCxcqfWE8QB2/1Jv+5+2Fxo5mLsqk8Qm2yqMefalqPu2SsZ8FMLV9uaAV8gtEOi97pu7SxAV5mXtaAKtkK1K9rPJ3eMDB63NAgQ6YttTBsC24z2vNhIYCYgjsPsWegCX+G4xgecoPgAAAABJRU5ErkJggg==">
            </span>
        `;
        divCenter.appendChild(div);
        // 创建文字内容部分
        div = document.createElement('div');
        div.dataset.pluginId = "content";
        div.style.height = '70px';
        div.style.boxSizing = 'border-box';
        div.style.padding = '20px';
        divCenter.appendChild(div);

        // 创建按钮
        div = document.createElement('div');
        div.style.height = '50px';
        div.style.boxSizing = 'border-box';
        div.style.padding = '10px 20px';
        div.style.textAlign = 'right';
        div.innerHTML = `
            <button data-plugin-id="confirm"></button>
            <button data-plugin-id="cancel"></button>
        `;
        divCenter.appendChild(div);
    }


    // 立即执行函数返回自身 就可以在外面调用
    return openConfirm;

}())