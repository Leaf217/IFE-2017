// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app2',
  data: {
    message: 'aaaaaaaaa'
  }
})
new Vue({
  el: '#app-3',
  data: {
    seen: false
  }
})
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
app4.todos.push({ text: '新项目' })
