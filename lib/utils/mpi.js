//小程序类库
let mpi = {}

mpi.setNavigationBarTitle = (options) => {
  if (!options.title) {
    console.warn("title is " + typeof options.title)
    return
  }
  uni.setNavigationBarTitle(options)
}

//获取系统信息
mpi.getSystemInfoSync = () => {
  return uni.getSystemInfoSync()
}

//登录凭证
mpi.login = (data) => {
  data = data || {}
  data.timeout = data.timeout || 5000
  return new Promise((resolve, reject) => {
    uni.login({
      timeout: data.timeout,
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        resolve(err)
      }
    })
  })
}

//获取定位
mpi.getLocation = () => {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: "gcj02",
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        resolve(err)
      }
    })
  })
}

//保留当前页面，跳转到应用内的某个页面。
mpi.navigateTo = (data) => {
  uni.navigateTo(data)
}

//关闭当前页面，跳转到应用内的某个页面
mpi.redirectTo = (data) => {
  uni.redirectTo(data)
}
//关闭当前页面，返回上一页面或多级页面
mpi.navigateBack = (delta) => {
  uni.navigateBack({
    delta: delta
  })
}
//关闭所有页面，打开到应用内的某个页面
mpi.reLaunch = (url) => {
  uni.reLaunch({
    url: url
  })
}

//创建并返回 map 上下文 mapContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 <map> 组件。
mpi.createMapContext = (mapId) => {
  return uni.createMapContext(mapId)
}

//获取当前地图中心的经纬度，返回的是 gcj02 坐标系
mpi.getCenterLocation = (ctx) => {
  return new Promise((resolve, reject) => {
    ctx.getCenterLocation({
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        resolve(err)
      }
    })
  })
}

//更新管理
mpi.getUpdateManager = () => {
  return uni.getUpdateManager()
}

export default mpi