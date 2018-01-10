<template>
<div class="mes">
	<my-header :mes="title"></my-header>
	<div><img src="../../assets/image/img/mes.jpg"></div>
</div>
</template>

<script>
import Heard from './Hear_final.vue';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     title:{back:'消息中心'}
    }
  },
  components:{
  	"my-header":Heard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
	width:100%;
	
}
</style>
