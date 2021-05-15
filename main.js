import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 elementUI
import elementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUI);

// 引入 高性能表格UI组件
import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css';
Vue.use(UmyUi);

// 引入 vk 实例
import vk from 'uni_modules/vk-unicloud';
Vue.use(vk);


// 初始化 vk框架
Vue.prototype.vk.init({
	Vue,               // Vue实例
	config,	           // 配置
});

// 引入 vkAdminUI 组件
import vkAdminUI from 'vk-unicloud-admin-ui';
import 'vk-unicloud-admin-ui/theme/index.css';

Vue.use(vkAdminUI);

// 引入自定义全局css样式
import '@/common/css/app.scss';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
