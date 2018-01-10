<template>
<div class="introduce">
	<my-header class="header">
	  <strong slot="left" @click="backFn">
        	<img src="../../assets/image/back.png">
       	{{introduce.name}}
      </strong>
      <span slot="right" @click="homeFn"></span>
	</my-header>
	<div class="detail">
		<img v-bind:src="introduce.images">
        <div>
          <p>{{introduce.name}}</p>
          <p>作者：{{introduce.author}}</p>
          <p>分类：{{introduce.type}}</p>
          <p>{{introduce.wordcount}}万字</p>
          <p>评分：{{introduce.ratings}}</p>
        </div>
        <button @click="readingFn">免费试读</button>
        <button @click='lodingFn'>加入书架</button>
	</div>
    <p class="p">{{introduce.intro}}</p>
    <div class="label">
        <p>类别标签</p>
        <span>{{introduce.type}}</span>
        <span>东方玄幻</span>
    </div>
    <ul>
        <p class="like">喜欢本书的人也喜欢</p>
        <li v-for="(item,index) in likeArr" @click="likeFn(index)">
            <div>
                <img :src="item.images" :onerror="url">
                <p>{{item.name}}</p>
            </div>
        </li>
    </ul>
	<span v-show="boundshow" class="bound">{{bound}}</span>
</div>
</template>

<script>
import axios from "axios";
import Header from "../Header.vue";
import { mapGetters, mapActions } from 'vuex';
import localEvent from '../../store/local';

