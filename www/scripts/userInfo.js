$(function(){
	$("#goback").click(function(){
		history.go(-1)
	});
	$("#home").click(function(){
		location.href="index.html";
	});
	
	$("form").submit(function(event){
		event.preventDefault();
		// 获取表单数据
		// 上传图片用 FormData
		var data = new FormData(this);
		console.log($("input:file").val());
		$.post({
			url: "/user/photo",
			data: data,
			contentType: false,
			processData: false,
			success: function(resData){
				$(".modal-body").text(resData.message);
				$("#myModal").modal("show");
			}
		});
	
	});
});