<template>
<div class="mes">
	<my-header class="header" :mes="title"></my-header>
  <div class="img">
    <img src="../../assets/image/img/security.jpg">
  </div>
	
</div>
</template>

<script>
import Heard from './Hear_final.vue';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     title:{back:'安全中心'}
    }
  },
  components:{
  	"my-header":Heard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img{
  position: absolute;
  width: 100%;
  background-color: white;
}
img{
  width:100%;
  
}
</style>
