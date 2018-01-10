<template>
<div>
	<div class="catalog" v-bind:id="chang">
		<dl>
			<dt>
				<img @click="changFn" src="../../assets/image/back.png">
				<span>目录</span>
			</dt>
			<dd v-for="(item,index) in chapterArr" @click="catalogFn(index)">{{item}}</dd>
		</dl>
	</div>
</div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
import localEvent from '../../store/local';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     chapterArr:[],
     colors:"color"
    }
  },
  created(){
  	// console.log(localEvent.StorageGetter("id"));
  	axios.get(`${this.common.api}/titles?id=${localEvent.StorageGetter("book")}`).then(res=>{
  		// console.log(res);
  		var chapter=res.data.titles
  		var chapterArr=chapter.split("-");
  		this.chapterArr=chapterArr;
  		// console.log(chapterArr)
  	})
  	// console.log(this.book)
  },
  methods:{
  	...mapActions([
  		'changFF',
  		'setCatalog',
  		'setNav',
  		'setBgCatalog'
  	]),
  	changFn:function(){
  		this.changFF();
  		this.setBgCatalog("colorhidden");

  	},
  	catalogFn:function(index){
  		this.setCatalog(index+1);
  		// 记录章节数
  		localEvent.StorageSetter("id",index+1);
  		this.changFF();
  		this.setNav();
  		document.documentElement.scrollTop = 0;
  		// 目录背景隐藏
  		this.setBgCatalog("colorhidden");
  	}
  },
  computed: mapGetters({
  	chang : 'getSubjectItem',
  	detail : 'getSubjectDetails',
  	book:'getBook'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
#catalog1
	left -100%
	transition 0.5s
.catalog
	width pxtorem(650px)
	height 100%
	position fixed
	top 0
	left 0
	z-index 1
	transition 0.3s
	overflow-y auto
	-webkit-overflow-scrolling touch
	-ms-overflow-style -ms-autohiding-scrollbar
	dl
		background white
		width pxtorem(650px)
		font-size pxtorem(31px)
		position absolute
		z-index 100
		dt
			color red
			height pxtorem(82px)
			text-align center
			padding-top pxtorem(26px)
			border-bottom pxtorem(5px) solid red
			overflow hidden
			img
				float left
				margin-left pxtorem(20px)
			span
				display inline-block
				font-size pxtorem(35px)
				margin-top pxtorem(13px)
				margin-left pxtorem(-120px)
				font-weight bold
		dd
			width pxtorem(550px)
			line-height pxtorem(100px)
			border-bottom pxtorem(1px) solid #ccc
			margin-left pxtorem(30px)
			overflow hidden
			text-overflow ellipsis
			white-space nowrap


</style>
