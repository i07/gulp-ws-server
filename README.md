# gulp-ws-server
A simple gulp (> 4.x) websocket server.

#### Installation
```$xslt
npm install --save-dev gulp-ws-server
```

#### Usage (with gulp.task)
```js
const gulp = require('gulp');
const ws = require('gulp-ws-server');

// start an instance of websocket server
let wss = ws({
    port: 3000,
    path: '/myWS'
});

// send a message
gulp.task('send', () => {
  wss.send('refresh')
})
```

#### Usage (with gulp.watch)
gulp expects a valid stream back, we use `through2` to return the gulp stream without writing out or process any function.
```js
const gulp = require('gulp');
const ws = require('gulp-ws-server');
const through2 = require('through2');

// start an instance of websocket server
let wss = ws({
    port: 3000,
    path: '/myWS'
});

gulp.task('reload-browser', () => {
  wss.send('refresh');
  return gulp
    .src(__filename)
    .pipe(through2({objectMode: true}))
});

gulp.watch("less/**/*.less", gulp.series('less', 'reload-browser'));

```
#### Client implementation (example: refresh page on gulp task)
```js
if ("WebSocket" in window) {
  let ws = new WebSocket("ws://localhost:3000/myWS");
  ws.onmessage = function(e) {
    if (e.data === "refresh") {
      window.top.location.reload();
    }
  };
}
```
