<template>
<div class="header">
	<span><slot name="left"></slot></span>
	<span><slot name="right"></slot></span>
</div>
</template>

<script>
export default {
  // name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  methods:{

  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../assets/common/stylus/common.styl"
.header
	height pxtorem(85px)
	width pxtorem(750px)
	overflow hidden
	color red
	font-size pxtorem(40px)
	padding-top pxtorem(20px)
	background-color white
	span:nth-child(1)
		float left
	span:nth-child(2)
		float right
		margin-right pxtorem(37px)
		margin-top pxtorem(8px)

</style>
