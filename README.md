# gulp-jsonify-images

[![GitHub version](https://badge.fury.io/gh/zgabievi%2Fgulp-jsonify-images.svg)](http://badge.fury.io/gh/zgabievi%2Fgulp-jsonify-images)
[![Dependency Status](https://david-dm.org/zgabievi/gulp-jsonify-images.svg)](https://david-dm.org/zgabievi/gulp-jsonify-images)

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
