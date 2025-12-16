module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-custom-property-no-missing-var-function',
    'stylelint-use-nesting'
  ],
  rules: {
    // Проверка использования CSS переменных
    'custom-property-no-missing-var-function': true,
    
    // Проверка именования CSS переменных
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'CSS custom properties should be kebab-case'
      }
    ],
    
    // Запрет на неизвестные CSS переменные
    'csstools/use-nesting': 'always',
    
    // Проверка, что переменные определены
    'no-unknown-custom-properties': [
      true,
      {
        importFrom: [
          './styles/globals.css',
          './styles/variables.css'
        ]
      }
    ],
    
    // Порядок объявления переменных
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ]
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/.next/**',
    '**/coverage/**'
  ]
};
