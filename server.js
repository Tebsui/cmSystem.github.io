
// 服务器构造函数
var  express = require("express");
// 处理 post 请求的参数 到 body 对象中
var  bp = require("body-parser");
// 处理文件上传
var  multer = require("multer");
// 处理缓存 cookie 到 cookie 对象中
var  cookie = require("cookie-parser");
// 处理文件 I/O
var  fs  = require("fs");

// 创建服务器对象
var  app = express();

// 配置静态文件夹
app.use(express.static("www"));
// 解析 post 请求参数
app.use(bp.urlencoded({extended:true}));
// 解析 cookie 对象
app.use(cookie());


/*************注册*****************/  
app.post("/user/register",(req,res)=>{
	console.log(req.body);
	// 先判断有没有 user 文件夹  users 文件夹用来保存所有注册过的用户
	fs.exists("users",function(exi){
		if(exi){
			// 存在
			writeFile();
		}else{
			// 不存在 fs.mkdirSync() 同步创建文件夹 在外面写代码
			//	fs.mkdir() 异步创建文件夹 在 function(){写代码}
			fs.mkdir("users",function(error){
				if(error){
					// 创建失败
					res.status(200).json({code:0,message: "系统创建文件夹失败"});
				}else{
					// 创建成功 (写入)
					writeFile();
				};
			});
		};
	});
	
	function writeFile(){
 	// 先判断 用户是否已经 注册过
 	 
 	 var fileName = "users/" + req.body.petname + ".txt";
 	 fs.exists(fileName,function(exi){
 	 	if(exi){
 	 		// (文件)用户存在，已被抢注
 	 		res.status(200).json({code: 2,message: "用户名已存在，请重新注册"});
 	 	}else{
 	 		//在 body 中加入 ip 和 time 属性
 	 		req.body.ip = req.ip;
 	 		req.body.time = new Date();
 	 		
 	 		// 用户未被注册，把用户信息写入本地
 	 		fs.writeFile(fileName,JSON.stringify(req.body),function(err){
 	 			if(err){
 	 				// 写入失败
 	 			res.status(200).json({code: 1,message: "系统错误，写入文件失败"});
 	 				
 	 			}else{
 	 				// 保存成功
 	 				res.status(200).json({code: 3,message: "注册成功"});
 	 				
 	 			}
 	 		});
 	 	}
 	 });
 }
});

 // 封装一个 把注册信息写入本地的方法
 



app.listen(3000,()=>{
	console.log("start..");
});
