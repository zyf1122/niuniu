<template>
  <div class="wrap">

  	<div class="header">
		<span>牛牛阅读</span>
		<img @click="myFn" src="../assets/image/avatar.png">
  	</div>
  	<div class="Lunbo">
	    <mt-swipe :auto="4000">
	      <mt-swipe-item v-for="item in lunArr">
	      	<img v-bind:src="item.url">
	      </mt-swipe-item>
	    </mt-swipe>
 	</div>
 	<div class="search" @click="searchFn">
 		<input type="text">
 		<p>
 			<img src="../assets/image/search.png">
 			<span>搜你所想的</span>
 		</p>
 	</div>
	<ul class="list">
		<li v-for="(item,index) in select" @click="selectFn(index)"><span></span>{{item}}</li>
	</ul>
	<booklist_X></booklist_X>
	<Booklist_Y></Booklist_Y>
	<div class="readly" @click="readlyFn">
		<p>最近</p>
		<p>阅读</p>
	</div>
	<div class="readlys" v-bind:id="idshow" @click="readlysFn">
		<div class="div">
			<p class="p1" v-bind:id="idshow">最近阅读</p>
			<ul>
				<li v-for="(item,index) in booklist" @click="readingFn(index)">
					<p class="pp">{{item.name}}</p>
					<span>继续阅读&nbsp></span>
					<p id="pr">{{item.intro}}</p>
					<p>作者：{{item.author}}</p>
				</li>
			</ul>
			<div class="load" v-bind:id="idshow">
				<p @click="bookshelfFn">我的书架</p>
			</div>
		</div>
	</div>
	<div :class="colors"></div>
  </div>
</template>

