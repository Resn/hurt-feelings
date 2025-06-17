module.exports = {
    "extends": [
      "eslint-config-semistandard",
      'plugin:vue/vue3-recommended',
      'plugin:prettier/recommended',
      'plugin:json/recommended',
      'plugin:yml/prettier'
    ],
    parserOptions: {
      parser: '@typescript-eslint/parser',
      requireConfigFile: false,
      ecmaVersion: 2017,
      sourceType: 'module',
    },
    "rules": {
      'camelcase': 0,
      'linebreak-style': 0,
      'import/order': 1,
      'max-statements-per-line': 1,
      'new-cap': 0,
      'no-console': 0,
      'no-invalid-this': 'off',
      'no-undef': 0,
      'no-unused-vars': 0,
      'selector-max-type': 0,
      'unused-imports/no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'prefer-const': 'off',
      'prettier/prettier': 'off',
      'no-useless-constructor': 'off',
      'object-shorthand': 'off',
      'vue/first-attribute-linebreak': 'off',
      'spaced-comment': 'off',
      'vue/multi-word-component-names':'off'
    },
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'spaced-comment': ['off'],
        'yml/spaced-comment': ['error'],
        'yml/block-mapping': ['off'],
        'selector-max-type': ['off'],
        'vue/multi-word-component-names': ['off']
      },
    },
    {
      files: ['src/layouts/default.vue', 'src/pages/**.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ]
}
