<template>
  <div class="singer" :style="{height:height+'px'}">
     <ul class="singerlist clearfix">
       <li v-for="singer in singerlist">
         <img :src="singer.imgurl" @click="getinfo(singer.id,singer.name)">
         <span @click="getinfo(singer.id)">{{singer.name}}</span>
       </li>
     </ul>
    <transition name="slide">
     <div class="info"  :style="{height:height+'px'}" v-if="slide">
       <img src="../../static/back.png" @click="goback" width="32px" style="position: absolute;top:5px;left:15px;">
       <p>{{classname}}</p>
       <ul class="infolist clearfix">
         <li v-for="info in infolist">
           <img :src="info.singerimg" @click="getsingerinfo(info.singerid,info.sinername)">
           <span @click="getsingerinfo(info.singerid,info.sinername)">{{info.sinername}}</span>
         </li>
       </ul>
     </div>
    </transition>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
    export default {
      data(){
        return{
          singerlist:[],
          slide:false,
          infolist:[],
          classname:'',
          singername:''
        }
      },
      computed:{
        ...mapGetters([
          'height'
        ])
      },
      methods:{
        getinfo(id,name){
          this.$http.get('http://127.0.0.1:3000/', {params: {url: 'http://m.kugou.com/singer/list/'+id+'?json=true'}}, {emulateJSON: true}).then(res => {
            this.infolist=[];
            for(let i=0;i<res.body.singers.list.info.length;i++){
              let imgurl=res.body.singers.list.info[i].imgurl;
               this.infolist.push({
                 'singerid':res.body.singers.list.info[i].singerid,
                 'sinername':res.body.singers.list.info[i].singername,
                 'singerimg':imgurl.replace(/\{size\}/,150)
               })
            }
            this.slide=true;
            this.classname=name;
          },error=>{
            console.log(error)
          });
        },
        getsingerinfo(id,name){
          console.log(id,name)
          //这块由于接口没有返回数据也不好去处理，所以放弃了这块的东西
          /*this.$http.get('http://127.0.0.1:3000/', {params: {id:id}}, {emulateJSON: true}).then(res => {
           console.log('http://m.kugou.com/singer/info/'+id+'&json=true')
            console.log(res.body);
          },error=>{
            console.log(error)
          });*/
        },
        goback(){
          this.slide=false;
        }
      },
      created(){
        this.$http.get('http://127.0.0.1:3000/', {params: {url: 'http://m.kugou.com/singer/class&json=true'}}, {emulateJSON: true}).then(res => {
          console.log(res.body);
          for(let i=0;i<res.body.list.length;i++){
              this.singerlist.push({
                'name':res.body.list[i].classname,
                'imgurl':res.body.list[i].imgurl,
                'id':res.body.list[i].classid
              })
          }
        });
      }
    }
</script>
<style lang="scss">
  .singer{
    overflow-y:auto;
    .singerlist,.infolist{
      padding:25px 20px;
      li{
        float: left;
        width: 150px;
        text-align: center;
        margin-right: 50px;
        margin-bottom: 10px;
        &:nth-child(2n){
          margin-right:0;
         }
        img{
          width: 150px;
          height:150px;
        }
        span{
          display: block;
          margin: 10px 0;
        }
      }
    }
    .info{
      position: absolute;
      top:40px;
      z-index:99;
      width: 100%;
      background: white;
      overflow-y:auto;
      p{
        text-align: center;
        line-height: 45px;
      }
    }
  }
  .slide-enter-active {
    animation: slideInUp .5s;
  }
  .slide-leave-active {
    animation: slideInUp .5s reverse;
  }
</style>
