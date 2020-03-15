var fs = require("fs");
/**
 * 通过fs.createWriteStream写入文件内容
 * 只能在根目录创建文件
 * @param {Object} fileName	文件名
 * @param {Object} data		文件内容
 * @param {Object} func		回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.writeStream('111.txt','111111',function(data){
 * 		console.log(data);
 * });
 */
exports.writeStream = function(fileName,data,func) {
	// 创建一个可以写入的流，写入到文件 output.txt 中
	var writerStream = fs.createWriteStream(fileName);

	// 使用 utf8 编码写入数据
	writerStream.write(data,'UTF8');

	// 标记文件末尾
	writerStream.end();

	// 处理流事件 --> data, end, and error
	writerStream.on('finish',function(){
		func("写入完成。");
	});

	writerStream.on('error',function(err){
		func(err.stack);
	});
}
/**
 * 通过fs.createReadStream读取文件内容
 * @param {Object} fileName	文件名
 * @param {Object} func		回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.readStream('111.txt',function(data){
 * 		console.log(data);
 * });
 */
exports.readStream = function(fileName,func) {
	var data = '';

	// 创建可读流
	var readerStream = fs.createReadStream(fileName);

	// 设置编码为 utf8。
	readerStream.setEncoding('UTF8');

	// 处理流事件 --> data, end, and error
	readerStream.on('data',function(chunk) {
		data += chunk;
	});

	readerStream.on('end',function(){
		func(data);
	});

	readerStream.on('error',function(err){
		func(err.stack);
	});
}

/**
 * 通过fs.writeFile写入文件内容
 * 如果目录不存在,会自动创建目录
 * @param {Object} path	目录路径
 * @param {Object} fileName	文件名
 * @param {Object} data		文件内容
 * @param {Object} func		回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.writeFile('./22/','111.txt','222222',function(data){
 *		console.log(data);
 * });
 */
exports.writeFile = function(path,fileName,data,func){
	console.log("判定目录路径");
	if(path){
		console.log("准备创建目录");
		fs.mkdir(path,{recursive:true},function(err){
			if(err){
				console.log("目录创建失败:"+err);
				func(err);
				return;
			}
			console.log("目录创建成功。");
			console.log("准备写入文件");
			fs.writeFile(path+fileName,data,function(err){
				if(err){
					console.log("数据写入失败:"+err);
					func(err);
					return;
				}
				console.log("数据写入成功！");
				func("数据写入成功！");
			});
		});
	}else{
		console.log("准备写入文件");
		fs.writeFile(fileName,data,function(err){
			if(err){
				console.log("数据写入失败:"+err);
				func(err);
				return;
			}
			console.log("数据写入成功！");
			func("数据写入成功！");
		});
	}
}

/**
 * 通过fs.readFile读取文件内容
 * @param {Object} fileName	文件名
 * @param {Object} func		回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.readFile('111.txt',function(data){
 * 		console.log(data);
 * });
 */
exports.readFile = function(fileName,func){
	console.log("准备读取文件");
	fs.readFile(fileName,function(err,data){
		if(err){
			console.log("数据读取失败:"+err);
			func(err);
			return;
		}
		console.log("数据读取成功！");
		func(data);
	});
}

/**
 * 通过fs.unlink删除文件
 * @param {Object} fileName	文件名
 * @param {Object} func		回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.removeFile('111.txt',function(data){
 * 		console.log(data);
 * });
 */
exports.removeFile = function(fileName,func){
	console.log("准备删除文件！");
	fs.unlink(fileName, function(err) {
		if (err) {
			console.log("文件删除失败:"+err);
			func(err);
			return;
		}
		console.log("文件删除成功！");
		func("文件删除成功！");
	});
}

/**
 * 通过fs.mkdir删除目录
 * @param {Object} path	目录路径
 * @param {Object} func	回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.mkdir('./jjj/ff/',function(data){
 * 		console.log(data);
 * });
 */
exports.mkdir = function(path,func){
	console.log("准备创建目录！");
	fs.mkdir(path,{recursive:true},function(err){
		if(err){
			console.log("目录创建失败:"+err);
			func(err);
			return;
		}
		console.log("目录创建成功。");
		func("目录创建成功。");
	});
}

/**
 * 通过fs.readdir读取目录
 * @param {Object} path	目录路径
 * @param {Object} func	回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.readdir('./jjj/',function(data){
 * 		console.log(data);
 * });
 */
exports.readdir = function(path,func){
	console.log("读取目录");
	fs.readdir(path,function(err,files){
		if(err){
			console.log("读取目录失败:"+err);
			func(err);
			return;
		}
		console.log("读取目录成功。");
		func(files);
	});
}

/**
 * 通过fs.rmdir删除目录
 * @param {Object} path	目录路径
 * @param {Object} func	回调函数
 * 例子:
 * var fileUtil = require("./fileUtil");
 * fileUtil.rmdir('./jjj/ff/',function(data){
 * 		console.log(data);
 * });
 */
exports.rmdir = function(path,func){
	console.log("准备删除目录");
	fs.rmdir(path,function(err){
		if(err){
			console.log("删除目录失败:"+err);
			func(err);
			return;
		}
		console.log("删除目录成功。");
		func("删除目录成功。");
	});
}