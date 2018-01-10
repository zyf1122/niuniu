<template>
<div class="qq">
	<my-header :mes='title'></my-header>
	<div class="ip">
		<input type="text" placeholder="我爱牛牛">
		<input type="text" placeholder="号码：520" v-model='pw' onkeyup=
		"value=value.replace(/[^\d]/g,'')">
		<input type="text" placeholder="请输入验证码" class="ipp"  v-model='randoms' MaxLength = 4></input>
		<p>中国大陆</p>
		<p>+86</p>
		<span>{{random}}</span>
		<p @click="newFn">刷新</p>
	</div>
	<button @click="loadingFn">登录</button>
</div>
</template>

<script>
import Header from '../Final/Hear_final.vue';
import localEvent from '../../store/local';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     title:{back:'短信登录'},
     randoms:"",
     pw:"",
     random:"3344"
    }
  },
  created(){
  	var num=parseInt(Math.random()*(9999-1000)+1000);
  	this.random=num;
  },
  methods:{
  	loadingFn:function(){
  	if(this.randoms==this.random && this.pw=="520"){
  		this.$router.push({path:'/home'});
  		localEvent.StorageSetter("loadbol","true");
  	}else{
  		alert("亲，验证码错误哦~");
  	}
  },
  newFn:function(){
  	var num=parseInt(Math.random()*(9999-1000)+1000);
  	this.random=num;
  }
  },
  components:{
  	'my-header':Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.qq
	position fixed
	width 100%
	height 100%
	background #eeeeee
	.ip
		width pxtorem(608px)
		margin pxtorem(108px) auto 0
		overflow hidden
		position relative
		input:nth-child(1)
			border-bottom pxtorem(1px) solid #ccc
			margin-bottom pxtorem(22px)
		.ipp
			margin-top pxtorem(20px)
			text-indent pxtorem(32px)
		input
			width 100%
			height pxtorem(92px)
			background white
			border 0
			text-indent pxtorem(190px)
			font-size pxtorem(30px)
			border-radius pxtorem(15px)
			border pxtorem(1px) solid #ccc
		p:nth-of-type(1)
			top pxtorem(29px)
			left pxtorem(36px)
		p:nth-of-type(2)
			top pxtorem(150px)
			left pxtorem(36px)
		p:nth-of-type(3)
			width pxtorem(70px)
			height pxtorem(70px)
			top pxtorem(244px)
			right pxtorem(20px)
			border-radius 50%
			background #ccc
			overflow hidden
			line-height pxtorem(70px)
			text-align center
		p
			position absolute
			font-size pxtorem(30px)
		span
			position absolute
			top pxtorem(260px)
			right pxtorem(120px)
			font-size pxtorem(40px)
	button
		width pxtorem(608px)
		height pxtorem(92px)
		display block
		margin auto
		font-size pxtorem(30px)
		color white
		background #136fde
		border 0
		margin-top pxtorem(26px)
		border-radius pxtorem(45px)
		outline none



</style>
