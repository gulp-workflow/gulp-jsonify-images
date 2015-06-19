'use strict';

var path = require('path');
var fs = require('fs-extra');
var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-jsonify-images';

var jsonifyImages = function(options) {
	function reverse(str) {
		return str.split("").reverse().join("");
	}

	function replaceRight(str, target, replacement) {
		str = reverse(str);
		str = str.replace(target, replacement);
		return reverse(str);
	}

	function bufferToBase64(filePath, callback) {
		fs.readFile(filePath, function (error, data) {
			if (error) throw error;
			callback(new Buffer(data).toString('base64'));
		});
	}

	options = options || {};
	options.dest = options.dest || './dist';
	options.filename = options.filename || 'data.json';
	options.type = options.type || 'base64';

	var result = {};

	return through.obj(function(file, enc, cb) {
		var params = {};
		var fileSplitted = file.path.split('\\');

		if (file.isNull()) return cb(null, file);
		if (file.isStream()) return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
		if (!file.contents.length) return cb(null, file);
		if (path.basename(file.path).indexOf('_') === 0) return cb(null, file);

		params.title = fileSplitted[fileSplitted.length - 1];
		params.buffer = file.contents;

		// Ensure `indentedSyntax` is true if a image file
		if (path.extname(file.path) === '.jpg' ||
			path.extname(file.path) === '.png' ||
			path.extname(file.path) === '.jpeg' ||
			path.extname(file.path) === '.gif' ||
			path.extname(file.path) === '.svg') {
			params.indentedSyntax = true;
		}

		if (!params.indentedSyntax) return cb(new gutil.PluginError(PLUGIN_NAME, 'File extension not supported'))

		var image = replaceRight(params.title, '.', '!');
		var imageParts = image.split('!');

		var filename = imageParts[0];
		var extension = imageParts[1] == 'jpeg' ? 'jpg' : imageParts[1];

		result[filename] = (options.type == 'base64' ? 'data:image/' + extension + ';base64,' : '') + (new Buffer(params.buffer).toString(options.type));

		fs.mkdirs(options.path, function(error) {
			if (error) throw error;

			fs.writeJSON(options.path + '/' + options.filename, result, function (error) {
				if (error) throw error;
				cb(null, file);
			});
		});
	});
};

module.exports = jsonifyImages;