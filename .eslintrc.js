module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2020: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
  },
  overrides: [
    {
      files: ['__tests__/*', '__tests__/**/*'],
      env: {
        jest: true
      },
    },
  ],
}
