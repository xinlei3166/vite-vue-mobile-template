const path = require('path')

module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 750, // UI设计稿的宽度
      viewportHeight: 1334, //视口的高度，对应的是设计稿的高度（也可以不配置）
      unitPrecision: 2, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['ignore'], // 指定不转换为视窗单位的类名，
      minPixelValue: 0, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况,
      overrideOptions: ({ file }) => {
        let viewportWidth = 750
        if (file.includes(path.join('node_modules', 'vant'))) {
          viewportWidth = 375
        }
        // Compatible the unocss
        if (file.includes('__uno.css')) {
          viewportWidth = 375
        }
        return { viewportWidth }
      }
    }
    // 'postcss-pxtorem': {
    //   rootValue({ file }) {
    //     return file.indexOf('vant') !== -1 ? 37.5 : 75
    //   },
    //   unitPrecision: 2,
    //   propList: ['*'],
    //   // selectorBlackList: ['van-'], // 排除van-开头(即vant库中的css样式)的class名
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 0
    //   // exclude: /node_modules/i
    // }
  }
}
