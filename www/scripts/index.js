
$(function(){
	// 从本地缓存cookie 中取出 petname 值
//	cookie 的生存周期 如果不设置，浏览器关掉就消失
	var  petname = $.cookie("petname");
//	console.log(petname);
	$("#ask").click(function(){
		petname ? location.href = "ask.html" : location.href = "login.html";
	});
	//判断有没有 petname 决定 user 图片样式和行为
	if(petname){
		$("#userName").text(petname);		
	}else{
		$("#userName").text("登陆").parent().removeAttr("data-toggle").click(function(){
			location.href ="login.html";
		});		
	}
	//退出登陆
	$("#logOff").click(function(){
		$.get("/user/logOff",function(resData){
			if(resData.code == 1){
				// 重新刷新的当前页面
				location.reload();
			}
		
		});
	});
	
	// 给每个问题添加点击事件
	$(".questions").on("click",".media[data-question]",function(){
//		alert("hahah");
		// 把 data-question 的值存到 cookie 中
		
		if(petname){
			$.cookie("question",$(this).data("question"));	
			
			location.href = "answer.html";
		}else{
			location.href = "login.html";
		}
	});
	
	// 获取首页数据
	$.get("/question/all",function(resData){
		var htmlstr = "";
		for (var i = 0; i < resData.length; i++) {
				// z这里采用 bootstrap 里面的 Bootstrap 多媒体对象 (Media object)
				var question = resData[i];
				// 这是外层
				htmlstr += "<div class='media' data-question='"+ new Date(question.time).getTime()+"'>"
				// 内层第一块
				htmlstr += "<div class='pull-left'><a>"
				htmlstr += '<img class="media-object" src="../uploads/'+question.petname+'.png" onerror="defaultImg(this)" />';			
//				htmlstr += resData.content;
				htmlstr += "</a></div>"
				//内层第二块
				htmlstr +="<div class='media-body'>"
				htmlstr +="<h4 class='media-heading'>"+question.petname+":</h4>";
				htmlstr += question.content;
				htmlstr +="<div class='media-footing'>"+formatDate(new Date(question.time))+ "&#x3000;"+formatIp(question.ip) +"</div>";				
				htmlstr +="</div>"		
				htmlstr += "</div>"
				
		if(question.answers){
			// 内层 for 循环，遍历问题的答案
				for(var j=0;j<question.answers.length;j++){
					var answer = question.answers[j];
					// 外层
					htmlstr += "<div class='media media-child'>";
					// 内层第一块
					htmlstr += "<div class='media-body '>";
					htmlstr += "<h4 class='media-heading'>"+answer.petname+":</h4>";
					htmlstr += answer.content;
					htmlstr += "<div class='media-footing'>"+formatDate(new Date(answer.time))+"&#x3000;"+formatIp(answer.ip) +"</div>"
				
					htmlstr += "</div>";
					
					htmlstr +="<div class='media-right'><a>";
					htmlstr +="<img class='media-object' src='../uploads/"+answer.petname+".png'>";
					htmlstr +="</a></div>"
					htmlstr +="</div>"
					htmlstr += "</div>";
					}
				}
				htmlstr +="<hr/>"	
			}
				$(".questions").html(htmlstr);	
	})
	
	//封装一个方法:解析 data
	function formatDate(time){
		var y = time.getFullYear();
		var M = time.getMonth()+1;
		var d = time.getDate();
		var h = time.getHours();
		var m = time.getMinutes();
		M = M<10 ? "0"+M : M;
		d = d<10 ? "0"+d : d;
		h = h<10 ? "0"+h : h;
		m = m<10 ? "0"+m : m;
		return y+"-"+M+"-"+d+" "+h+":"+m;	
	}
	//封装一个方法： 解析 ip
	function formatIp(ip){
		if(ip.startsWith("::1")){
			return "172.0.0.1";
		}else {
			return ip.substr(7);
		}
	}	

});

// 如果没有上传头像， 就加载默认头像
function defaultImg(that) {
 	// 这里的 that 可就是调用这个方法传递过来的 img.media-object 这个标签对象
   		 $(that).prop("src","../images/user.png");
}



