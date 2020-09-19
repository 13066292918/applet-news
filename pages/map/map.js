Page({
  data:{
    poinits:{
      latitude:23.099994,
      longitude: 113.324520
    },
    markers:[{
      iconPath:"/static/icon/map.png",
      id:0,
      latitude:23.099994,
      longitude:113.324520,
      width:50,
      height:50
    }]
  },
  onLoad(){
    this.getMap()
  },
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
  }
})