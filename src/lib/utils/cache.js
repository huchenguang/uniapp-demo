//前缀
let _prefix = 'dt.c.'
let _getPre = (key) => {
  return _prefix + cache.preKey + key
}

///缓存
let cache = {
  ///键前缀
  preKey: '',
  ///设置
  set: (key, value) => {
    uni.setStorageSync(_getPre(key), value)
  },
  ///获取
  get: (key) => {
    return uni.getStorageSync(_getPre(key))
  },
  ///移除
  remove: (key) => {
    uni.removeStorageSync(_getPre(key))
  },
  ///清除
  clear: () => {
    uni.clearStorageSync()
  },
  ///设置属性
  defineProperty: (obj, key) => {
    let _sf = cache
    let _ck = key
    Object.defineProperty(obj, key, {
      get: function () {
        return _sf.get(_ck)
      },
      set: function (n) {
        _sf.set(_ck, n)
      }
    })
  }
}

export default cache