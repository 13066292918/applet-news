//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    TabCur: 0,
    scrollLeft:0,
    navList:[],
  },
  tabSelect(e) {
    const { index,channelid,title } = e.currentTarget.dataset
    this.setData({
      TabCur: index,
      scrollLeft: (index-1)*60
    })
    this.getNewList(title)
  },
  onLoad(){
    this.alignPostion(),
    this.getNavList(),
    this.getNewList()
  },
  alignPostion(){
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
  },
  getNavList(){
    const _this = this
    wx.request({
      url: 'https://www.h5sm.com/wx/news/channel',
      method:'POST',
      success(res){
        if( res.statusCode == 200){
          const {channelList} = res.data.showapi_res_body
          _this.setData({
            navList:channelList
          })
        }
      }
    })
  },
  getNewList(title='国际焦点'){
    const _this = this
    wx.request({
      url: 'https://www.h5sm.com/wx/news/channelNewList',
      method:'POST',
      data:{
        title,
        maxResult:10,
        needAllList:0
      },
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      success(res){
        const {contentlist} = res.data.showapi_res_body.pagebean
        _this.setData({
          contentlist
        })
      }
    })
  },
  getGoToNewsDetailPage(e){
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id='+id
    })
  },
  onPullDownRefresh(){
    wx.showLoading({
      title: '正在刷新',
    })
    this.setData({
      mtop:this.mtop + 20  
    })

    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        mtop:this.mtop - 20 
      })
    }, 2000);
  },
  onReachBottom(){
    
  }
})


