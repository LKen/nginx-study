/**
 * 视频播放模块
 * @author whh
 */
define(['OCXComm'], function(RobotPlayer) {

    var ocxPlayer = null;

    /**
     * 基础函数
     */
    var base = {
        /**
         * $.ajax 默认参数
         */
        ajaxParam: function(data, url) {
            var param = {
                dataType: 'json',
                type: 'post',
                data: data,
                url: url
            };
            return param;
        }
    }


    /**
     * 视频模块
     */
    var video = {
        init: function(robotId) {
            this._getchannel(robotId);
            this._listener();
        },
        _listener: function() {

            var that = this;
 

            //移除视频弹窗
            $("#removePlay").on("click", function() {
                $("#smallWin").empty();
                video._closeVideo();
            });

            //根据通道切换视频
            $("#smallWin").on('click', '.play-channel>ul>li', function() {
                $(".channelName").html($(this).attr("data-name"));
                var channel = $(this).attr("id");
                video.playByChannel(channel);
            });

        },
        _getchannel: function(robotId) {

            var that = this;

           /* $("#smallWin").empty();
            $("#smallWin").css({
                left: 0,
                bottom: 0
            });
            var ele = $("#playContainer").clone(true).appendTo("#smallWin").end();
            ele.show();
            ele.find(".play-content").attr("id", "playContent");
            ele.find(".channelName").attr("id", "channelName");*/

            var url = "http://192.168.41.250:8080/robotservice/robot/getDeviceChannels.action",
                data = { deviceId: robotId };

            $.ajax(base.ajaxParam(data, url)).done(function(data) { //根据机器人ID获取通道

                /*ele.find("#channelName").html(data[0].name);
                ele.find(".play-channel").append(that._getIframeLayer());
                $.each(data, function(i, item) {
                    var temp = '<li id="' + item.channelId + '" data-name="' + item.name + '"> <img src="' + item.camIconUrl + '" onerror="onerror=null;src=\'' + contextPath + '/resources/images/defaultimg/defautCamera.png\'"/>' +
                        '<div class="channel-name">' + item.name + '</div></li>';

                    ele.find(".play-channel ul").append(temp);
                });
                var channelId = data[0].channelId;*/

                that.playByChannel(channelId);

            });
        },
        playByChannel: function(channelId) { //根据通道获取视频流地址
            var that = this;
            var playUrl = "http://192.168.41.250:8080/robotservice/robot/getVideoUrl.action",
                param = { channelId: channelId, clientIp: '' };
            $.ajax(base.ajaxParam(param, playUrl)).done(function(data) {
                video._closeVideo();
                video._playVideo(data.url);
            }).fail(function() {
                video._closeVideo();
            });
        },
        _playVideo: function(url) {
            var that = this;
            var player = this._getOcxPlayer();
            that._initOcxPlayer();

            //验证浏览器和版本
            if (!player.isIE()) {
                console.log('请选择IE浏览器查看实时视频！');
                $("#smallWin").empty(); //清空容器
                return;
            }
            if (!player.hasOcx) {
                console.log("请安装播放视频的控件");
                $("#smallWin").empty(); //清空容器
                return;
            }
            var version = player.getVersion();
            //播放 
            if (player && url) {
                setTimeout(function() {
                    player.openVideo(url);
                }, 0);
            }
            var getversionUrl = runSitUrl.getversionUrl,
                param = { clientType: 'ocx' };
            $.ajax(base.ajaxParam(param, getversionUrl)).done(function(data) {
                if (data.ver == version) {
                    //播放 
                    //if(player && url){
                    //	setTimeout(function(){
                    //		player.openVideo(url);
                    //	},0)
                    //}
                } else {
                    console.log("请安装播放视频的控件");
                    $("#smallWin").empty(); //清空容器
                }
            });


        },
        _getOcxPlayer: function() {
            var ocxID = 'ocx_s';
            var playerWrap = "#playContent"; //playOcxContent
            var CLASSID = "clsid:68749C51-DB87-46CA-9E78-AFFC38856C5A";
            if (ocxPlayer) return ocxPlayer;

            ocxPlayer = new RobotPlayer(ocxID, playerWrap, CLASSID);
            return ocxPlayer;
        },
        _initOcxPlayer: function() {
            var player = this._getOcxPlayer();
            if (!player) return;
            player.launch();
        },
        _closeVideo: function() {
            var player = this._getOcxPlayer();
            player && player.closeVideo();
        },
        _getIframeLayer: function() {
            return '<iframe src="about:blank" frameborder="0" scrolling="no" style="z-index: -1; border: none; padding: 0; margin: 0; position: absolute; width: 100%; height: 100%; visibility: inherit; top: 0; left: 0;"></iframe>';
        }
    };


    return {
        video: video
    }

})