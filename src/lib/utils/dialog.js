let dialog = {};

dialog.config = {
  cancelColor:'#888',
  confirmColor:'#3CC51F',
  title:'系统提示'
}

dialog.toast = (title, callfun = null, duration = 1000, mask = true, image = '', icon = 'none') => {
  uni.showToast({
    title: title,
    icon: icon,
    image: image,
    mask: mask,
    duration: duration
  });
  if (typeof (callfun) == 'function') {
    setTimeout(() => {
      callfun()
    }, duration)
  }
};

dialog.success = (title, callfun = null, duration = 1000) => {
  dialog.toast(title, callfun, duration, true, '/static/image/dialog_success.png')
};

dialog.error = (title, callfun = null, duration = 1000) => {
  dialog.toast(title, callfun, duration, true, '/static/image/dialog_fail.png')
};

dialog.warn = (title, callfun = null, duration = 1000) => {
  dialog.toast(title, callfun, duration, true, '/static/image/dialog_warn.png')
};

dialog.showLoading = (title = '加载中..', mask = true) => {
  uni.showLoading({
    title: title,
    mask: mask
  });
};

dialog.hideLoading = () => {
  uni.hideLoading();
};

///弹出框
dialog.alert = (opt) => {
  let def = {
    title: dialog.config.title,
    content:'',
    showCancel: false,
    cancelText: '取消',
    cancelColor: dialog.config.cancelColor,
    confirmText: '我知道了',
    confirmColor: dialog.config.confirmColor,
  }
  uni.showModal(Object.assign(def, opt));
};

///确认对话框
dialog.confirm = (opt) => {
  let def = {
    title: dialog.config.title,
    content:'',
    showCancel: true,
    cancelText: '取消',
    cancelColor: dialog.config.cancelColor,
    confirmText: '确定',
    confirmColor: dialog.config.confirmColor,
  }
  
  uni.showModal(Object.assign(def, opt));
};

//显示操作菜单
dialog.actionSheet = (opt) => {
  let def = {
    itemColor: "#000000"
  }
  uni.showActionSheet(Object.assign(def, opt));
};



export default dialog;