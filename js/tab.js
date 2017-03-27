$(function(){
	route("home",$("#tabconaiter"));
	
	$(".nav-bar").find(".navLi").each(function(){
		$(this).on("click",function(){
			$(this).removeClass("active").addClass("active").siblings().removeClass("active");
		})
	})
})
