仿新闻主页面和新闻详情页,并获取用户信息和地理位置  

主要仿新闻的主页,在主页中点击新闻会弹出新闻详情
alignPostion(){//获取头部标签的高度
    const _this = this
    const  {top,height} = wx.getMenuButtonBoundingClientRect()
    const query = wx.createSelectorQuery()
    query.select('.search').boundingClientRect(rect=>{
      let capsule = top + height/2 - rect.height/2
      _this.setData({
        capsule
      })
    }).exec()
    query.select('.hdSearh').boundingClientRect(rect=>{
      let mtop = top/2 + rect.height*2
      _this.setData({
        mtop
      })
    }).exec()
  }

 ![image](https://github.com/13066292918/applet-news/blob/master/describe/001.png)
 ![image](https://github.com/13066292918/applet-news/blob/master/describe/002.png)
 
 
 


点击下方中间的选项,会获取用户的位置信息,并显示出位置(会提示用户授权)
 getMap(){
    const _this = this
    wx.getLocation({
      type: 'gcj02',
      altitude:true,
      success(res){
        let {latitude,longitude} = res
        _this.setData({
          poinits:{
            latitude,
            longitude
          },
          markers:[{
            iconPath:"/static/icon/map.png",
            id:0,
            latitude,
            longitude,
            width:50,
            height:50
          }]
        })
      }
    })

 ![image](https://github.com/13066292918/applet-news/blob/master/describe/003.png)
 ![image](https://github.com/13066292918/applet-news/blob/master/describe/004.png)
 
 
 
 
 点击右下角的选项,切换到用户信息页面,点击授权登录,提示用户授权之后,显示用户的头像和名称
  getDetailData(id){
    const _this = this
    wx.request({
      url: 'https://www.h5sm.com/wx/news/channelNewList',
      method:'POST',
      data:{
        id,
        needAllList:1
      },
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res){
        const {contentlist} = res.data.showapi_res_body.pagebean
        _this.setData({
          content:contentlist[0]
        })
      }
    })
  }
 
 ![image](https://github.com/13066292918/applet-news/blob/master/describe/005.png)
 ![image](https://github.com/13066292918/applet-news/blob/master/describe/006.png)
 ![image](https://github.com/13066292918/applet-news/blob/master/describe/008.png)
