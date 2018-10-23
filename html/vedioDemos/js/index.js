require(['js/OCXComm'], function (RobotPlayer) {
  /**
   * 实现视频点播sdk-Demo
   * @author KLEN
   */
  var currentRobotID = -1;
  var channalLength = -1;
  var videoInstanceList = []; // player实例列表
  var videoPlayerUrlList = []; // 视频播放地址列表

  $(document).ready(function () {
    var ajaxParams = function (params) {
      var _default = {
        type: 'get',
        dataType: 'json',
        cache: false,
        timeout: 5000
      };
      return $.extend(true, {}, _default, params);
    }

    $.ajax(ajaxParams({
      url: '/api/robotservice/robot/searchRobotByParam.action'
    })).done(function (res) {
      if (res && res.total > 0) {
        handleRBList(res.rows)
        _listen();
      }
    }).fail(function (err) {
      console.log(err)
    })

    /**
     * 初始化下拉菜单
     * @param {Array} data 
     */
    function handleRBList(data) {
      if (typeof data == 'undefined') return;
      var online = ['<li class="dropdown-header">Online</li>'];
      var offline = ['<li class="divider"></li>', '<li class="dropdown-header">Offline</li>'];
      data.forEach(function (element) {
        var robotName = element.robotName;
        var deviceId = element.deviceId;
        if (element.onlineStatus === '在线') {
          if (currentRobotID < 0 && deviceId) {
            robotName && online.push('<li class="active"><a data-deviceId="' + deviceId + '" href="javascript:void(0)">' + robotName + '</a></li>')
            currentRobotID = deviceId
          } else {
            robotName && online.push('<li><a data-deviceId="' + deviceId + '" href="javascript:void(0)">' + robotName + '</a></li>')
          }
        } else if (element.onlineStatus === '离线') {
          robotName && offline.push('<li><a data-deviceId="' + deviceId + '" href="javascript:void(0)">' + robotName + '</a></li>')
        }
      });
      if (online.length === 1) {
        online.push('<li class="disabled"><a href="javascript:void(0)">没有在线的机器人</a></li>')
      } else {
        if (currentRobotID > 0)
          videoStart(currentRobotID)
      }
      document.querySelector('.RB_list .dropdown-menu').innerHTML = online.join('');
    }
    /**
     * 监听下拉菜单事件
     */
    function _listen() {
      $('.RB_list').on('click', '.dropdown-menu a', function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var ID = null;
        if (target.nodeName === 'A') {
          ID = target.dataset.deviceid;
          if (ID) {
            console.log(ID)
            var parentNode = target.parentNode;
            if (parentNode.classList.contains('active')) return;
            else {
              $(parentNode).addClass('active').siblings().removeClass('active');
              /* update current ID */
              videoStart(ID);
            }
          }
        }
      })
    }

    function videoStart(ID) {
      currentRobotID = ID;
      $.when(fetchDeviceChannel(ID))
        .then(function (data) {
          if (channalLength > 0) {
            clearVideoCache();
            handleVideo(data);
          }
        }, function () {
          alert('获取视频通道失败')
        })
    }

    /**
     * 获取机器人视频通道信息
     * @param {Number} ID 
     */
    function fetchDeviceChannel(ID) {
      var dtd = $.Deferred();

      if (typeof ID === 'undefined') {
        dtd.reject();
      }
      $.ajax(ajaxParams({
        url: '/api/robotservice/robot/getDeviceChannels.action',
        data: {
          deviceId: ID
        }
      })).done(function (res) {
        if (!Array.isArray(res) && res.length < 1) {
          dtd.reject(err);
        } else {
          handleDeviceChannel(res)
          dtd.resolve(res);
        }
      }).fail(function (err) {
        dtd.reject(err);
      })

      return dtd;
    }
    /**
     * 处理视频通道信息
     * @param {Array} channals 
     */
    function handleDeviceChannel(channals) {
      // 确定有多少个通道
      channalLength = channals.length;
      var temp = [];
      channals.forEach(function (item) {
        var imgUrl = item.camIconUrl;
        var name = item.name;
        var channelId = item.channelId;
        var _html = '<li><span class="channel-img__tag"><img src="' + imgUrl + '" alt="视频缩略图"></span><div class="channel-desc"><p class="channelId">通道ID：<em>' + channelId + '</em></p><p class="name">名称： <em>' + name + '</em></p></div></li>';
        temp.push(_html);
      })

      if (temp.length > 0) {
        document.getElementsByClassName('list-channel')[0].innerHTML = temp.join('');
      }
    }
    /**
     * 根据视频通道实木渲染视频
     * @param {Array} arr 
     */
    function handleVideo(arr) {
      if (typeof arr === 'undefined') return;

      var temp = [];
      var dtd_list = [];

      arr.forEach(function (item, i) {
        var name = item.name;
        var channelId = item.channelId;
        var _html = '<div class="grid-box grid-box__' + channelId + '"><span class="label label-default video-label">' + name + '</span><div class="grid-box__content"></div></div>'
        temp.push(_html);

        dtd_list.push(fetchVideoUrl({ channelId: channelId, clientIp: currentRobotID }));
      })

      // setTimeout(function () {
        $.when.apply(null, dtd_list)
          .then(function () {
            var videoPlayerUrlList = Array.apply(null, arguments);
            console.log(videoPlayerUrlList)

            // 创建实例
            try {
              videoPlayerUrlList.forEach(function (item, index) {
                var cameraid = item.cameraid;
                var url = item.url;
  
                var selector = '.grid-box.grid-box__' + cameraid + ' .grid-box__content';
                var player = videoInstanceList[index] = getPlayerInstance(selector);
  
                player && player.launch();
  
                if (index === 0) {
                  if (!player.isIE()) {
                    setTimeout(function () {
                      alert('请选择IE浏览器查看实时视频！');
                    }, 0)
                    return;
                  }
  
                  if (!player.hasOcx) {
                    setTimeout(function () {
                      alert('请安装播放视频的控件');
                    }, 0)
                    return;
                  }
  
                  var version = player.getVersion();
                  console.log(version)
                  var flag = false
                  $.when(fetchVersion({ clientType: 'ocx' }))
                    .then(function(res) {
                      console.log('version', res)
                      if (res.ver !== version) {
                        alert("请安装播放视频的控件");
                        flag = true;
                      }
                    })
                  if (flag) {
                    throw new Error('请安装播放视频的控件')
                  }
                }
                
                console.log(videoInstanceList)
                setTimeout(function() {
                  player.openVideo(url);
                }, 0)
              })
            } catch(err) {
              console.log(err)
            }
          })
      // }, 0)


      if (temp.length > 0) {
        document.getElementsByClassName('grid')[0].innerHTML = temp.join('');
      }
    }

    /**
     * 获取根据 container 创建视频实例
     * @param {String} container Jquery 选择器
     */
    function getPlayerInstance(container) {
      var ocxID = 'ocx_s';
      var container = container; //playOcxContent
      var CLASSID = "clsid:68749C51-DB87-46CA-9E78-AFFC38856C5A";

      var ocxPlayer = $(container).data('ocxPlayer');

      if (ocxPlayer) return ocxPlayer;

      ocxPlayer = new RobotPlayer(ocxID, container, CLASSID);
      $(container).data('ocxPlayer', ocxPlayer);

      return ocxPlayer;
    }

    /**
     * 清空video播放的列表
     */
    function clearVideoCache() {
      if (!videoInstanceList || videoInstanceList.length < 1) return;

      videoInstanceList.forEach(function (item) {
        item && item.closeVideo();
      })

      videoInstanceList = [];
      $('.grid').html('');
    }

    function fetchVideoUrl(params) {
      var dtd = $.Deferred();

      $.ajax(ajaxParams({
        url: '/api/robotservice/robot/getVideoUrl.action',
        data: params
      })).done(function (res) {
        dtd.resolve(res)
      }).fail(function (err) {
        dtd.reject(err);
      })

      return dtd;
    }

    function fetchVersion(params) {
      var dtd = $.Deferred();

      $.ajax(ajaxParams({
        url: '/api/robotservice/systemMgr/getAPPVersion.action',
        data: params
      })).done(function (res) {
        dtd.resolve(res)
      }).fail(function (err) {
        dtd.reject(err);
      })

      return dtd;
    }

  })
})
