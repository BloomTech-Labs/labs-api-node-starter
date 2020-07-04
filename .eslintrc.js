module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {},
  plugins: ['prettier'],
  rules: {},
  overrides: [
    {
      files: ['__tests__/*', '__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
