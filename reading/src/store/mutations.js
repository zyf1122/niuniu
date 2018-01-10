const SUB_ITEM = "SUB_ITEM";
const CHANG="CHANG";
const BOOK="BOOK";
const CATALOG='CATALOG';
const NAV='NAV';
const COLORBG='COLORBG';

export default {
	// 这个函数名是"SUB_ITEM"
	[SUB_ITEM] (state) {
		state.subjectItem="";
		// console.log("aa")
	},
	// 导航条显示隐藏
	[NAV](state){
		state.navbol=!state.navbol;
	},
	[CHANG](state){
		state.subjectItem="catalog1"
	},
	[BOOK](state,data){
		state.book=data;
	},
	[CATALOG](state,res){
		state.catalog=res.data.content.split('-');
		state.catalogtop=res.data.title;
		// console.log(res)
	},
	// 目录显示隐藏
	[COLORBG](state,data){
		state.bgcatalog=data;
	}
};