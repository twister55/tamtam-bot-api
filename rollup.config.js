import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/index.ts',
    plugins: [
        typescript(),
    ],
    output: {
        format: 'cjs',
        file: 'dist/index.js'
    },
    watch: {
        chokidar: true
    }
};
