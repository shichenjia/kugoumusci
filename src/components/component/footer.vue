<template>
    <div class="footer clearfix">
      <div class="footer-left fl" @click="goinfo">
        <img :src="imgsrc" width="70" height="70">
      </div>
      <div class="footer-right fr">
        <p>{{songname}}</p>
        <div class="button">
          <div :class="who" @click="stop"></div>
          <div class="next" @click="changnext"></div>
          <div class="list" @click="showlist"></div>
        </div>
      </div>
      <i :style="{width:left+'px'}"></i>
    </div>
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
    data(){
      return{
        imgsrc:null
      }
    },
    computed:{
      ...mapState([
        'songimg',
        'songname',
        'isShow',
        'who',
        'left',
        'list'
      ])
    },
      methods:{
        ...mapMutations([
          'plays',
          'showlist'
        ]),
        ...mapActions([
          'next'
        ]),
        goinfo(){
          this.$store.state.isShow=true;
        },
        stop(){
          this.$store.commit('plays');
          this.$store.state.play= !this.$store.state.play;
        },
        changnext(){
          for(let i=0;i<this.list.length;i++){
            if(this.songname===this.list[i].name){
              this.$store.dispatch('next', i);
              break;
            }
          }
        }
      },
    watch:{
      songimg:function (val,old) {
        this.imgsrc=val;
      }
    }
    }
</script>
<style lang="scss">
  @mixin bg($img){
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 0 5px;
    background: url(../../../static/#{$img}.png) no-repeat center;
    background-size: 32px 32px;
  }
  .footer{
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    padding: 10px 0;
    background: skyblue;
    .footer-left{
      width: 70px;
      margin:0 15px;
    }
    .footer-right{
     width:60%;
      p{
        height:20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        color: white;
      }
      .button{
         margin:10px 0;
          .start{
            @include bg(start)
          }
          .stop{
            @include bg(stop)
          }
         .next{
           @include bg(next)
         }
         .list{
           @include bg(list)
         }
      }
    }
    i{
      position: absolute;
      bottom: 0;
      left:0;
      height:2px;
      background: white;
    }
  }
</style>
