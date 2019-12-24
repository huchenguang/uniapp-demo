import Api from './api'
import Global from './global'

let api = Object.assign({},Api)
// 微信登陆
api.wxLogin = () => {
  return new Promise((resolve, reject)=>{
    uni.login({
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

//判断微信用户是否授权 
api.wxGetSetting = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: function(res) {
        let authSetting = res.authSetting
        resolve(authSetting);
      },
      fail: function(err) {
        resolve(err);
      },
    })
  })
}

// 获取用户信息
api.wxGetUserInfo = () => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      withCredentials: true,
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      },
    })
  })
}

api.queryNewsByCondition = (data) => {
  let url = '/api/News/queryNewsByCondition';
  return api.requestWithTicket(url, data, 'GET');
}

api.loginByJSCode = (data) => {
  let url = '/api/Member/loginByJSCode';
  return api.requestWithTicket(url, data, 'GET');
}

//获取用户手机号码
api.getUserPhoneByJSCode = data => {
  let url = '/api/Member/getUserPhoneByJSCode';
  return api.requestWithTicket(url, data, 'POST');
};

export default api;