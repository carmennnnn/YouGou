//发送请求
let request = function (config = {}) {

  //判断url是否有
  if (!config.url) {
    //抛出错误
    throw new Error("请输入url地址!");
    return;
  }

  //判断config.url开头是否包含http/https
  //search正则对象,判断字符串是否等于-1
  if (config.url.search(/^http/) === -1) {
    //拼接上baseURL

    config.url = request.defaults.baseURL + config.url;
  }
  // config.url = url.search(/^http+?/) > -1 ? config.url : request.defaults.baseURL + config.url;

  //返回Promise对象
  return new Promise((resolve, reject) => {
    //发送请求
    wx.request({
      ...config,
      //请求成功
      success(res) {
        resolve(res)
      },
      //请求失败
      fail() { },
      //后台接口可能会自定义错误,错误的处理函数放到complate来执行
      complete(res) {
        //循环调用错误的错误函数
        request.errors.forEach(fn => {
          //判断状态码
          if (res.statusCode == 400) {
            //弹窗
            wx.showModal({
              title: "提示",
              content: "请求失败了"
            })
          }
        })
      }
    })
  })
}
//设置默认属性
request.defaults = {
  baseURL: ""
}
//监听错误函数
request.errors = []
//拦截错误函数 onError
request.onError = function (callback) {
  //保存在错误函数中,请求时再同意调用
  request.errors.push(callback)
}
//向外暴露
export default request;