<template>
<div  ref='night' class="reading">
	<div class="read-top" v-bind:style="{'background':color}" ref='fonts'>{{catalogtop==''?reading.title:catalogtop}}</div>
	<div v-show="show" class="readttop" @click="backFn">
		<img src="../../assets/image/back1.png">
		<span>返回书架</span>
	</div>
	<p :style="{'font-size':fontsize}" v-bind:class='font' v-for="item in catalogcontent==''?readArr:catalogcontent"  @click="clickFn">{{item}}</p>
	<div class="conter">
		<button class="preve" @click="preveFn">上一章</button>
		<button class="next" @click="nextFn">下一章</button>
	</div>
	<!-- 底部导航条 -->
	<ul v-show="show" class="footer">
		<li @click="catalogFn">
			<img src="../../assets/image/moer.png">
			<span>目录</span>
		</li>
		<li @click="fontFn">
			<img src="../../assets/image/Aa.png">
			<span>字体</span>
		</li>
		<li @click="nightFn">
			<img src="../../assets/image/night.png">
			<span>夜间</span>
		</li>
	</ul>
	<!-- 目录 -->
	<my-catalog class="catalogs"></my-catalog>
	<!-- 字体部分 -->
	<div class="bookfont" v-show="fontbol">
		<div class="fontsize">
			<span>字号</span>
			<span @click="bigFn">大</span>
			<span @click="smallFn">小</span>
		</div>
		<div class="bgcolor">
			<p class="bg">背景</p>
			<span v-for="(item,index) in colorArr" v-bind:style="{'background':item}" @click="bgcolorFn(index)"></span>
		</div>
	</div>
	<div :class="colorss" @click="hiddenFn"></div>
</div>
</template>

