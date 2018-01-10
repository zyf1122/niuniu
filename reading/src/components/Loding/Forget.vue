<template>
<div class="qq">
	<my-header :mes='title'></my-header>
	<p class="pp">亲，在这输入心爱的账号哦！</p>
	<div class="ip">
		<input type="text" placeholder="输入心爱账号" v-model='pw' onkeyup=
		"value=value.replace(/[^\d]/g,'')">
		<p></p>
	</div>
	<button @click="loadingFn">确认</button>
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
     pw:"",
     num:1
    }
  },
  methods:{
  	loadingFn:function(){
  		if(this.num==1){
  			alert("亲,好像没get到,请重新输入一次~")
  			this.pw="";
  			this.num++;
  		}else if(this.num==2){
  			alert("亲，好像有点feel了，再输一遍吧~")
  			this.pw="";
  			this.num++;
  		}else if(this.num==3){
			alert("亲，好像好像有点feel-feel了，再输一遍哈~");
			this.pw="";
  			this.num++;
  		}else if(this.num==4){
			alert("亲亲，好像差不多了，再来一次吧~");
			this.pw="";
  			this.num++;
  		}else if(this.num==5){
			alert("亲，好像不行哦，小的也不知道了");
			this.pw="";
  			this.num++;
  		}else{
  			alert("亲，别挣扎了，再注册一个号吧~");
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
	.pp
		width 100%
		text-align center
		font-size pxtorem(40px)
		padding-top pxtorem(336px)
		margin-bottom pxtorem(105px)
	.ip
		width pxtorem(608px)
		margin auto
		overflow hidden
		input
			width 100%
			height pxtorem(92px)
			background #eeeeee
			border 0
			text-indent pxtorem(34px)
			font-size pxtorem(30px)
		p
			width 100%
			border-bottom pxtorem(3px) solid gray
			margin-top pxtorem(10px)
	button
		width pxtorem(608px)
		height pxtorem(92px)
		display block
		margin auto
		font-size pxtorem(30px)
		color white
		background #136fde
		border 0
		margin-top pxtorem(126px)
		border-radius pxtorem(46px)
		outline none



</style>
