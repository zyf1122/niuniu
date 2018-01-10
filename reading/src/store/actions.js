import axios from 'axios';
import localEvent from './local'

export default {
	// 更改题号
	setItem({commit, state}){
		// 直接调mutations的方法
		commit('SUB_ITEM');
	},
	changFF({commit,state}){
		commit('CHANG')
	},
	// 导航条显示隐藏
	setNav({commit,state}){
		commit('NAV')
	},
	// 设置书本id
	setBook({commit,state},data){
		commit('BOOK',data)
	},
	// 设置书本章节
	setCatalog({commit,state},data){
		axios.get(`${state.api}/book?
			book=${localEvent.StorageGetter("book")}&id=${data}`).then
			(res => {
			commit('CATALOG',res);
			// console.log(localEvent.StorageGetter("book"));
		})
	},
	// 目录背景显示隐藏
	setBgCatalog({commit,state},data){
		commit('COLORBG',data)
	}
};