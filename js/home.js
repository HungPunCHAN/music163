
/*
 localStorage - 没有时间限制的数据存储  (缓存)
 */

//接口

 var server="http://musicapi.duapp.com/api.php";
//获取接口数据
function getPlayList(limit,callback){
	limit =limit || 6;
	
	if(checkCache()){
		//访问缓存
		callback(JSON.parse(localStorage.playlists));
		console.log("访问缓存");
	}else{
		//访问网络
		$.ajax({
			type:"get",
			//接口路径
			url:server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
	//		url:"api/playlist.json",
			async:true,
			success:function(data){
				if(data.code==200){
					//缓存
					localStorage.cacheTime=new Date().getTime();
					localStorage.playlists=JSON.stringify(data.playlists);

					//调用以参数传过来的函数
					callback(data.playlists);
				}
			}
		});
		console.log("访问网络");
	}
}


function checkCache(){
	//如果没有缓存，访问网络
	if(!localStorage.playlists){
		return false;
	}
	
	//如果缓存时间大于5秒，return false ，访问网络，刷新缓存
	if(new Date().getTime() - localStorage.cacheTime >=5*1000){
		return false;
	}
	return true;
}



(function(){
	//调用获取数据函数
	getPlayList(9,function(data){
		
		var songlist=$("#songlist");
		//生成歌单列表，插入到songlist。      
	//	console.log(data);
		var template=$("#template").html();
		for(var i=0; i<data.length; i++){
			var $template=$(template);
			var $cell=$(template).find(".cell");

			//console.log($cell.html());
			$template.find("a").attr({
				"href":"#detail?playlist="+data[i].id,
				"onclick":"route('detail')"
			});
			$template.find(".number").html(data[i].playCount);
			$template.find("img").attr("src",data[i].coverImgUrl);
			$template.find("p").html(data[i].name);
			$template.appendTo(songlist);
		}
	});
	

	
	
})();







