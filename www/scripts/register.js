
$(window).load(function(){
	$("input:text").val("");
	$("input:password").val("");
})

$(function(){
	// 返回上一页
	$("#goback").click(function(){
		history.go(-1);
	});
	
	// 返回主页
	$("#home").click(function(){
		location.href = "index.html";
	});
	
	// 提交
	$("form").submit(function(event){
		//阻止默认事件
		event.preventDefault();
		
		// 比较密码和确认密码是否一样
//		var pwd = $("input[type=password]").map(function(){
//			return $(this).val();
//		});
		var pwd = $("input:password");		
		if(pwd.eq(0).val() != pwd.eq(1).val() ){
			// 两次输入不一致
			$(".modal-body").text("两次输入的密码不一致");
			$("#myModal").modal("show");
			return;
		}
		
		// 发送注册请求
		
//		var data = new FormData(this); 原生获取表单数据 js 代码
		// 将表单提交的数据 编译成字符串
		var data = $(this).serialize();
		
		$.post({
			url: "user/register"
		},data,function(resData){
			$(".modal-body").text(resData.message);
			$("#myModal").modal("show").on("hide.bs.modal",function(){
				if(resData.code == 3){
					location.href = "login.html";
				}
			});
		});
		
	
		
	});
});
