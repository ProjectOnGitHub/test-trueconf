module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/strongly-recommended', 'airbnb-base'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  ignorePatterns: ['.eslintrc.js', 'nuxt.config.js'],
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }
    ],

    'vue/order-in-components': [
      'error',

      {
        order: [
          'el',

          'name',

          'key',

          'parent',

          'functional',

          ['delimiters', 'comments'],

          ['components', 'directives', 'filters'],

          'extends',

          'mixins',

          ['provide', 'inject'],

          'ROUTER_GUARDS',

          'layout',

          'middleware',

          'validate',

          'scrollToTop',

          'transition',

          'loading',

          'inheritAttrs',

          'model',

          ['props', 'propsData'],

          'emits',

          'setup',

          'data',

          'asyncData',

          'fetch',

          'head',

          'computed',

          'watch',

          'watchQuery',

          'LIFECYCLE_HOOKS',

          'methods',

          ['template', 'render'],

          'renderError'
        ]
      }
    ],

    'vue/no-irregular-whitespace': [
      'error',

      {
        skipStrings: true,

        skipComments: false,

        skipRegExps: false,

        skipTemplates: false,

        skipHTMLAttributeValues: false,

        skipHTMLTextContents: false
      }
    ],

    'vue/component-definition-name-casing': ['error', 'PascalCase'],

    'vue/match-component-file-name': [
      'error',

      {
        extensions: ['vue'],

        shouldMatchCase: false
      }
    ],

    'vue/no-dupe-keys': [
      'error',

      {
        groups: []
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false
      }
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'no-console': 'error',
    'no-debugger': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'no-plusplus': 'off',
    'constructor-super': 'off',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: true
      }
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-expressions': 'error',
    'no-param-reassign': 'off',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true }
      }
    ],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index']
      }
    ]
  }
};
