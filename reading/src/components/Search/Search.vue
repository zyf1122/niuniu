<template>
<div class="search">
	<div class="top">
		<input type="text" placeholder="搜你所想的" v-model="mes" v-on:input="ipFn">
		<span @click="canleFn">取消</span>
		<img src="../../assets/image/search1.png">
	</div>
	<div v-show="listArr==''?true:false">
		<p class="p">大家都在搜</p>
		<div class="font">
			<p v-for="(item,index) in fontArr" @click="selectFn(index)">{{item}}</p>
		</div>
	</div>
	<ul v-show="listArr==''?false:true">
		<li v-for="(item,index) in listArr" @click="detailFn(index)">
			<img v-bind:src="item.images">
			<div>
				<p>{{item.name}}</p>
				<p>{{item.intro}}</p>
				<div>
					<img src="../../assets/image/man.png" :onerror="url">
					<span>{{item.author}}</span>
					<span>{{item.wordcount}}万</span>
					<span>{{item.serialize}}</span>
					<span>{{item.type}}</span>
				</div>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     fontArr:["圣墟","一念永恒","择天记","全职高手","全能运动员","重生完美时代","不朽凡人","一剑飞仙","玄界之门","天影"],
     mes:'',
     booklistArr:[],
     listArr:[],
     url:'this.src="' + require('../../assets/image/people.jpg') + '"'
    }
  },
  created(){
  	axios.get(`${this.common.api}/booklist`).then(res => {
  		var arr=res.data;
  		var arr1=[];
  		arr.forEach((item,index)=>{
  			// if(item.type=="都市"){
  					arr1.push(item);
  			// }
  		});
  		this.booklistArr=arr1;
  		// console.log(arr1)
  	});
  },
  methods:{
  	canleFn:function(){
  		this.$router.go(-1);
  	},
  	ipFn:function(){
  		var listArr=[];
  		if(this.mes==""){
  			this.listArr=[];
  			return;
  		}
  		for(var i=0;i<this.booklistArr.length;i++){
  			if(this.booklistArr[i].name.indexOf(this.mes) != -1){
  				listArr.push(this.booklistArr[i]);
  			}
  		}
  		this.listArr=listArr;
  	},
  	selectFn:function(index){
  		var arr=this.booklistArr;
  		for(var i=0;i<arr.length;i++){
  			if(arr[i].name.indexOf(this.fontArr[index]) != -1){
  				this.listArr.push(arr[i]);
  			}
  		}
  		// console.log(this.fontArr[index])
  	},
  	detailFn:function(index){
  		this.$router.push({path:'/introduce',query: {id: this.listArr[index].id}})
  		// console.log(this.booklistArr[index+1].id)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.search
	background white
	position absolute
	width 100%
	height 100%
	top 0
	left 0
	.top
		width 100%
		height pxtorem(90px)
		padding-top pxtorem(15px)
		position relative
		background white
		position fixed
		top 0
		left 0
		input
			width pxtorem(593px)
			height pxtorem(71px)
			border 0
			margin-left pxtorem(32px)
			text-indent pxtorem(71px)
			background #f5f6f8
		span
			font-size pxtorem(30px)
			margin-left pxtorem(30px)
		img
			width pxtorem(38px)
			height pxtorem(38px)
			position absolute
			top pxtorem(32px)
			left pxtorem(51px)
	.p
		width 100%
		height pxtorem(93px)
		line-height pxtorem(93px)
		text-indent pxtorem(32px)
		background #f5f6f8
		font-size pxtorem(30px)
		margin-top pxtorem(110px)
	.font
		margin-top pxtorem(10px)
		padding-left pxtorem(32px)
		p
			height pxtorem(60px)
			line-height pxtorem(60px)
			display inline-block
			border pxtorem(1px) solid #ccc
			border-radius pxtorem(30px)
			text-align center
			font-size pxtorem(29px)
			color gray
			padding 0 pxtorem(18px)
			margin-right pxtorem(17px)
			margin-top pxtorem(18px)
	ul
		width 100%
		margin-top pxtorem(30px)
		background-color white
		padding-bottom pxtorem(30px)
		margin-top pxtorem(110px)
		li
			overflow hidden
			padding-top pxtorem(30px)
			padding-bottom pxtorem(34px)
			margin-left pxtorem(30px)
			border-bottom pxtorem(1px) solid #ccc
			img
				width pxtorem(170px)
				height pxtorem(225px)
				display inlin-block
				float left
			div
				width pxtorem(482px)
				display inlin-block
				margin-left pxtorem(40px)
				float left
				p:nth-child(1)
					font-size pxtorem(40px)
					font-weight bold
					margin-bottom pxtorem(30px)
				p:nth-child(2)
					color gray
					font-size pxtorem(30px)
					overflow hidden
					text-overflow -o-ellipsis-lastline
					text-overflow ellipsis
					display -webkit-box
					line-clamp 2
					-webkit-line-clamp 2
					-webkit-box-orient vertical
				div
					overflow hidden
					line-height 2
					margin-left 0
					margin-top pxtorem(45px)
					img
						width pxtorem(35px)
						height pxtorem(40px)
						float left
						margin-top pxtorem(3px)
					span:nth-child(2)
						float left
						font-size pxtorem(26px)
						margin-left pxtorem(13px)
					span:nth-child(3)
						height pxtorem(26px)
						display inlin-block
						padding pxtorem(3px)
						line-height pxtorem(33px)
						font-size pxtorem(18px)
						border pxtorem(1px) solid #4284ed
						color #4284ed
						float right
					span:nth-child(4)
						height pxtorem(26px)
						display inlin-block
						padding pxtorem(3px)
						line-height pxtorem(33px)
						font-size pxtorem(18px)
						color red
						float right
						border pxtorem(1px) solid red
						margin-right pxtorem(5px)
						margin-left pxtorem(5px)
					span:nth-child(5)
						height pxtorem(26px)
						display inlin-block
						padding pxtorem(3px)
						line-height pxtorem(33px)
						color gray
						border pxtorem(1px) solid #ccc
						float right
						font-size pxtorem(18px)



</style>
