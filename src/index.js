(function VueCheckPlugin() {

    function install(Vue, options = {}) {
        Vue.mixin({
            mounted() {
                alert(1)
            },
            destroyed() {
            }
        })
    }



    // 浏览器直接导入，这样的方法暴露到全局
    window.VueCheckPlugin = VueCheckPlugin

    // 支持ES6Module/CommonJS模块导入规范
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = VueCheckPlugin;

    return {
        install: install,
        version: '__VERSION__'
    }
})()