<script>
import axios from "axios";
import Catalog from "../Catalog/Catalog.vue";
import { mapGetters, mapActions } from 'vuex';
import localEvent from '../../store/local';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     reading:{},
     readArr:[],
     chapterArr:[],
     font:"",
     bol:'true',
     colorArr:['#e7e0c6','#e6eee3','#a4a4a4','#cbefcb','#263646','#0e150e'],
     fontbol:false,
     fontsize:"20px",
     color:'#e7e0c6'
    }
  },
  created(){
  	// 获取书本内容
  	axios.get(`${this.common.api}/book?book=${localEvent.StorageGetter("book")}&id=${localEvent.StorageGetter("id")}`).then(res => {
  		// console.log(res);
  		var string=res.data.content;
  		var strArr=string.split("-");
  		this.readArr=strArr;
  		this.reading=res.data
  		// console.log(localEvent.StorageGetter("book"))
  	});
  	// 获取章节数
  	axios.get(`${this.common.api}/titles?id=${localEvent.StorageGetter("book")}`).then(res=>{
  		// console.log(res);
  		var chapter=res.data.titles
  		var chapterArr=chapter.split("-");
  		this.chapterArr=chapterArr;
  		// console.log(chapterArr)
  	})
  	// console.log(this.catalogid)
  },
  methods:{
  	...mapActions([
  		'setItem',
  		'setBook',
  		'setAdd',
  		'setNav',
  		'setCatalog',
  		'changFF',
  		'setBgCatalog'
  	]),
  	backFn:function(){
  		this.$router.go(-1);
  	},
  	catalogFn:function(){
  		// 显示目录
  		this.setItem();
  		var that=this;
  		setTimeout(function(){
  			that.setBgCatalog("colors");
  		},100)
  	},
  	hiddenFn:function(){
  		// 隐藏目录
  		this.setBgCatalog("colorhidden");
  		this.changFF();
  	},
  	nightFn:function(){
  		if(this.bol){
  			this.$refs.fonts.style.color="#ccc";
  			this.$refs.fonts.style.backgroundColor="black";
  			this.$refs.night.style.backgroundColor = 'black';
  			this.font="color";
  			this.bol=!this.bol;
  		}else {
  			this.$refs.fonts.style.color="";
  			this.$refs.fonts.style.backgroundColor="";
  			this.$refs.night.style.backgroundColor = '#e7e0c6';
  			this.font="";
  			this.bol=!this.bol;
  		}	
  	},
  	bgcolorFn:function(index){
  		this.$refs.night.style.backgroundColor = this.colorArr[index];
  		this.color=this.colorArr[index];
  	},
  	fontFn:function(){
  		this.fontbol=!this.fontbol;
  	},
  	bigFn:function(){
  		this.fontsize="26px";
  	},
  	smallFn:function(){
  		this.fontsize="20px";
  		// this.setAdd()
  		// console.log(this.book)
  	},
  	clickFn:function(){
  		// this.show=!this.show;
  		// 点击显示头部和导航条
  		this.setNav();
  		if(this.fontbol){
  			this.fontbol=false;
  		}
  	},
  	preveFn:function(){
  		//当前章节数
  		var index=localEvent.StorageGetter("id");
  		if(index<=0){
  			return;
  		}else{
  			this.setCatalog(index-1);
  			localEvent.StorageSetter("id",index-1);
  		}
  		document.documentElement.scrollTop=0;
  		// console.log(index);
  			
  	},
  	nextFn:function(){
  		//当前章节数
  		var index=localEvent.StorageGetter("id");
  		if(index>this.chapterArr.length){
  			return;
  		}else{
  			this.setCatalog(index+1);
  			localEvent.StorageSetter("id",index+1);
  			document.documentElement.scrollTop=0;
  		}
  	}
  },
  mounted(){
    },
  computed: mapGetters({
  	catalogs : 'getSubjectItem',
  	detail : 'getSubjectDetails',
  	show:'getNav',
  	book:'getBook',
  	catalogtop:'getCatalogTop',
  	catalogcontent:'getCatalog',
  	colorss:'getBgCatalog'
  }),
  components:{
  	"my-catalog":Catalog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.reading
	background-color #e7e0c6
	padding-top pxtorem(105px)
	.color
		color #ccc
	p
		width pxtorem(700px)
		margin-left pxtorem(28px)
		font-size pxtorem(36px)
		text-indent pxtorem(72px)
		line-height pxtorem(65px)
	.read-top
		height pxtorem(104px)
		width 100%
		position fixed
		top 0
		left 0
		font-size pxtorem(47px)
		line-height pxtorem(104px)
		background-color #e7e0c6
		padding-left pxtorem(33px)
	.readttop
		overflow hidden
		width 100%
		height pxtorem(104px)
		position fixed
		top 0
		left 0
		background black
		padding-left pxtorem(33px)
		img
			float left
			width pxtorem(53px)
			height pxtorem(53px)
			margin-top pxtorem(25px)
		span
			float left
			color white
			margin-top pxtorem(35px)
			margin-left pxtorem(15px)
	.footer
		height pxtorem(115px)
		padding-top pxtorem(30px)
		width 100%
		font-size pxtorem(23px)
		overflow hidden
		position fixed
		bottom 0
		left 0
		background black
		li:nth-child(1)
			margin-left pxtorem(103px)
		li:nth-child(2)
			margin 0 pxtorem(205px)
		li
			width pxtorem(50px)
			float left
			color white
			text-align center
			img
				width 100%
				height pxtorem(45px)
	.conter
		height pxtorem(159px)
		overflow hidden
		.preve
			margin-left pxtorem(100px)
			border-radius pxtorem(20px) 0 0 pxtorem(20px)
		.next
			border-radius 0 pxtorem(20px) pxtorem(20px) 0
		button
			width pxtorem(270px)
			height pxtorem(76px)
			margin-top pxtorem(54px)
			background black
			color white
			float left
			outline none
			border pxtorem(1px) solid #ccc
	.bookfont
		position fixed
		width 100%
		height pxtorem(282px)
		bottom pxtorem(115px)
		color white
		left 0
		background rgba(0,0,0,0.9)
		.fontsize
			overflow hidden
			font-size pxtorem(30px)
			margin-top pxtorem(41px)
			span:nth-child(1)
				margin-left pxtorem(43px)
			span:nth-child(2)
				border-radius pxtorem(30px)
				width pxtorem(200px)
				margin-left pxtorem(49px)
				margin-right pxtorem(27px)
				border pxtorem(1px) solid #ccc
			span:nth-child(3)
				border-radius pxtorem(30px)
				width pxtorem(200px)
				border pxtorem(1px) solid #ccc
			span
				display inline-block
				height pxtorem(60px)
				text-align center
				line-height pxtorem(60px)
		.bgcolor
			margin-top pxtorem(50px)
			overflow hidden
			.bg
				width pxtorem(62px)
				font-size pxtorem(30px)
				display inline-block
				text-indent 0
				margin-left pxtorem(41px)
				float left
				margin-right pxtorem(70px)
			span
				display inline-block
				width pxtorem(71px)
				height pxtorem(71px)
				border pxtorem(1px) solid #ccc
				border-radius 50%
				float left
				margin-right pxtorem(20px)
	.catalogs
		position fixed
		z-index 100
	.colors
		position fixed
		width 100%
		height 100%
		top 0
		left 0
		background rgba(0,0,0,0.4)
		z-index 1
	.colorhidden
		display none

</style>
