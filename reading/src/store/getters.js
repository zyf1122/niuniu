export default {
	// 目录显示隐藏
	getSubjectItem (state) {
		// return "第"+state.subjectItem+"道题目";
		return state.subjectItem;
	},
	// 获取题目内容方法
	getSubjectDetails (state) {
		return state.subjectDetail;
	},
	// 导航条显示隐藏
	getNav(state){
		return state.navbol;
	},
	// 目录列表
	getBook(state){
		return state.book;
	},
	// 获取章节标题
	getCatalogTop(state){
		return state.catalogtop;
	},
	// 获取内容
	getCatalog(state){
		return state.catalog;
	},
	// 目录背景显示隐藏
	getBgCatalog(state){
		return state.bgcatalog;
	}
};