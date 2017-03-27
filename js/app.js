/**
 * Created by hxsd on 2017/3/21.
 */
function getUrlParams(u){
    var params={};
    var url=window.location.href;

    var p=url.split("#");
    //console.log(p);
    if(p.length==2){
        p=p[1];
    }else{
        p=url;
    }

    p=url.split("?");
    //console.log(p);

    if(p.length<2){
        params.anchor=p[0];
        return params;
    }

    params.anchor=p[0];
    p=p[1].split("&");

    for(var i=0; i< p.length; i++){
        var kv=p[i].split("=");
        console.log(kv);
        params[kv[0]]=kv[1];
    }
    return params;
}

var params=getUrlParams();
//console.log(params.id);

//创建路由函数
function route(m,container){
    container= container ||$("#share");
    $.ajax({
        url:"pages/"+m+".html",
        success:function(data){
            $(container).html(data);
            //加载模块对应的js
            loadJS(m);
        }
    })
}

function loadJS(mode){
	$.ajax({
		/*type:"get",*/
		url:"js/"+mode+".js",
		dataType:"script"
	});
}


$(function () {
	//判断访问次数，存储访问次数
	if(!localStorage.count){
		localStorage.count=0;
	}
	
	localStorage.count++;
	//打印访问次数
//	console.log(localStorage.count)
	//第一次访问，访问引导页
	if(localStorage.count==1){
		route("hello");
	}else{
		route("tab");
		route("audio","#global");
	}

//    loadJS("playSong");



})


"views/view2.html#/1?id=123&pow=456"