<template>
<div class="qq">
	<my-header :mes='title'></my-header>
	<div class="bgqq">
		<img src="../../assets/image/QQs.png">
	</div>
	<div class="ip">
		<input type="text" placeholder="账号：我爱牛牛" v-model='user'>
		<input type="text" placeholder="密码：520" v-model='pw' onkeyup=
		"value=value.replace(/[^\d]/g,'')">
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
     title:{back:'QQ登录'},
     user:"",
     pw:""
    }
  },
  methods:{
  	loadingFn:function(){
  	if(this.user=="我爱牛牛" && this.pw=="520"){
  		this.$router.push({path:'/home'});
  		localEvent.StorageSetter("loadbol","true");
  	}else{
  		alert("亲，密码错误哦~");
  	}
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
	.bgqq
		width pxtorem(182px)
		height pxtorem(215px)
		margin pxtorem(55px) auto pxtorem(40px)
		img
			width 100%
	.ip
		width pxtorem(608px)
		border-radius pxtorem(15px)
		border pxtorem(1px) solid #ccc
		margin auto
		overflow hidden
		input:nth-child(1)
			border-bottom pxtorem(1px) solid #ccc
		input
			width 100%
			height pxtorem(92px)
			background white
			border 0
			text-indent pxtorem(34px)
			font-size pxtorem(30px)
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
		border-radius pxtorem(20px)
		outline none



</style>
