/**
 * Created by Administrator on 2017/3/26.
 */

var audioController={
//	server:"api/song.json",
	server:"https://api.imjad.cn/cloudmusic",
	//获取歌曲
	play:function(music){
        $.ajax({
            type:"get",
            //https://api.imjad.cn/cloudmusic/
            url:this.server+"?type=song&id="+music.id+"&br=128000",
            async:true,
            success:function(data){
                if(data.code==200){
                    var audio=$("#audioPlay").get(0);
                    audio.src=data.data[0].url;
                    audio.play();
                    /*on_the_go.push(data.data[0].url);*/
                }
            }
        });
        //载入歌曲名字和歌手
        $("#songInfo").find(".song-name").html(music.name);
        $("#songInfo").find(".singer").html(music.ar[0].name);		
        $("#songInfo").find(".song-pic").find("img").attr("src",music.al.picUrl);
	}
};

(function(){

})();



