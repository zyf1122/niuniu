<template>
<div class="mes">
	<!-- <my-header></my-header> -->
  <div class="div" @click="backFn"></div>
  <img src="../../assets/image/img/vip.jpg">
	<img src="../../assets/image/img/vip1.jpg">
</div>
</template>

<script>
import Heard from './Hear_final.vue';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  methods:{
    backFn:function(){
      this.$router.go(-1);
    }
  },
  components:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.div{
  position: fixed;
  top:0;
  left:0;
  width: 45px;
  height: 30px;
}
img{
	width:100%;	
}
</style>