export default {
  // name: 'HelloWorld',
  data () {
    return {
     introduce:{},
     likeArr:[],
     bound:"加入书架成功",
     boundshow:false,
     url:'this.src="' + require('../../assets/image/people.jpg') + '"'
    }
  },
  created(){
  	axios.get(`${this.common.api}/booklist?id=${this.$route.query.id}`).then(res => {
  		// console.log(res);
  		this.introduce=res.data;
  		// console.log(this.introduce)
  	});
    axios.get(`${this.common.api}/booklist`).then(res => {
        var arr=res.data;
        // var arr1=arr.slice(35,38);
        var num1=parseInt(Math.random()*181);
        var num2=parseInt(Math.random()*181);
        var num3=parseInt(Math.random()*181);
        var arr1=[];
        var arr2=arr1.concat(arr[num1],arr[num2],arr[num3]);
        this.likeArr=arr2;
        // console.log(arr2)
    });
    // console.log(this.$route.query.id )
  },
  methods:{
    ...mapActions([
        'setBook',
        'setCatalog'
    ]),
  	backFn:function(){
  		this.$router.go(-1);
  	},
    homeFn:function(){
      this.$router.push({path:'/home'})
    },
    readingFn:function(){
        this.setBook(this.introduce.id);
        this.$router.push({path:'/reading',query: {book: this.introduce.id}});
        localEvent.StorageSetter("book",this.introduce.id);
        // 更新书本内容
        this.setCatalog(1);
        // 存储在最近阅读中
        var arr=localEvent.StorageGetter('readlybook')||[];
        if(arr.length<=0){
            arr.push(this.introduce);
            localEvent.StorageSetter("readlybook",arr);
        }else{
            for(var i=0;i<arr.length;i++){
            if(arr[i].id==this.introduce.id){
                return;
        }
      }
            arr.push(this.introduce);
            localEvent.StorageSetter("readlybook",arr);
    }
        // console.log(localEvent.StorageGetter("readlybook"));
    },
    lodingFn:function(){
        var bol=localEvent.StorageGetter("loadbol");
        if(bol=="false"){
            this.$router.push({path:'/'});
            return;
        }
        // 存储书架数组
        var arr=localEvent.StorageGetter('bookshelf')||[];
        if(arr<=0){
            this.boundshow=true;
            this.bound="成功加入书架";
            arr.push(this.introduce);
            localEvent.StorageSetter("bookshelf",arr);
            var that=this;
            setTimeout(function(){
                that.boundshow=false;
            },500)
            // console.log(localEvent.StorageGetter("bookshelf"))
        }else{

        for(var i=0;i<arr.length;i++){
            if(arr[i].id==this.introduce.id){
                this.bound="已经在书架啦~";
                this.boundshow=true;
                var that=this;
                setTimeout(function(){
                    that.boundshow=false;
                },500)
                // console.log(localEvent.StorageGetter("bookshelf"))
                return;
            }
        }
                arr.push(this.introduce);
                localEvent.StorageSetter("bookshelf",arr);
                this.boundshow=true;
                this.bound="成功加入书架";
                var that=this;
                setTimeout(function(){
                    that.boundshow=false;
                },500)
                // console.log(localEvent.StorageGetter("bookshelf"))
    }
    },
    likeFn:function(index){
        this.$route.query.id=this.likeArr[index].id;
        this.$router.push({path:'/introduce',query:{id:this.likeArr[index].id}});
        // location.reload();
        this.$router.go(0);
        // console.log(this.likeArr[index].id);
    }
  },
  computed: mapGetters({
    book:'getbook'
  }),
  components:{
  	"my-header":Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../assets/common/stylus/common.styl"
.introduce
    background white
    padding-top pxtorem(100px)
    .header
        line-height pxtorem(70px)
        overflow hidden
        position fixed
        top 0
        left 0
        strong
        	img
        		float left
        span
        	span
        		width pxtorem(49px)
        		height pxtorem(46px)
        		display inline-block
        		background-image url("../../assets/image/all.png")
        		background-repeat no-repeat
        		background-position pxtorem(-65px) pxtorem(0)
    .detail
        overflow hidden
        margin-top pxtorem(30px)
        margin-left pxtorem(42px)
        img
            width pxtorem(209px)
            height pxtorem(262px)
            float left
        div
            width pxtorem(380px)
            display inline-block
            margin-left pxtorem(53px)
            float left
            p:nth-child(1)
                font-size pxtorem(45px)
                font-weight bold
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            p
                font-size pxtorem(30px)
                line-height pxtorem(56px)
        button
            width pxtorem(320px)
            height pxtorem(69px)
            text-align center
            line-height 2
            font-size pxtorem(31px)
            border 0
            outline none
            margin-top pxtorem(51px)
            border-radius pxtorem(8px)
        button:nth-of-type(1)
            margin-right pxtorem(27px)
            background red
    .p
        max-height pxtorem(241px)
        margin-left pxtorem(42px)
        line-height pxtorem(56px)
        padding-top pxtorem(49px)
        padding-bottom pxtorem(49px)
        text-indent pxtorem(68px)
        font-size pxtorem(34px)
        text-overflow -o-ellipsis-lastline
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        line-clamp 5
        -webkit-line-clamp 5
        overflow hidden
    .label
        margin-left pxtorem(42px)
        border-top pxtorem(1px) solid #ccc
        border-bottom pxtorem(1px) solid #ccc
        padding-top pxtorem(46px)
        padding-bottom pxtorem(46px)
        p
            font-size pxtorem(34px)
            font-weight bold
            margin-bottom pxtorem(28px)
        span
            display inline-block
            height pxtorem(50px)
            border pxtorem(1px) solid #ccc
            border-radius pxtorem(8px)
            font-size pxtorem(31px)
            text-align center
            line-height pxtorem(50px)
            padding 0 pxtorem(8px)
            margin-right pxtorem(20px)
    ul
        margin-left pxtorem(40px)
        overflow hidden
        margin-top pxtorem(48px)
        padding-bottom pxtorem(60px)
        .like
            font-size pxtorem(39px)
            font-weight bold
            margin-bottom pxtorem(50px)
        div
            width pxtorem(210px)
            float left
            margin-right pxtorem(18px)
            text-align center
            img
                width pxtorem(210px)
                height pxtorem(292px)
            p
                font-size pxtorem(30px)
                width 100%
                text-overflow ellipsis
                overflow hidden
                white-space nowrap
    .bound
        position fixed
        top 45%
        left 35%
        z-index 100
        color white
        border-radius pxtorem(50px)
        font-size pxtorem(30px)
        padding pxtorem(20px)
        background rgba(0,0,0,0.7)



</style>
