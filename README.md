# gulp-jsonify-images

## Run command
```
npm i -D gulp-jsonify-images
```

## Usage
```js
var gulp = require('gulp');
var jsonImages = require('gulp-jsonify-images');

gulp.task('default', function() {
    gulp.src('./src/images/*.png')
        .pipe(jsonImages({
            path: './dist/assets/store',
            filename: 'data.json',
            type: 'base64'
        }))
        .pipe(gulp.dest('./dist/assets/images'));
});
```

## Options
- **path** - destination to store file
- **filename** - name of the json file
- **type** - base64/utf8 or other string compressors