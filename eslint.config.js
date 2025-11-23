import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import pluginQuasar from '@quasar/app-vite/eslint';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    ignores: [
      '/dist',
      '/src-capacitor',
      '/src-cordova',
      '/.quasar',
      '/node_modules',
      '.eslintrc.cjs',
      '/src-ssr',
      '/quasar.config.*.temporary.compiled*'
    ]
  },

  pluginQuasar.configs.recommended(),
  js.configs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  pluginVue.configs['flat/essential'],

  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
  // https://github.com/vuejs/eslint-config-typescript
  vueTsConfigs.recommendedTypeChecked,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly', // BEX related
      },
    },

    // add your custom rules here
    rules: {
      'prefer-promise-reject-errors': 'off',
      quotes: ['warn', 'single', { avoidEscape: true }],
      // this rule, if on, would require explicit return type on the `render` function
      '@typescript-eslint/explicit-function-return-type': 'off',

      // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
      '@typescript-eslint/no-var-requires': 'off',
      indent: 'off',
      '@typescript-eslint/indent': ['error', 2],

      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      semi: ['warn', 'always'],
      'semi-spacing': ['warn', { before: false, after: true }],
      'comma-spacing': ['warn', { before: false, after: true }],
      'space-infix-ops': 2,
      'space-in-parens': [1, 'never'],
      'spaced-comment': ['error', 'always'],
      'array-bracket-spacing': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
      'block-spacing': 'warn',
      'arrow-spacing': 'warn',
      'space-before-function-paren': ['warn', 'never'],
      'keyword-spacing': ['warn', { before: true }],
      // 'linebreak-style': ['error', 'unix'],
      'brace-style': ['error', 'allman'],
      'prefer-const': ['warn'],
      'max-len': [
        'error',
        {
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
          code: 3000,
        },
      ],
      'no-shadow-restricted-names': 'error',
      'no-sequences': 'error',
      'no-new-wrappers': 'error',
      'no-multiple-empty-lines': 'warn',
      'no-eval': 'error',
      'no-fallthrough': 'warn',
      'no-invalid-this': 'off',
      'no-cond-assign': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'off',
      'no-caller': 'error',
      'new-parens': 'error',
      'max-lines': ['warn', 2000],
      'no-trailing-spaces': [
        'warn',
        { ignoreComments: false, skipBlankLines: false },
      ],
      'no-prototype-builtins': 'warn',
      'no-unused-vars': 'off',
      'comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never',
        },
      ],
      'no-console': 1,
      'prefer-template': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'object-shorthand': 'warn',
      'one-var': ['warn', 'never'],
      'prefer-object-spread': 'error',
      'quote-props': ['error', 'consistent-as-needed'],
      radix: 'error',
      curly: 'warn',
      'use-isnan': 'error',

      '@typescript-eslint/no-use-before-define': [
        'warn',
        { functions: true, variables: true, classes: false },
      ],
      '@typescript-eslint/no-wrapper-object-types': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-empty-interface': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/unbound-method': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,

      '@typescript-eslint/type-annotation-spacing': 'warn',
      '@typescript-eslint/no-unsafe-argument': 0,

      // '@typescript-eslint/no-unnecessary-type-assertion': 'off',

      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/require-await': 0,
      'no-mixed-spaces-and-tabs': 0,
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: [
            'Login',
            'Logo',
            'Dropzone',
            'Footer',
            'Landing',
            'Index',
            'DeleteIcon',
            'EditIcon',
            'Form'
          ],
        },
      ],
    },
  },

  {
    files: ['src-pwa/custom-service-worker.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  prettierSkipFormatting,
);
