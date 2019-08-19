// pages/search/index.js
// 导入
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //索引
    current:0,
    //商品列表数据
    goods:[],
    //页数
    pagenum:1,
    //条数
    pagesize:10,
    //假设搜索的关键字
    keyword:""
  },

  hadleChange(event){
    const { index } = event.currentTarget.dataset
    this.setData({
      current : index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options:等于this.$router.query,获取url的参数

    // let keyword = options.keyword
    this.setData({
      keyword : options.keyword
    })
    //调用接口
    this.getGoodsList()
  },
 
  // 页面上拉/触底事件的处理函数
  onReachBottom() {
    //没有更多，直接返回
    // if (!this.data.hasMore){
    //   return;
    // }
    this.setData({
      pagenum: this.data.pagenum + 1 
    })
    this.getGoodsList()
  },
 //封装请求
  getGoodsList(){
    const { keyword, pagenum, pagesize } = this.data

    //请求商品列表数据
    request({
      url: "/goods/search",
      data: {
        query: keyword,
        pagenum,
        pagesize
      }
    }).then(res => {
      const { goods } = res.data.message

      //循环商品列表,给商品价格添加两个小数点,返回一个新数组
      const newgoods = goods.map(v =>{
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v;
      })

      this.setData({
        //下拉时,追加新的数据
        goods : [...this.data.goods, ...newgoods]
      })

      //判断商品数据的长度,是否小于条数  ?
      if (goods.length < this.data.pagesize){
        this.setData({
          hasMore: false
        })
      }
 
    })
  }
 
  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

      //触发下拉刷新时执行
      // setTimeout(function(){
      //   wx.stopPullDownRefresh()
      // },3000)
  // },

  
  
})