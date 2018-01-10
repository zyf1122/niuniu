<template>
	<div class="wrap">
		<div class="div">
			<p class="p">新书抢鲜</p>
			<ul>
				<li v-for="(item,index) in newArr" @click="introduceFn(index)">
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
		<div class="div">
			<p class="p">畅销完本</p>
			<ul>
				<li v-for="(item,index) in sellArr" @click="introduceFn1(index)">
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
		<div class="div">
			<p class="p">猜你喜欢</p>
			<ul>
				<li v-for="(item,index) in likeArr" @click="introduceFn2(index)">
					<img v-bind:src="item.images" :onerror="url">
					<div>
						<p>{{item.name}}</p>
						<p>{{item.intro}}</p>
						<div>
							<img src="../../assets/image/man.png">
							<span>{{item.author}}</span>
							<span>{{item.wordcount}}万</span>
							<span>{{item.serialize}}</span>
							<span>{{item.type}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
  // name: 'HelloWorld',
  data () {
    return {
     newArr:[],
     sellArr:[],
     likeArr:[],
     url:'this.src="' + require('../../assets/image/people.jpg') + '"'
    }
  },
  created(){
  	axios.get(`${this.common.api}/booklist`).then(res => {
         // console.log(res);
         var arr=res.data;
         var arr1=[];
         arr.forEach((item, index) => {
          //简单更改下首页加载数据太多,可自行修改
          if (index < 3) {
              arr1.push(item)
          }
        });
         this.newArr=arr1;
         // console.log(arr1)
         // 畅销书
         var arr2=[];
         arr.forEach((item,index)=>{
         	if(item.serialize=="完本"){
         		arr2.push(item)
         	}
         })
         // var str=arr2.slice(0,3);
         this.sellArr=arr2;
         // 猜你喜欢
         var arr3=[];
         arr.forEach((item,index)=>{
         	if(index>20&&index<24){
         		arr3.push(item)
         	}
         });
         this.likeArr=arr3;
         
  })
	},
	methods:{
		introduceFn:function(index){
  			this.$router.push({path:'/introduce',query: {id: this.newArr[index].id}})
  },
  introduceFn1:function(index){
  			this.$router.push({path:'/introduce',query: {id: this.sellArr[index].id}})
  },
  introduceFn2:function(index){
  			this.$router.push({path:'/introduce',query: {id: this.likeArr[index].id}})
  }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.div
	background-color white
	padding-top pxtorem(29px)
	padding-left pxtorem(30px)
	margin-top pxtorem(30px)
	.p
		font-size pxtorem(37px)
		font-weight bold
		border-left pxtorem(5px) solid red
		text-indent pxtorem(10px)
	ul
		width 100%
		li:nth-child(2)
			border-top pxtorem(1px) solid #ccc
			border-bottom pxtorem(1px) solid #ccc
		li
			overflow hidden
			padding-top pxtorem(30px)
			padding-bottom pxtorem(34px)
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
						display inlin-block
						height pxtorem(26)
						padding pxtorem(3px)
						line-height pxtorem(33px)
						font-size pxtorem(18px)
						border pxtorem(1px) solid #4284ed
						color #4284ed
						float right
					span:nth-child(4)
						display inlin-block
						height pxtorem(26)
						padding pxtorem(3px)
						line-height pxtorem(33px)
						font-size pxtorem(18px)
						color red
						float right
						border pxtorem(1px) solid red
						margin-right pxtorem(5px)
						margin-left pxtorem(5px)
					span:nth-child(5)
						display inlin-block
						height pxtorem(26)
						padding pxtorem(3px)
						line-height pxtorem(33px)
						color gray
						border pxtorem(1px) solid #ccc
						float right
						font-size pxtorem(18px)


</style>
