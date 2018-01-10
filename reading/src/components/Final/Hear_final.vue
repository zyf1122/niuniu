<template>
	<div>
		<img @click="backFn" src="../../assets/image/back2.png">
		<span>{{mes.back}}</span>
	</div>
</template>

<script>
export default {
  // name: 'HelloWorld',
  props:["mes"],
  data () {
    return {
     font:"返回"
    }
  },
  created:function () {
  	// console.log(this.mes)
  },
  methods:{
  	backFn:function(){
  		this.$router.go(-1);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
div
	height pxtorem(70px)
	padding-top pxtorem(30px)
	background white
	overflow hidden
	img
		width pxtorem(30px)
		height pxtorem(40px)
		float left
		margin-left pxtorem(30px)
	span
		font-size pxtorem(35px)
		float left
		margin-left pxtorem(20px)
		margin-top pxtorem(2px)

</style>
