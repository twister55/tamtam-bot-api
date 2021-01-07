import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    external: ['axios'],
    output: [
        {
            file: './index.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: './index.mjs',
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        typescript()
    ]
};
