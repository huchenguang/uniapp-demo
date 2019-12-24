import Global from './global'
import Cache from './cache'
import Dialog from './dialog'

//缓存key
let _ticketKey = 'ticket'
let _ticketTimeKey = 'ticket.time'

//加载器文本
let _loadingTextDefault = '加载中..'

let api = {}

//获取票据
let ticketId = (data, callfun) => {
  // 判断是否已近有Ticket
  let ticket = Cache.get(_ticketKey)
  var laststamp = Cache.get(_ticketTimeKey)
  var newstamp = Date.parse(new Date()) / 1000;
  var overtime = 19 * 60;
  if (ticket && ticket != '' && (newstamp - laststamp) <= overtime) {
    if (typeof (callfun) == 'function') {
      callfun(ticket)
    }
  } else {
    //缓存不存在，过期都需要重新请求
    api.getTicketId(data).then(res => {
      updateTicketIdTime(res.TicketID)
      if (typeof (callfun) == 'function') {
        ticket = Cache.get(_ticketKey)
        callfun(ticket)
      }
    }).catch((err)=>{
      callfun && callfun(null,err)
    })
  }
}

//更新票据时间
let updateTicketIdTime = (TicketID) => {
  if (TicketID != '') {
    //保存票号ID到缓存里
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    // var gg = this.qian(timestamp, tik);//签名暂时用1来顶替
    var result = TicketID + "|dreamstech|" + timestamp;

    // 缓存Ticket
    Cache.set(_ticketTimeKey, timestamp)
    Cache.set(_ticketKey, result)
  }
}

//清除票据
let clearTicketIdTime = () => {
  Cache.remove(_ticketTimeKey)
  Cache.remove(_ticketKey, timestamp)
}

/**
 * 发起 HTTPS 网络请求
 * @param  {String} url         服务器接口地址
 * @param  {Object} data        请求的参数
 * @param  {String} method      HTTP 请求方法
 * @param  {String} dataType    返回的数据格式
 * @param  {String} header 设置请求的header content-type:'application/x-www-form-urlencoded;charset=UTF-8'
 * @return {[Promise]}          
 */
api.request = (url, data, method = 'GET', dataType = 'json', header = null) => {

  //设置请求头
  header = header || {}
  header['Content-Type'] = 'application/json;charset=UTF-8'

  //设置请求参数
  data = data || {}
  data.sys_info_id = Global.server.sysInfoId
  data.shop_id = Global.server.shopId

  //是否显示加载器
  let isShowLoading = data._isShowLoading || false
  let loadingText = data._loadingText || _loadingTextDefault
  let isReject = data._isReject || false
  let isNoShowErr=data.isNoShowErr || false
  //显示加载器
  if (isShowLoading) {
    isShowLoading = true
    Dialog.showLoading(loadingText)
  }

  //删除字段
  if(url.indexOf('/api/Ticket/GetDefaultTicketID') !== 0) {
    delete data._isShowLoading
    delete data._loadingText
    delete data._isReject
    delete data.isNoShowErr
  }

  return new Promise((resolve, reject) => {

    //请求http
    uni.request({
      header: header,
      url: Global.server.apiUrl + url,
      data: data,
      dataType: dataType,
      responseType: 'text',
      method: method,
      success: function (res) {
        if (res.statusCode == 200 && res.errMsg == 'request:ok') {
          if (res.data.result) {
            updateTicketIdTime(res.data.newticketid)
            resolve(res.data.data)
          } else {
            if (res.errorcode == 100002) {
              clearTicketIdTime()
            } else {
              if (isReject) {
                reject(res.data)
              } else {
                if(!isNoShowErr){
                  Dialog.alert({
                    content: res.data.errormsg || '服务繁忙，请稍后再试...'
                  })
                }
                console.warn('result false', res)
              }
            }
          }
        } else {
          let msg = res.data.MessageDetail || res.data.Message ||res.statusCode || '系统繁忙，请稍后再试...'
          if(!isNoShowErr){
            Dialog.alert({
              content: msg+''
            })
          }
          console.warn(res)
        }
      },
      fail: function (res) {
        console.error(res)
      },
      complete: function () {
        uni.stopPullDownRefresh()
        if (isShowLoading) {
          Dialog.hideLoading()
        }
      }
    })
  })
}

//请求附带票据
api.requestWithTicket = (url, data, method = 'GET', dataType = 'json', header = null) => {
  return new Promise((resolve, reject) => {
    ticketId(data, (ticket,err) => {
      if(ticket){
        header = header || {}
        header['X-AUTH-HEADER'] = ticket // 携带令牌去访问服务器
        api.request(url, data, method, dataType, header).then(resolve).catch(reject)
      }else{
        reject(err)
      }
    })
  })
}

//获取票据
api.getTicketId = (data) => {
  let url = '/api/Ticket/GetDefaultTicketID?appkey=' + Global.server.appkey + '&appSecret=' + Global.server.appSecret + '&sysInfoID=' + Global.server.sysInfoId
  return api.request(url, data)
}

//上传图片(多张)
api.uploadImg = (urlInfo, pic_title, pic_bus_type, data={}) => {
  Dialog.showLoading("上传中")
  return new Promise((resolve, reject) => {
    ticketId(data,(ticket,err) => {
      if(ticket){
        let header = {}
        header['X-AUTH-HEADER'] = ticket // 携带令牌去访问服务器
        header['content-type'] = 'multipart/form-data;'
        uni.uploadFile({
          url: Global.server.apiUrl + '/picture/upload',
          filePath: urlInfo,
          header: header,
          async: false,
          name: urlInfo,
          formData: {
            'pic_title': pic_title,
            'pic_bus_type': pic_bus_type
          },
          success: (res) => {
            resolve(JSON.parse(res.data).data)
          },
          fail: () => {
            resolve(false)
          },
          complete: () => {
            uni.stopPullDownRefresh()
            Dialog.hideLoading()
          }
        })
      }else{
        console.log('upload fail:',err)
        Dialog.hideLoading()
        reject(err)
      }
    })
  })
}

//添加访问记录
api.AddAccessRecord=(data)=>{
  data.isNoShowErr=true;
  let url='/api/access/AddAccessRecord';
  return api.requestWithTicket(url, data, 'POST')
}


export default api