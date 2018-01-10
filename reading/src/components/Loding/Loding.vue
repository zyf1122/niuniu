<template>
<div class="loding">
	<div class="top">
		<img src="../../assets/image/niu.png" alt="">
		<div class="niu">
			<p>牛牛阅读</p>
			<p>爱好阅读者提供</p>
		</div>
	</div>
	<div class="ip">
		<input type="text" placeholder="输入：我爱牛牛" v-model="mes">
		<input type="text" placeholder="密码：520" v-model="mess" onkeyup=
		"value=value.replace(/[^\d]/g,'')">
		<button @click="loding_homeFn">登录</button>
		<img src="../../assets/image/people.png" alt="">
		<img src="../../assets/image/pw.png" alt="">
	</div>
	<div class="zhuce">
		<span @click="forgetFn">忘记密码</span>
		<span>手机注册</span>
	</div>
	<div class="select">
		<div class="qq" @click="qqFn">
			<img src="../../assets/image/qq.png">
			<p>QQ登录</p>
		</div>
		<div class="mess" @click="messageFn">
			<img src="../../assets/image/hpone.png">
			<p>短信登录</p>
		</div>
		<div class="mess" @click="lodingFn">
			<img src="../../assets/image/com.png">
			<p>游客登录</p>
		</div>
	</div>
	<p class="more" @click="moreFn">更多方式<span v-show="!show">∨</span><span v-show="show">∧</span></p>
	<div class="ig" v-show="show">
		<img src="../../assets/image/lang.png" alt="">
		<img src="../../assets/image/pay.png" alt="">
		<img src="../../assets/image/du.png" alt="">
	</div>
</div>
</template>

<script>
import localEvent from '../../store/local';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     show:false,
     mes:"",
     mess:''
    }
  },
  created(){
  	var bol=localEvent.StorageGetter("loadbol");
  	if(bol=="true"){
  		this.$router.push({path:'/home'});
  	}
  },
  methods:{
  	moreFn:function(){
  		this.show=!this.show;
  	},
  	lodingFn:function(){
  		this.$router.push({path:'/home'})
  	},
  	loding_homeFn:function(){
  		if(this.mes=="我爱牛牛"&&this.mess==520){
  			this.$router.push({path:'/home'});
  			localEvent.StorageSetter("loadbol","true");
  		}else{
  			alert("请输入正确密码");
  		}
  	},
  	qqFn:function(){
  		this.$router.push({path:'/qq'});
  	},
  	messageFn:function(){
  		this.$router.push({path:'/message'})
  	},
  	forgetFn:function(){
  		this.$router.push({path:'/forget'})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.loding
	height 100%
	width 100%
	position fixed
	top 0
	left 0
	background white
	.top
		text-align center
		margin-top pxtorem(155px)
		img
			width pxtorem(85px)
			height pxtorem(85px)
		.niu
			display inline-block
			width pxtorem(231px)
			height pxtorem(78px)
			p:nth-child(1)
				font-size pxtorem(48px)
				font-weight bold
				margin-bottom pxtorem(15px)
			p:nth-child(2)
				font-size pxtorem(20px)
	.ip
		width pxtorem(657px)
		position relative
		margin auto
		margin-top pxtorem(92px)
		input:nth-child(2)
			margin-top pxtorem(22px)
			margin-bottom pxtorem(49px)
		input
			width 100%
			height pxtorem(85px)
			background-color #f5f6f8
			border-radius pxtorem(15px)
			text-indent pxtorem(87px)
			font-size pxtorem(28px)
			border 0
		button
			width 100%
			height pxtorem(85px)
			background pink
			border 0
			border-radius pxtorem(25px)
			font-size pxtorem(30px)
			outline none
		img:nth-of-type(1)
			top pxtorem(21px)
			left pxtorem(26px)
		img:nth-of-type(2)
			top pxtorem(130px)
			left pxtorem(26px)
		img
			width pxtorem(40px)
			height pxtorem(40px)
			position absolute
	.zhuce
		width pxtorem(657px)
		margin auto
		margin-top pxtorem(20px)
		font-size pxtorem(31px)
		overflow hidden
		span:nth-child(1)
			float left
		span:nth-child(2)
			float right
			color blue
	.select
		width pxtorem(750px)
		margin auto
		margin-top pxtorem(101px)
		img
			width pxtorem(89px)
			height pxtorem(89px)
			display block
			margin-left pxtorem(10px)
		div:nth-child(1)
			margin-left pxtorem(110px)
			margin-right pxtorem(90px)
		div:nth-child(2)
			margin-right pxtorem(90px)
		div
			display inline-block
			font-size pxtorem(30px)
			text-align center
			p
				margin-top pxtorem(20px)
	.more
		width pxtorem(200px)
		margin auto
		font-size pxtorem(30px)
		text-align center
		color gray
		margin-top pxtorem(69px)
		span
			font-size pxtorem(40px)
			margin-left pxtorem(15px)
	.ig
		margin-top pxtorem(33px)
		img:nth-child(1)
			margin-left pxtorem(219px)
		img:nth-child(2)
			margin-left pxtorem(43px)
			margin-right pxtorem(43px)
		img
			width pxtorem(75px)
			height pxtorem(75px)



</style>
