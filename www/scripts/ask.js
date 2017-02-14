$(function(){
	// 返回上一页
	$("#goback").click(function(){
		history.go(-1);
	});
	
	// 返回主页
	$("#home").click(function(){
		location.href = "index.html";
	});
	
	// 提价问题
	$("form").submit(function(event){
		event.preventDefault();
		var  data = $(this).serialize();
		$.post("/question/ask",data,function(resData){
			$(".modal-body").text(resData.message);
			$("#myModal").modal("show");
		});
		
	});
	

	
});