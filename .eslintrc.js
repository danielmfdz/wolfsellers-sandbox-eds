module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:json/recommended',
    'plugin:xwalk/recommended',
  ],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
  },
  overrides: [
    // Reglas para TS
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // apunta a tu tsconfig si quieres type-aware rules
        // project: ['./tsconfig.json'],   // (opcional, ver nota abajo)
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        // ejemplos útiles:
        'no-undef': 'off', // TS ya chequea tipos/nombres
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
    },
  ],
};
