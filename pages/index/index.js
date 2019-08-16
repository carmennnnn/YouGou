//index.js
// 导入
import request from "../../utils/request.js"

Page({
  data:{
    autoplay:true,
    //轮播图数据
    imgUrls: [],
    //分类菜单数据
    category:[],
    //楼层图片数据
    floordata:[]
  },

   onLoad() {
    //请求轮播图接口
    request({
       url: "/home/swiperdata"
      }).then(res => {
      // 返回的数组
      const { message } = res.data;
      // 修改imgUrls
      this.setData({
        imgUrls: message
      })
    })
  
    //请求分类菜单接口
    request({
        url:"/home/catitems"
     }).then(res =>{
      const { message } = res.data;
      this.setData({
        category: message
      })
    })

    //请求楼层图片列表数据
    request({
      url:"/home/floordata"
     }).then(res=>{
      //  console.log(res)
      const { message } = res.data;
      this.setData({
        floordata: message
      })
    })
  }
})
