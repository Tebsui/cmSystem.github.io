$(function(){
	
	$("#goback").click(function(){
		history.go(-1);
	});
	
	$("#home").click(function(){
		location.href = "index.html";
	});
	
	
//	console.log($.cookie("question"));
	// 从 cookie 中获取要回答问题的参数 question(文件名)
//	var question = $.cookie("question");
	
	$("form").submit(function(event){
		event.preventDefault();
		// 方1
		var data = $(this).serialize();
		// 方2
//		var data = $(this).serializeArray();
//		data.push({
//			name:
//			value:
//		});
		$.post("/question/answer",data,function(resData){
			$(".modal-body").text(resData.message);
			$("#myModal").modal("show").on("hide.bs.modal",function(){
				if(resData.code == 3){
					location.href = "index.html";
				}
			});
		});
	});
});

