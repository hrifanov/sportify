module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es2022: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-empty': 'off',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'semi': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'lf',
        htmlWhitespaceSensitivity: 'ignore',
        bracketSpacing: true,
        bracketSameLine: false,
        jsxBracketSameLine: false,
        proseWrap: 'always',
        quoteProps: 'consistent',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['src/**/*.js'],
    },
  ],
};
