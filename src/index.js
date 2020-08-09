// import Demo from '../demo.vue'
import foo from './foo.js'

console.log(foo)

(function VueCheckPlugin() {
    let installed = false,
        componentsLabelCollection = [],
        componentsLabel = null,
        _Vue = null,
        VueBuiltIn = ['KeepAlive', 'transition', 'TransitionGroup', 'Basic', 'Navigation', 'Data','Event'];

    function isViewCom(vm) {
        // debugger
        const vmNname = vm.$options.name
        console.log(12, vmNname, 'vmNname')
        let ret = true
        if (!vmNname) {
            // 是ElementUI组件&&不显示ElementUI
            ret = false
        }
        /* if (NoInspect.indexOf(vmNname) > 0) {
            ret = false
        } */
        if (VueBuiltIn.indexOf(vmNname) > 0) {
            // vue内置组件
            ret = false
        }
        if (vmNname === 'VueComponentInspector') {
            // 插件本身
            ret = false
        }
        return ret
    }

    function install(Vue, options = {}) {
        if (installed && _Vue === Vue) return
        nstalled = true
        _Vue = Vue

        Vue.mixin({
            mounted() {
                let el = this.$el
                const vmNname = this.$options.name
                if (this && this.$root === this) {  // 判断是根节点，表示已经拿出内部所有组件 进行下一操作
                    console.info(`我是根节点`, this.$root, this, componentsLabelCollection)
                    this.$root.componentsLabelCollection = componentsLabelCollection
                    this.$root.$options.fileUrl = 'root'
                    this.curVm = null
                }
                if (isViewCom(this)) {
                    if (el.nodeType === 8) {
                        el = el.parentNode
                        this.$options.comment = true
                    }
                    window.setTimeout(() => {
                        addEventList(this)
                    })
                    componentsLabel = createComponentsLabel(el, this, vmNname)
                    componentsLabelCollection.push({ vmEl: el, componentsLabel: componentsLabel })
                }
            },
            destroyed() {
            }
        })

        // Vue.component('Demo', Demo)
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