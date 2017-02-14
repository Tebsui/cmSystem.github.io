$(window).load(function(){
	$("input:text").val("");
	$("input:password").val("");
});
$(function(){
	// 返回上一页
	$("#goback").click(function(){
		history.go(-1);
	});
	
	// 返回主页
	$("#register").click(function(){
		location.href = "register.html";
	});
	
	// 提交
	$("form").submit(function(event){
		//阻止默认事件
		event.preventDefault();
		
		
		// 发送登陆请求
		
//		var data = new FormData(this); 原生获取表单数据 js 代码
		// 将表单提交的数据 编译成字符串
		var data = $(this).serialize();
		
		$.post({
			url: "user/login"
		},data,function(resData){
			$(".modal-body").text(resData.message);
			$("#myModal").modal("show").on("hide.bs.modal",function(){
				if(resData.code == 3){
					location.href = "index.html";
				}
			});
		});
		
	
		
	});
});

	