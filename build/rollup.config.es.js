import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify-es' //js压缩

const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'VueCheckUtils',
        file: 'dist/vue-check-utils.esm.js',
        format: 'iife'
    },
})

config.plugins.push(uglify())

export default config