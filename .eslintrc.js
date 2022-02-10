module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    '@react-native-community',
  ],
  plugins: ['react', '@typescript-eslint', 'import'],
  settings: {
    'import/ignore': ['node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  ignorePatterns: ['node_modules'],
  rules: {
    '@typescript-eslint/no-var-requires': 0, // Лучше в будущем вернуть это правило и убрать из tslint-a "no-var-requires": false, как пофиксят src/assets/images/index.ts например
    'jsx-quotes': 0,
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true,
      },
    ],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/first': 2,
    'import/no-absolute-path': 2,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 1,
  },
};
