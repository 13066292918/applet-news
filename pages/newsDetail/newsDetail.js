Page({
  onLoad(op){
    const {id} = op
    this.getDetailData(id)
  },
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
})