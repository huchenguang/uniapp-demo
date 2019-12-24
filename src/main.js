import Vue from 'vue'
import App from './App'
import Mixin from './lib/utils/mixin'
import Server from './server_config'
import Global from './lib/utils/global'
import DTApi from './lib/utils/DTApi'
import Mpi from './lib/utils/mpi'
import Dialog from './lib/utils/dialog'
import DtEmpty from './lib/comps/dt_empty'
import DtNoMore from './lib/comps/dt_no_more'
import './lib/css/app.scss'

Vue.config.productionTip = false

App.mpType = 'app'

//设置服务器
Global.server = Server

// 全局注入
Vue.mixin(Mixin)

// 自定义组件全局注册
Vue.component('DtEmpty', DtEmpty)
Vue.component('DtNoMore', DtNoMore)

/**
 * 设置全局的原型属性
 */
//小程序类库
Vue.prototype.$mpi = Mpi
Vue.prototype.$api = DTApi
Vue.prototype.$dialog = Dialog

const app = new Vue({
  ...App
})
app.$mount()
