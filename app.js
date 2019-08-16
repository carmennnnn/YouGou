//app.js
// 导入
import request from "./utils/request.js"

App({
  //项目运行的时候触发,只会触发一次
  onLaunch(){
  //  初始化request基准路径
    request.defaults.baseURL ="https://api.zbztb.cn/api/public/v1",
    //传入一个函数,
    request.onError(res => {
      console.log(res)
    })
  },
  //全局
  globalData: {
  
  }
})