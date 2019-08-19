// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索栏输入的值
    searchVal:"",
    //本地的历史记录
    history:[]
  },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  onLoad: function (options) {
      //使用API存储数据
      //获取本地的历史记录
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html
    var history = wx.getStorageSync('history' || [])
    this.setData({
      history
    })
  },

  //监听输入值的事件,每次输入值都会触发
  handleInput(event){
    // console.log(event)
    const { value } = event.detail
    // 把输入框的值保存到data
    this.setData({
      searchVal : value
    })
  },
  
  //监听取消事件
  handleCancel(){
    this.setData({
      searchVal:""
    })
  },

  // 按钮确定按钮时候，跳转到搜索列表页，触发`bindconfirm`事件，注意跳转时候带上输入框的值。
  handleConfirm(){
    // 输入框点击确定（enter）按钮时候触发，手机上右下角的键
    // console.log(event)
    // 跳转到搜索列表页
    // 类似vue中this.$router.push()
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
    // navigateTo
    wx.navigateTo({
      url: "/pages/search/index?keyword=" + this.data.searchVal
    })

    //保存新的搜索关键词前,把关键词添加到历史记录
    const arr = [this.data.searchVal, ...this.data.history]
    //合并历史记录重叠的关键词,去重数组
    this.setData({
      history:[...new Set(arr)]
    })

    //把搜索关键字保存到本地
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html
    wx.setStorageSync('history', this.data.history)
  },


 //
  handleClearAll(){
    wx.clearStorageSync()
    this.setData({
      history:""
    })
  }
  

})