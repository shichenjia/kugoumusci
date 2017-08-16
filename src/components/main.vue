<template>
   <div class="main" :style="{height:mainheight+'px'}">
       <div class="mainWarpper">
         <div class="imglist">
           <ul class="boxs">
             <li v-for="img in imgs">
               <img :src="img.imgurl">
             </li>
           </ul>
           <p></p>
         </div>
       </div>
       <ul class="songslist">
         <li class="clearfix" v-for="(item,index) in songs">
           <span :title="item.name" @click="getsong(index,item.hash)">{{item.name}}</span>
         </li>
       </ul>
     <transition name="zoom">
       <div class="cue"  v-if="cue">添加歌曲列表成功!</div>
     </transition>
     </div>
   </div>
</template>
<script>
  import {mapState,mapMutations} from 'vuex'
  import PHeader from './component/header.vue'
    export default {
      data() {
        return {
          songs:[],
          imgs:[],
          cue:false
        }
      },
      computed:{
        ...mapState([
          'hash',
          'list'
        ]),
        mainheight(){
          return document.documentElement.clientHeight-90-42;
        },
      },
      components:{
        PHeader
      },
      methods: {
        ...mapMutations([
          'updatehash',
          'showlist',
          'plays'
        ]),
        getsong(index,hash){
          this.$store.state.list.push(this.songs[index]);
          this.$store.state.list = Array.from(new Set(this.$store.state.list));
          localStorage.setItem('list',JSON.stringify(this.$store.state.list));
          this.$store.commit('updatehash',hash);
          this.$store.state.show=true;
          this.cue=true;
          setTimeout(()=>{
            this.$store.commit('plays');
            this.cue=false;
          },1000)
        },
      },
      created(){
        this.$http.get('http://127.0.0.1:3000/',{params:{url:'http://m.kugou.com/?json=true'}},{emulateJSON:true}).then(res=>{
          console.log(res.body);
           for(let i in res.body.data){
            this.songs.push({
              'hash':res.body.data[i].hash,
              'name':res.body.data[i].filename.split('【')[0]
            });
           }
           for(let i in res.body.banner){
             this.imgs.push({
               'imgurl':res.body.banner[i].imgurl
             });
           }
        });
      }
    }
</script>
<style lang="scss">
  @mixin bg($img){
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0 5px;
    background: url(../../static/#{$img}.png) no-repeat center;
    background-size: 16px 16px;
  }
  .main {
     overflow:auto;
  .imglist {
    width: 100%;
    height: 160px;
    overflow: hidden;

  .boxs {

  li {

  img {
    width: 100%;
    height: 160px;
  }

  }
  }
  }
  .songslist li {
    padding: 10px 5px;
    border-bottom: 1px solid #ccc;

  span {
    float: left;
    display: block;
    width: 100%;
    height: 20px;
    /*overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;*/
    cursor:pointer;
  }

  .icon {
    width:30%;
    text-align:right;
    position: relative;
  em {
    position: absolute;
    top:0;
    right: 0;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 50%;
    text-align: center;
    border: 1px solid #1296db;
    color: #1296db;
  }
  }
  }
  .cue{
    position: absolute;
    top:50%;
    left:50%;
    width: 150px;
    height: 50px;
    line-height:50px;
    margin-top: -15px;
    margin-left: -75px;
    background: #1296db;
    color: white;
    border-radius: 5px;
    text-align: center;
  }
  }
  .zoom-enter-active {
    animation: zoomIn .5s;
  }
  .zoom-leave-active {
    animation: zoomOut .5s;
  }
</style>
