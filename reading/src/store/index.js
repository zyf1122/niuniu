import Vue from 'vue';
import Vuex from 'vuex';

// 引入其他的js文件
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';
import local from './local.js';

Vue.use(Vuex);

let state = {
  api: 'http://39.108.14.248:3333',
  // 目录显示隐藏
  subjectItem:"catalog1",
  // 题目内容(数组嵌套json)
  subjectDetail:"",
  // 导航条显示隐藏
  navbol:false,
  // 书本目录id
  book:1,
  // 章节标题
  catalogtop:'',
  // 章节内容
  catalog:[],
  // 目录背景显示隐藏
  bgcatalog:"colorhidden"
}
// 导出去
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  local
});



