
//接口
//var server="api/playlist.json";
var server="http://musicapi.duapp.com/api.php";
//获取接口数据

//"http://musicapi.duapp.com/api.php?type=topPlayList&cat=全部&offset=12&limit=6"
function getPlayList(limit,callback){
	limit =limit || 6;
	//checkCache()函数return true访问缓存，return false访问网络
	if(checkCache()){
		//访问缓存
		callback(JSON.parse(localStorage.playlists));
		console.log("访问缓存");
	}else{
		//访问网络
		$.ajax({
			type:"get",
			//接口路径
			url:server+"?type=topPlayList&cat=全部&offset="+12+"&limit="+limit,
			success:function(data){
				if(data.code==200){
					//缓存
					localStorage.cacheTime=new Date().getTime();
				//	data.playlists.cacheTime=new Date().getTime();
					localStorage.playlists=JSON.stringify(data.playlists);
					
					//调用以参数传过来的函数
					callback(data.playlists);
				}
			}
		})
		console.log("访问网络");
	}
}

/*function checkCache(){
	//如果没有缓存，访问网络
	if(!localStorage.playlists){
		return false;
	}
	//如果缓存时间大于5秒，return false ，访问网络，刷新缓存
	if(new Date().getTime()-JSON.parse(localStorage.playlists).cacheTime >= 5*1000){
		return false;
	}

	return true;
}*/

function checkCache(){
	//如果没有缓存，访问网络
	if(!localStorage.playlists){
		return false;
	}

	//如果缓存时间大于5秒，return false ，访问网络，刷新缓存
	if(new Date().getTime() - localStorage.cacheTime >=3*1000){
		return false;
	}

	return true;
}

(function(){
	var musicListId=[];
	//添加歌单
	function addMusicList(){
	//调用获取数据函数
		getPlayList(12,function(data){
			//要插入内容的id
			var detailList=$("#detailList");
			//生成歌单列表，插入到songlist。   
			var detail=$("#detailLi").html();
			for(var i=0; i<data.length; i++){

				musicListId.push(data[i].id);

				var $detail=$(detail);

				$detail.find("a").attr({
					"href":"#detail?playlist="+data[i].id,
					"onclick":"route('detail')"
				});
				$detail.find(".count").html(data[i].playCount);
				$detail.find("img").attr("src",data[i].coverImgUrl);
				$detail.find(".detail-name").html(data[i].name);
				$detail.appendTo(detailList);			
			}

			console.log(musicListId);
		});
		
	}
	
	addMusicList();
	
	

	//窗口滚动继续加载歌单
/*	$(window).on("scroll",function(ev){
		ev=ev||event;
		var detailList=$("#detailList")

		if($(window).scrollTop()>= $("#detailList").height()-200){
				addMusicList();
		}  	
	})*/
	
})();





