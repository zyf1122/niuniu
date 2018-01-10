<template>
<div class="my">
	<div class="top" v-bind:id="bgcolor">
		<img @click="homeFn" src="../../assets/image/back_my.png" alt="">
		<span>牛牛中心</span>
		<img @click="searchFn" src="../../assets/image/search_my.png" alt="">
		<img @click="showFn" src="../../assets/image/more_my.png" alt="">
		<div class="introduce">
			<div></div>
			<p>我爱牛牛</p>
			<img src="../../assets/image/pu_my.png">
		</div>
	</div>
	<ul>
		<li v-for="(item,index) in fontArr" @click="selectFn(index)">
			<img v-bind:src="item.url">
			<span>{{item.font}}</span>
			<img src="../../assets/image/backs.png">
		</li>
	</ul>
	<div class="loading" @click="quitFn">退出登录</div>
	<div class="show">
		<p v-for="item in showArr">{{item}}</p>
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
</div>
</template>

<script>
import localEvent from '../../store/local';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     fontArr:[
     	{url:require("../../assets/image/book.png"),font:"我的书架"},
     	{url:require("../../assets/image/mes.png"),font:"消息中心"},
     	{url:require("../../assets/image/vip.png"),font:"会员等级"},
     	{url:require("../../assets/image/red.png"),font:"经验等级"},
     	{url:require("../../assets/image/secer.png"),font:"安全中心"},
     	{url:require("../../assets/image/help.png"),font:"帮助中心"}
     ],
     showArr:["客服端","触屏版","电脑版","帮助","反馈"],
     moreArr:[
     	{"font":"首页"},
     	{"font":"玄幻"},
     	{"font":"修真"},
     	{"font":"都市"},
     	{"font":"历史"},
     	{"font":"科幻"},
     	],
     more:false,
     bgcolor:""
    }
  },
  methods:{
  	showFn:function(){
  		// 展示更多
  		if(!this.more){
  			this.bgcolor="bg";
  		}else{
  			this.bgcolor="";
  		}
  		this.more=!this.more;
  	},
  	searchFn:function(){
  		// 跳到搜索框页面
  		this.$router.push({path:'/search'})
  	},
  	homeFn:function(){
  		// 跳到首页
  		this.$router.push({path:'/home'})
  	},
  	quitFn:function(){
  			this.$router.push({path:'/'});
  			localEvent.StorageSetter("loadbol","false");
  	},
  	selectFn:function(index){
  		switch (index) {
  			case 0:
  				this.$router.push({path:'/bookshelf'})
  				break;
  			case 1:
  				this.$router.push({path:'/mes'})
  				break;
  			case 2:
  				this.$router.push({path:'/vip'})
  				break;
  			case 3:
  				this.$router.push({path:'/red'})
  				break;
  			case 4:
  				this.$router.push({path:'/security'})
  				break;
  			case 5:
  				this.$router.push({path:'/help'})
  				break;
  			default:
  				// statements_def
  				break;
  		}
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
  				this.$router.push({path:'/fantasy',query: {id:this.moreArr[index].font}})
  				break;
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.my
	width 100%
	#bg
		background gray
	.top
		width 100%
		height pxtorem(326px)
		padding-top pxtorem(30px)
		background #de2630
		overflow hidden
		img:nth-child(1)
			width pxtorem(45px)
			margin-left pxtorem(30px)
		span
			font-size pxtorem(30px)
			color white
			margin-left pxtorem(10px)
			margin-top pxtorem(5px)
		img:nth-of-type(2)
			width pxtorem(38px)
			margin-left pxtorem(397px)
		img:nth-of-type(3)
			width pxtorem(41px)
			margin-left pxtorem(35px)
		img,span
			float left
			height pxtorem(40px)
		.introduce
			div
				width pxtorem(125px)
				height pxtorem(125px)
				border pxtorem(3px) solid #ccc
				border-radius 50%
				margin pxtorem(80px) auto pxtorem(13px)
				background-image url('../../assets/image/people.jpg')
				background-repeat no-repeat
				background-size 100%
			p
				width 100%
				font-size pxtorem(30px)
				color white
				text-align center
			img:nth-child(3)
				width pxtorem(90px)
				height pxtorem(35px)
				display block
				margin-top pxtorem(10px)
				margin-left pxtorem(325px)
	ul
		width 100%
		margin-top pxtorem(30px)
		background white
		li:nth-last-child(1)
			border 0
		li:nth-child(1)
			img:nth-child(1)
				width pxtorem(45px)
				height pxtorem(45px)
		li
			width pxtorem(720px)
			height pxtorem(74px)
			padding-top pxtorem(35px)
			overflow hidden
			border-bottom pxtorem(1px) solid #ccc
			padding-left pxtorem(30px)
			img:nth-child(1)
				width pxtorem(40px)
				height pxtorem(42px)
				float left
			span
				font-size pxtorem(34px)
				margin-left pxtorem(26px)
				margin-top pxtorem(6px)
				float left
			img:nth-of-type(2)
				width pxtorem(42px)
				height pxtorem(41px)
				float right
				margin-right pxtorem(60px)
	.loading
		width 100%
		height pxtorem(110px)
		font-size pxtorem(29px)
		color red
		text-align center
		line-height pxtorem(110px)
		background white
		margin-top pxtorem(30px)
	.show
		width 100%
		display flex
		background white
		height pxtorem(122px)
		margin-top pxtorem(25px)
		p
			flex 1
			display inline-block
			font-size pxtorem(30px)
			text-align center
			line-height pxtorem(110px)
	.more
			position fixed
			top pxtorem(100px)
			left 0
			z-index 100
			width 100%
			background gray
			color white
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
						background-position pxtorem(-55px) pxtorem(-55px)
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

</style>
