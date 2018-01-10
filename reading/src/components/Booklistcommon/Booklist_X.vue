<template>
<div class="wrap">
	<div class="div">
		<p class="p">热门小说</p>
		<ol>
			<li>
				<div v-for="(item,index) in hotArr" @click="introduceFn(index)">
					<img v-bind:src="item.images" :onerror="url">
					<p>{{item.name}}</p>
					<p>{{item.author}}</p>
				</div>
			</li>
		</ol>
	</div>
	<div class="div">
		<p class="p">排行榜</p>
		<ol>
			<li>
				<div v-for="(item,index) in topArr" @click="introduceFn1(index)">
					<img v-bind:src="item.images" :onerror="url">
					<p>{{item.name}}</p>
					<p>{{item.author}}</p>
				</div>
			</li>
		</ol>
	</div>
	<div class="div">
		<p class="p">限时免</p>
		<ol>
			<li>
				<div v-for="(item,index) in freeArr" @click="introduceFn2(index)">
					<img v-bind:src="item.images" :onerror="url">
					<p>{{item.name}}</p>
					<p>{{item.author}}</p>
				</div>
			</li>
		</ol>
	</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  // name: 'HelloWorld',
  data () {
    return {
     hotArr:[],
     topArr:[],
     freeArr:[],
     url:'this.src="' + require('../../assets/image/people.jpg') + '"'
    }
  },
  created() {
    axios.get(`${this.common.api}/booklist`).then(res => {
         // console.log(res);
         var arr=res.data;
         var arr1=[];
         arr.forEach((item, index) => {
          //简单更改下首页加载数据太多,可自行修改
          if (index < 20) {
            if (index % 2 == 1) {
              arr1.push(item)
            }
          }
        });
         this.hotArr=arr1;
         // 排行榜
         var arr2=[];
         arr.forEach((item,index) =>{
         	if(index<20){
         		if(index%2==0){
         			arr2.push(item);
         		}
         	}
         });
         this.topArr=arr2;
         // 限时免
         var arr3=[];
         arr.forEach((item,index)=>{
         	if(index>20&&index<40){
         		if(index%2==1){
         			arr3.push(item);
         		}
         	}
         });
         this.freeArr=arr3;
        })
  },
  methods:{
  	introduceFn:function(index){
  		this.$router.push({path:'/introduce',query: {id: this.hotArr[index].id}})
  },
  introduceFn1:function(index){
  		this.$router.push({path:'/introduce',query: {id: this.topArr[index].id}})
  },
  introduceFn2:function(index){
  		this.$router.push({path:'/introduce',query: {id: this.freeArr[index].id}})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' scoped>
@import "../../assets/common/stylus/common.styl"
.div
	background-color white
	width pxtorem(750px)
	height pxtorem(450px)
	padding-top pxtorem(28px)
	margin-top pxtorem(19px)
	.p
		margin-bottom pxtorem(23px)
		margin-left pxtorem(29px)
		text-indent pxtorem(10px)
		font-size pxtorem(37px)
		border-left pxtorem(5px) solid red
	ol
		overflow scroll
		li
			position relative
			overflow-x auto
			overflow-y hidden
			white-space nowrap
			text-indent 7px
			margin-bottom pxtorem(21px)
			div
				width pxtorem(210px)
				display inline-block
				margin-right pxtorem(16px)
				img
					width pxtorem(210px)
					height pxtorem(261px)
				p
					font-size pxtorem(30px)
					line-height pxtorem(50px)
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
</style>
