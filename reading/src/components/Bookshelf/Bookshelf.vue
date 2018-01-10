<template>
<div class="bookshelf">
	<div class="bgs"></div>
	<div class="top">
		<img @click="backFn" src="../../assets/image/back2.png" alt="">
		<p>
			<span :class="bgcolor" @click="bookshelfFn">我的书架</span>
			<span :class="bgcolor1" @click="readlyFn">最近阅读</span>
		</p>
		<img @click="searchFn" src="../../assets/image/search2.png" alt="">
		<img @click="moresFn" src="../../assets/image/more1.png" alt="">
	</div>
	<div class="eadit">
		<span>{{shelf ? "默认书架" : "最近阅读"}}</span>
		<span @click="eaditFn">编辑</span>
	</div>
	<ul>
		<li v-for="(item,index) in booklist" @click="readingFn(index)">
			<img v-show="show" @click.stop="seletFn(index)" class="ig1" v-bind:src="select[index]==false ? src[0] : src[1]">
			<img class="ig2" v-bind:src="item.images">
			<div class="sud">
				<p>{{item.name}}</p>
				<span>继续阅读  〉</span>
				<p>{{item.intro}}</p>
				<p><img src="../../assets/image/man.png">{{item.author}}</p>
			</div>
		</li>
	</ul>
	<!-- 定位书本删除按钮 -->
	<div v-show="show" class="delete">
		<img @click="AllFn" v-bind:src="allSelect==false ? src[0] : src[1]">
		<span>全选</span>
		<p @click="deleteFn">删除</p>
	</div>
	<!--展示更多 -->
	<div v-show="more" class="more">
		<ol>
			<li v-for="(item,index) in moreArr" @click="changFn(index)">
				<div></div>
				<p>{{item.font}}</p>
			</li>
		</ol>
	</div>
	<!-- 书架没有书时 -->
	<p class="readbook" v-show="booklist == '' ? true : false">本人太懒，没有看任何书，快去看书吧~~</p>
</div>
</template>

