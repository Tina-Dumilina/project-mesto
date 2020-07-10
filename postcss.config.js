module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['defaults'],
      cascade: false
    }),
    require('cssnano')({ // подключили cssnano
      preset: 'default', // выбрали настройки по умолчанию
    })
  ]
}