// pages/goods_detail/index.js
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options

    //请求商品详情数据
    request({
      url:"/goods/detail",
      data:{
        goods_id : id
      }
    }).then(res=>{
      const { message } = res.data
      this.setData({
        detail: message
      })
    })
  }
})