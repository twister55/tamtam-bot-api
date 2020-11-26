module.exports = {
    env: {
        node: true
    },
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier', 'prettier/@typescript-eslint'],
    plugins: ['prefer-arrow', '@typescript-eslint', 'prettier'],
    rules: {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'linebreak-style': ['error', 'unix'],
        'max-len': [
            'error',
            {
                code: 200
            }
        ],
        'comma-dangle': 'off',
        'object-shorthand': 'error',
        'max-classes-per-file': ['error', 1],
        'new-parens': 'error',
        'spaced-comment': ['error', 'always'],
        'semi': ['error', 'always'],
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                allowStandaloneDeclarations: true
            }
        ],
        'no-var': 'error',
        'no-eval': 'error',
        'no-console': 'error',
        'no-unreachable': 'error',
        'no-extra-semi': 'error',
        'no-new-symbol': 'error',
        'no-new-wrappers': 'error',
        'no-constant-condition': 'error',
        'no-trailing-spaces': 'error',
        'no-duplicate-imports': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array'
            }
        ]
    }
};
