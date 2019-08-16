// 导入
import request from "../../utils/request.js"
// pages/category/index.js
Page({
  data: {
    //侧菜单栏数据
    navs:[],
    //索引
    current:0
  },

  //菜单栏点击时候触发
  handleChange(event){
    // console.log(event)
    const { index } = event.currentTarget.dataset;
    this.setData({
      current : index
    })
  },

  onLoad(){
    //请求分类的总数据
    request({
      url:"/categories"
    }).then(res=>{
      const { message } = res.data;
      this.setData({
        navs: message
      })
    })
  }
})