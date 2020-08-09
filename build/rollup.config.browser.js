import base from './rollup.config.base'

const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'vue-check-utils',
        file: 'dist/vue-check-utils.js',
        format: 'umd'
    },
})

export default config