<script>
// 1. 引入mint的组件
// (js的引入)轮播图
	import Vue from 'vue';
	import { Swipe, SwipeItem } from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	// 2. css的引入（mint）
	import 'mint-ui/lib/style.css';

	import axios from 'axios'; 

	import Booklist_X from './Booklistcommon/Booklist_X.vue';
	import Booklist_Y from './Booklistcommon/Booklist_Y.vue';
	import localEvent from '../store/local';
	import { mapGetters, mapActions } from 'vuex';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     lunArr:[
      		{url:require("../assets/image/1.jpg")},
      		{url:require("../assets/image/2.jpg")},
      		{url:require("../assets/image/3.jpg")},
      		{url:require("../assets/image/4.jpg")},
      		{url:require("../assets/image/5.jpg")}
      	],
      select:["玄幻","修真","都市","历史","科幻"],
      booklist:[],
      idshow:"readlys",
      colors:"colorhidden"
    }
  },
  created(){
  	// axios.get(`${this.common.api}/booklist`).then(res => {
  	// 	this.booklist=res.data;
  	// 	// console.log(res.data)
  	// });
  	this.booklist=localEvent.StorageGetter("readlybook");
  	// console.log(this.booklist)
  },
  methods:{
  	...mapActions([
        'setBook',
        "setCatalog"
    ]),
  	selectFn:function(index){
  		this.$router.push({path:'/fantasy',query: {id:this.select[index]}})
  	},
  	myFn:function(){
  		// 我的页面
  		var bol=localEvent.StorageGetter("loadbol");
  		if(bol=="true"){
  			// 进入个人中心
  			this.$router.push({path:'/my'});
  		}else{
  			// 进入登录页面
  			this.$router.push({path:'/'});
  		}
  	},
  	searchFn:function(){
  		this.$router.push({path:'/search'});
  		// localEvent.StorageSetter('fz_size', "val")
  	},
  	readlyFn:function(){
  		this.idshow="";
  		var that=this;
  		setTimeout(function(){
  			that.colors="color";
  		},700)
  	},
  	readlysFn:function(){
  		this.idshow="readlys";
  		var that=this;
  		this.colors="colorhidden";
  	},
  	bookshelfFn:function(){
  		var bol=localEvent.StorageGetter('loadbol');
  		if(bol=="true"){
  			this.$router.push({path:'/bookshelf'});
  		}else{
  			this.$router.push({path:'/'})
  		}
  	},
  	readingFn:function(index){
  		// 跳到阅读页面
  		this.setBook(this.booklist.id);
        this.$router.push({path:'/reading',query: {book: this.booklist[index].id}});
        localEvent.StorageSetter("book",this.booklist[index].id);
        // 更新书本内容
        this.setCatalog(1);
        // console.log(index)
  	}
  },
    components:{
    	"booklist_X":Booklist_X,
    	"Booklist_Y":Booklist_Y
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../assets/common/stylus/common.styl"
.wrap
	width pxtorem(750px)
	.header
		width pxtorem(750px)
		height pxtorem(95px)
		display inline-block
		overflow hidden
		line-height pxtorem(95px)
		position fixed
		top 0
		left 0
		z-index 60
		background white
		span
			display inline-block
			font-size pxtorem(45px)
			float left
			margin-left pxtorem(28px)
		img
			width pxtorem(50px)
			height pxtorem(50px)
			float right
			margin-right pxtorem(31px)
			margin-top pxtorem(22px)
	.Lunbo
		width pxtorem(750px)
		height pxtorem(298px)
		margin-bottom pxtorem(10px)
		margin-top pxtorem(100px)
		img
			width pxtorem(750px)
			height pxtorem(298px)
	.search
		position relative
		width pxtorem(702px)
		margin pxtorem(15px) auto 
		input
			width 100%
			height pxtorem(69px)
			border-radius pxtorem(15px)
			border 0
			outline none
		p
			position absolute
			top pxtorem(14px)
			left pxtorem(278px)
			img
				width pxtorem(27px)
				height pxtorem(29px)
				margin-top pxtorem(3px)
				float left
			span
				margin-left pxtorem(13px)
	.list
		height pxtorem(138px)
		display flex
		width pxtorem(750px)
		background-color white
		li
			height pxtorem(87px)
			flex 1
			text-align center
			margin-top pxtorem(19px)
			span
				display block
				margin auto
				height pxtorem(60px)
				width pxtorem(60px)
				background-image: url("../assets/image/all.png")
				background-repeat no-repeat
				background-position pxtorem(30px)
		li:nth-child(1) span
				background-position pxtorem(-123px) pxtorem(-52px)
		li:nth-child(2) span
				background-position pxtorem(0px) pxtorem(5px)
		li:nth-child(3) span
				background-position pxtorem(0px) pxtorem(-59px)
		li:nth-child(4) span
				background-position pxtorem(0px) pxtorem(-118px)
		li:nth-child(5) span
				background-position pxtorem(-56px) pxtorem(-55px)
	ol
		width pxtorem(750px)
		overflow scroll
		li:nth-child(2)
			width pxtorem(2240px)
			position relative
			overflow-x auto
			overflow-y hidden
			white-space nowrap
			text-indent 7px
			div
				width pxtorem(210px)
				display inline-block
				float left
				margin-left pxtorem(14)
				img
					width pxtorem(210px)
					height pxtorem(261px)
				p
					font-size pxtorem(30px)
					overflow hidden
					text-overflow: ellipsis
					white-space: nowrap
	.readly
		position fixed
		right pxtorem(35px)
		bottom pxtorem(155px)
		width pxtorem(94px)
		height pxtorem(86px)
		padding-top pxtorem(15px)
		background red
		color white
		border-radius 50%
		p:nth-last-child(1)
			float left
			margin-top pxtorem(-7px)
		p
			width 100%
			font-size pxtorem(20px)
			text-align center
			display inline-block
			margin-top pxtorem(4px)
	#readlys
		transition 1s
		right -100%
	.readlys
		width pxtorem(750px)
		height 100%
		position fixed
		top 0
		right 0
		z-index 100
		transition 1s
		.div
			width pxtorem(662px)
			height 100%
			background white
			position absolute
			top 0
			right 0
			z-index 100
			overflow-y auto
			-webkit-overflow-scrolling touch
			-ms-overflow-style -ms-autohiding-scrollbar
			.p1
				font-size pxtorem(34px)
				height pxtorem(60px)
				width pxtorem(662px)
				text-align center
				padding-top pxtorem(41px)
				font-weight bold
				position fixed
				top 0
				right 0
				z-index 1000
				background white
				transition 1s
				border-bottom pxtorem(1px) solid #ccc
			.load
				position fixed
				bottom 0
				right 0
				z-index 10
				width pxtorem(662px)
				height pxtorem(160px)
				background white
				transition 1s
				p
					height pxtorem(80px)
					width pxtorem(418px)
					position absolute
					bottom pxtorem(57px)
					right pxtorem(120px)
					background red
					text-align center
					line-height pxtorem(80px)
					font-size pxtorem(33px)
					border-radius pxtorem(40px)
					color white
			ul
				position absolute
				left pxtorem(57px)
				top pxtorem(115px)
				padding-bottom pxtorem(180px)
				li
					width 100%
					height pxtorem(160px)
					border-bottom pxtorem(1px) solid #ccc
					margin-top pxtorem(25px)
					.pp
						width pxtorem(445px)
						font-size pxtorem(33px)
						display inline-block
						text-overflow ellipsis
						white-space nowrap
						color black
					#pr
						width pxtorem(425px)
						overflow hidden
						text-overflow ellipsis
						white-space nowrap
						line-height pxtorem(55px)
					span,p
						font-size pxtorem(29px)
						color gray
	.color
		position fixed
		width 100%
		height 100%
		top 0
		left 0
		background rgba(0,0,0,0.4)
		z-index 70
	.colorhidden
		display none



</style>
