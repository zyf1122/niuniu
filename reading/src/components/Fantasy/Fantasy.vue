<template>
<div class="fantasy">
	<my-header class="header">
		<strong slot="left" @click="backFn">
        <img src="../../assets/image/back.png">
       	{{type}}
      </strong>
	</my-header>
	<ul>
		<li v-for="(item,index) in list" @click="detailFn(index)">
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
		<infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
			<span slot="no-more">没有更多消息了</span>
		</infinite-loading>
	</ul>
</div>
</template>

<script>
import axios from "axios";
import Header from "../Header.vue";
import InfiniteLoading from 'vue-infinite-loading';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     booklistArr:[],
     type:"玄幻",
     list:[],
     url:'this.src="' + require('../../assets/image/people.jpg') + '"'
    }
  },
  created(){
  	axios.get(`${this.common.api}/booklist`).then(res => {
  		var arr=res.data;
  		var arr1=[];
  		arr.forEach((item,index)=>{
  			if(item.type==this.$route.query.id){
  					arr1.push(item);
  			}
  		});
  		this.booklistArr=arr1;
  		// console.log(arr1)
  	});
  	this.type=this.$route.query.id;
  },
  methods:{
  	infiniteHandler($state) {
  		var that=this;
  		// console.log(this.booklistArr);
  	if (this.list.length<=this.booklistArr.length) {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 6; i++) {
          temp.push(that.booklistArr[i]);
        }
        this.list = this.list.concat(temp);
        $state.loaded();
      }, 1000);}else{
      	 this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
      }
    },
  	backFn:function(){
  		this.$router.go(-1);
  	},
  	detailFn:function(index){
  		this.$router.push({path:'/introduce',query: {id: this.booklistArr[index+1].id}})
  		// console.log(this.booklistArr[index+1].id)
  	}
  },
  components:{
  	"my-header":Header,
  	InfiniteLoading,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../assets/common/stylus/common.styl"
.fantasy
	padding-top pxtorem(100px)
	.header
		position fixed
		top 0
		left 0
		strong
			overflow hidden
			line-height pxtorem(70px)
			img
				float left
	ul
		width 100%
		margin-top pxtorem(30px)
		background-color white
		padding-bottom pxtorem(30px)
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