<script>
import axios from 'axios';
import localEvent from '../../store/local';
import { mapGetters, mapActions } from 'vuex';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     booklist:[],
     show:false,
     src:[require('../../assets/image/false.png'),require('../../assets/image/true.png')],
     select:[],
     allSelect:false,
     moreArr:[
     	{"font":"首页"},
     	{"font":"玄幻"},
     	{"font":"修真"},
     	{"font":"都市"},
     	{"font":"历史"},
     	{"font":"我的"},
     	],
     more:false,
     bgcolor:"bg1",
     bgcolor1:"",
     shelf:true
    }
  },
  created(){
  	this.booklist=localEvent.StorageGetter("bookshelf")||[];
  	for(var i = 0; i < this.booklist.length; i++){
  		this.select.push(false);
  	}
  	// console.log(this.select)
  },
  methods:{
  	...mapActions([
        'setBook',
        "setCatalog"
    ]),
  	eaditFn:function(){
  		// 编辑按钮
  		this.show=!this.show;
  	},
  	searchFn:function(){
  		// 搜索按钮
  		this.$router.push({path:'/search'});
  	},
  	backFn:function(){
  		// 返回按钮
  		this.$router.go(-1);
  	},
  	seletFn:function(index){
  		// 单选按钮
  		var bol = !this.select[index];
  		this.$set(this.select, index, bol)
  		// console.log(this.select)
  		// 触发全选按钮
  		for(var i=0;i<this.booklist.length;i++){
  			if(!this.select[i]){
  				this.allSelect=false;
  				return;
  			}else{
  				this.allSelect=true;
  			}
  		}
  		event.stopPropagation();
  	},
  	AllFn:function(){
  		// 全选按钮
  		if(this.allSelect){
  			for(var i=0;i<this.booklist.length;i++){
  				this.select[i]=false;
  			}
  		}else{
  			for(var i=0;i<this.booklist.length;i++){
  				this.select[i]=true;
  			}
  		}
  		this.allSelect=!this.allSelect;
  	},
  	deleteFn:function(){
  		// 删除按钮
  		// 删除书架内容
  		for(var i=0;i<this.booklist.length;i++){
  			if(this.select[i]){
  				this.select.splice(i,1);
  				this.booklist.splice(i,1);
  				i--;
  			}
  		};
  		this.booklist=this.booklist;
  		if(this.shelf){
  			// 我的书架
  			localEvent.StorageSetter("bookshelf",this.booklist);
  		}else{
  			// 最近阅读
  			localEvent.StorageSetter("readlybook",this.booklist);
  		}
  		if(this.booklist==""){
  			this.show=false;
  		}
  	},
  	moresFn:function(){
  		// 展示更多选择页面
  		this.more=!this.more;
  	},
  	changFn:function(index){
  		// 选择跳转页面
  		switch (index) {
  			case 0:
  				this.$router.push({path:'/home'})
  				break;
  			case 1:
  				this.$router.push({path:'/fantasy',query: {id:this.moreArr[index].font}})
  				break;
  			case 2:
  				this.$router.push({path:'/fantasy',query: {id:this.moreArr[index].font}})
  				break;

  			case 3:
  				this.$router.push({path:'/fantasy',query: {id:this.moreArr[index].font}})
  				break;

  			case 4:
  				this.$router.push({path:'/fantasy',query: {id:this.moreArr[index].font}})
  				break;

  			case 5:
  				var bol=localEvent.StorageGetter("loadbol");
  				if(bol=="true"){
  					this.$router.push({path:'/my'});
  				}else{
  					this.$router.push({path:'/'});
  				}
  				break;
  		}
  	},
  	bookshelfFn:function(){
  		// 点击我的书架
  		this.bgcolor='bg1';
  		this.bgcolor1="bg";
  		// 关闭更多列表
  		this.more=false;
  		this.shelf=true;
  		this.booklist=localEvent.StorageGetter("bookshelf");
  		this.allSelect=false;
  		// 编辑恢复原来
  		this.show=false;
  		// 按钮变成false
  		if(this.booklist<=0){
  			this.booklist=[];
  			return;
  		}else{
  			for(var i=0;i<this.booklist.length;i++){
			this.select[i]=false;
		}
	}
  	},
  	readlyFn:function(){
  		// 点击最近阅读
  		this.bgcolor="bg";
  		this.bgcolor1='bg1';
  		// 关闭更多列表
  		this.more=false;
  		this.shelf=false;
  		this.booklist=localEvent.StorageGetter("readlybook");
  		// 按钮变成false
		for(var i=0;i<this.booklist.length;i++){
			this.select[i]=false;
		}
  		this.allSelect=false;
  		// 编辑恢复原来
  		this.show=false;
  	},
  	readingFn:function(index){
  		// 进入阅读书籍
  		// 跳到阅读页面
  		this.setBook(this.booklist.id);
        this.$router.push({path:'/reading',query: {book: this.booklist[index].id}});
        localEvent.StorageSetter("book",this.booklist[index].id);
        // 更新书本内容
        this.setCatalog(1);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.bookshelf
	.bgs
		position fixed
		width 100%
		height 100%
		background white
		z-index -1
	.top
		position fixed
		top 0
		left 0
		width 100%
		height pxtorem(76px)
		padding-top pxtorem(18px)
		overflow hidden
		border-bottom pxtorem(1px) solid #ccc
		background white
		img:nth-child(1)
			float left
			margin-left pxtorem(35px)
		img:nth-of-type(2)
			float right
			margin-right pxtorem(107px)
		img:nth-of-type(3)
			float right
			margin-right pxtorem(29px)
			margin-top pxtorem(-35px)
		img
			height pxtorem(40px)
			margin-top pxtorem(5px)
		p
			float left
			margin-left pxtorem(150px)
			font-size pxtorem(26px)
			border pxtorem(2px) solid red
			width pxtorem(328px)
			height pxtorem(54px)
			border-radius pxtorem(15px)
			overflow hidden
			display flex
			.bg
				background white
				color red
			.bg1
				background red
				color white
			span
				width pxtorem(160px)
				display inline-block
				line-height pxtorem(54px)
				height pxtorem(54px)
				text-align center
				color red
				flex 1
	.eadit
		height pxtorem(57px)
		padding-top pxtorem(30px)
		width 100%
		overflow hidden
		font-size pxtorem(30px)
		margin-top pxtorem(85px)
		position fixed
		top pxtorem(10px)
		background white
		left 0
		span:nth-child(1)
			float left
			margin-left pxtorem(35px)
		span:nth-child(2)
			float right
			margin-right pxtorem(30px)
	ul
		margin-top pxtorem(149px)
		padding-bottom pxtorem(130px)
		li
			height pxtorem(153px)
			margin-left pxtorem(35px)
			border-bottom pxtorem(1px) solid #ccc
			padding-bottom pxtorem(28px)
			padding-top pxtorem(30px)
			overflow hidden
			.ig1
				width pxtorem(38px)
				height pxtorem(41px)
				float left
				margin pxtorem(60px) pxtorem(28px) 0 0
			.ig2
				width pxtorem(113px)
				height pxtorem(153px)
				float left
			div
				width 70%
				display inline-block
				margin-left pxtorem(24px)
				height pxtorem(153px)
				padding-top pxtorem(10px)
				float left
				p:nth-child(1)
					width 65%
					font-size pxtorem(34px)
					display inline-block
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
				span
					font-size pxtorem(30px)
					color gray
				p:nth-of-type(2)
					width 100%
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
					font-size pxtorem(30px)
					line-height pxtorem(60px)
					color gray
				p:nth-of-type(3)
					width pxtorem(402px)
					font-size pxtorem(30px)
					color gray
					margin-right pxtorem(11px)
					img
						width pxtorem(35px)
						height pxtorem(35px)
						float left
	.delete
		height pxtorem(120px)
		width 100%
		position fixed
		bottom 0
		left 0
		overflow hidden
		background white
		border-top pxtorem(1px) solid #ccc
		img
			width pxtorem(38px)
			height pxtorem(36px)
			float left
			margin-top pxtorem(44px)
			margin-left pxtorem(35px)
		span
			float left
			margin-top pxtorem(42px)
			margin-left pxtorem(20px)
			font-size pxtorem(30px)
		p
			width pxtorem(150px)
			height 100%
			display inline-block
			float right
			background red
			color white
			text-align center
			font-size pxtorem(34px)
			line-height pxtorem(120px)
	.more
		position fixed
		top pxtorem(120px)
		left 0
		z-index 100
		width 100%
		background white
		ol
			width 100%
			padding-bottom pxtorem(60px)
			li:nth-child(1)
				margin-left pxtorem(110px)
				div:nth-child(1)
					background-position pxtorem(-60px) pxtorem(2px)
			li:nth-child(2)
				margin-left pxtorem(150px)
				margin-right pxtorem(150px)
				div:nth-child(1)
					background-position pxtorem(-120px) pxtorem(-55px)
			li:nth-child(3)
				margin-right pxtorem(100px)
				div:nth-child(1)
					background-position 0 pxtorem(9px)
			li:nth-child(4)
				margin-left pxtorem(110px)
				div:nth-child(1)
					background-position pxtorem(3px) pxtorem(-56px)
			li:nth-child(5)
				margin-left pxtorem(150px)
				div:nth-child(1)
					background-position 0 pxtorem(-120px)
			li:nth-child(6)
				margin-left pxtorem(150px)
				div:nth-child(1)
					background-position pxtorem(-123px) pxtorem(10px)
			li
				display inline-block
				margin-top pxtorem(46px)
				text-align center
				div
					display inline-block
					width pxtorem(61px)
					height pxtorem(61px)
					background-repeat no-repeat
					background-image url("../../assets/image/all.png")
	.readbook
		font-size pxtorem(35px)
		width 100%
		margin-top pxtorem(100px)
		text-align center
		color gray


</style>
