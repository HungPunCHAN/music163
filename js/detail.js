


(function(){
	
	function getPlayList(id,callback){
		
		$.ajax({
			type:"get",
	//		url:"api/detail.json";
			url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
			async:true,
			success:function(data){
				if(data.code==200){
					callback(data.playlist);
					console.log(data.playlist);
				}
			}
			
		})
	}
	
	var p=getUrlParams();
	console.log(p);



	getPlayList(p.playlist,function(data){
		
		//获取歌单
		var playInfo=$(".playlist-info");
		playInfo.find(".backImg").css("background-image","url("+data.creator.backgroundUrl+")");
		$(".info-gallery").find(".span").find("span").html(data.playCount);
		
		$(".info-gallery").find("img").attr("src",data.creator.backgroundUrl);
		
		$(".info-title").find(".title").html(data.creator.signature);
		$(".info-title").find(".avatarUrl").attr("src",data.creator.avatarUrl);
		$(".info-title").find(".nick").html(data.creator.nickname);
		
		
		//要插入内容的id
		var muList=$("#muList");
		//获取内容
		var muBox=$("#muBox").html();
		//循环生成歌曲列表
		//console.log(data);
		for(var i=0; i<data.tracks.length; i++){
			var music=data.tracks[i];
			
			var $muBox=$(muBox);

			$muBox.find(".mu-item-number").html(i+1);
			$muBox.find(".mu-item-song").html(music.name);
			$muBox.find(".mu-item-singer").html(music.ar[0].name);
			$muBox.appendTo(muList);
			
			//点击歌曲时调用播放方法
			$muBox.data("music",music).click(function(){

				var m=$(this).data("music");
				console.log($(this).data("music"));
				audioController.play(m);
			})
		}
	});




})();


