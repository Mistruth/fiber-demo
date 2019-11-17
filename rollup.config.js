// import { terser } from 'rollup-plugin-terser'
export default {
    input : 'src/index.js',
    output: [
        { 
            file: "dist/luba.js", format: 'cjs', esModule: false, sourcemap: true
        },
        { 
            file: "dist/luba-umd.js", format: 'umd', esModule: false, name: "luba", sourcemap: true
        },
        { 
            file: "dist/luba.js", format: 'esm', esModule: false, sourcemap: true
        }
    ]

}