/**
 * 引用 gulp 的几个方法：
 *
 * + src: 指定处理文件的源目录；
 * + dest: 处理文件的输出目录；
 * + series: 串行执行；
 * + watch: 监视文件执行；
 */
const { src, dest, series, watch } = require('gulp')

/**
 * gulp-load-plugins是一款神奇的插件，可以帮助我们通过"plugins.插件名"来使用插件。
 * 举例: gulp-unlify => plugins.unlify = require('gulp-uglify')
 *
 * 但这个插件有个前提，只能自动引用以gulp-为前缀的插件，其他插件需自己手动引入。
 */
const plugins = require('gulp-load-plugins')()

const del = require('del')
// create: 创建Browsersync实例
const browserSync = require('browser-sync').create()

// reload: 会通知所有的浏览器相关文件被改动，要么导致浏览器刷新，要么注入文件，实时更新改动
const reload = browserSync.reload

/**
 * 压缩JS
 *
 * cb 用于通知 gulp 主进程，scripts任务执行完毕
 */
function js(cb) {
  // 先指定处理文件目录
  src('src/*.js')
    // 输出至下一个处理环节：代码混淆压缩
    .pipe(plugins.uglify())
    // 输出dist目录
    .pipe(dest('./dist/js'))
    // 刷新页面加载元素
    .pipe(reload({ stream: true }))
  cb()
}

// 对css/less 编译，压缩并输出css文件
function css(cb) {
  src('./src/*.scss')
    // 压缩CSS
    .pipe(plugins.sass({ outputStyle: 'compressed' }))
    .pipe(
      // 还需配置下browserlist，需在package.json中配置该文件
      plugins.autoprefixer({
        cascade: false,

        remove: false // 自动删除一些过时的prefixes
      })
    )
    .pipe(dest('./dist/css'))
    // 刷新页面加载元素
    .pipe(reload({ stream: true }))
  cb()
}

// 监听文件变化
function watcher() {
  // 告诉watch监听的文件是什么，当文件发生变化时，该执行什么任务。
  watch('./src/*.js', js)
  watch('./src/*.scss', css)
}

// 删除dist目录中内容
function clean(cb) {
  del('./dist')
  cb()
}

// Server 任务
function serve(cb) {
  browserSync.init({
    server: {
      // 指定加载目录
      baseDir: './'
    }
  })
  cb()
}

exports.scripts = js
exports.styles = css
exports.clean = clean
// 默认处理的方式
exports.default = series([
  // 先删除dist目录，然后处理JS、CSS，启动serve，最后执行watcher操作
  clean,
  js,
  css,
  serve,
  watcher
])
