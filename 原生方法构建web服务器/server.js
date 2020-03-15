var http = require("http");
var url = require("url");

exports.start = function(route){
	http.createServer(function (request, response) {
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		//解析url请求路径
		var pathname = url.parse(request.url,true).pathname;
		console.log("请求名:" + pathname);
		route(pathname);
		response.write("请求类型:"+request.method);
		//判定请求类型
		if(request.method=='GET'){
			// 解析 url 参数
			var params = url.parse(request.url, true).query;
			response.write("网站名：" + params.name);
		}else{
			// 定义了一个post变量，用于暂存请求体的信息
			var post = '';     
			 
			// 通过request的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
			request.on('data', function(chunk){    
				post += chunk;
			});
			 
			// 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
			request.on('end', function(){    
				var params = querystring.parse(post);
				response.write("网站名：" + params.name);
			});
		}
		response.end();
		console.log("Server has started.");
	}).listen(8888);
	
	// 终端打印如下信息
	console.log('Server running at http://127.0.0.1:8888/');
}



