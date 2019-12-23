import Vue from 'vue'
import App from './App'
import Mixin from '../lib/utils/mixin'
import Mpi from '../lib/utils/mpi'
import DtEmpty from '../lib/comps/dt_empty'
import DtNoMore from '../lib/comps/dt_no_more'

Vue.config.productionTip = false

App.mpType = 'app'

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

const app = new Vue({
  ...App
})
app.$mount()
