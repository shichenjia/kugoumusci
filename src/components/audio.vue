<template>
  <div class="song">
    <img src="../../static/back.png" @click="goback" width="32px" style="margin: 10px">
    <h1>{{songname}}</h1>
    <img :src="songimg" id="blur" width="100%">
    <img :src="songimg" class="img">
    <audio :src="audiosrc" id="audio" v-on:timeupdate="updateTime" loop></audio>
    <div class="showlyrics">
      <ul :style="{marginTop:'-'+marginTop+'px'}">
        <li v-for="lyric in lyrics" :id="lyric.id">{{lyric.ly}}</li>
      </ul>
    </div>
    <div class="line">
      <i :style="{left:left+'px'}"></i>
    </div>
    <div class="clearfix">
      <span class="starttime fl">{{currentTime}}</span>
      <span class="endtime fr"></span>
    </div>
    <div class="button">
      <div class="prev" @click="changprev"></div>
      <div :class="who" @click="stop"></div>
      <div class="next" @click="changnext"></div>
      <div class="list" @click="showlist"></div>
    </div>
    <transition name="zoom">
      <div class="cue" v-if="cue">
        {{msg}}
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'

  export default {
    data() {
      return {
        audiosrc: '',
        author: '',
        lyrics: [],
        activeClass: 'current'
      }
    },
    computed: {
      ...mapState([
        'currentTime',
        'play',
        'marginTop',
        'left',
        'hash',
        'songimg',
        'songname',
        'isShow',
        'who',
        'slide',
        'cue',
        'list',
        'msg'
      ]),
      ...mapGetters([
        'currentTime'
      ]),
    },
    methods: {
      updateTime() {
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('audio').currentTime));
      },
      ...mapMutations([
        'plays',
        'updateCurrentTime',
        'showlist',
        'updatehash'
      ]),
      ...mapActions([
        'prev',
        'next'
      ]),
      goback() {
        this.$store.state.isShow = false;
      },
      stop() {
        this.$store.state.play = !this.$store.state.play;
        this.$store.commit('plays');
      },
      changprev() {
        for(let i=0;i<this.list.length;i++){
          console.log((this.songname).indexOf(this.list[i].name))
          if(this.songname===this.list[i].name){
            this.$store.dispatch('prev', i);
            continue;
          }
          console.log('遗漏的信息'+JSON.stringify(this.list));
        }
      },
      changnext(){
        for(let i=0;i<this.list.length;i++){
          if(this.songname===this.list[i].name){
            this.$store.dispatch('next', i);
            break;
          }
        }
      },
    },
    watch: {
      hash: function (val, oldVal) {
        let hash = val;
        this.$http.get('http://127.0.0.1:3000/', {params: {'url': 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + hash + ''}}, {emulateJSON: true}).then(res => {
          console.log(res.body);

          function time(time) {
            return time < 10 ? '0' + time : time;
          }

          const alltime = res.body.data.timelength;
          const min = parseInt((alltime / 1000) / 60);
          const second = parseInt((alltime / 1000) % 60);
          document.getElementsByClassName('endtime')[0].innerHTML = min + ':' + time(second);
          this.$store.state.duration = (alltime / 1000);
          this.$store.state.songname = res.body.data.audio_name;
          this.$store.state.songimg = res.body.data.img;
          this.audiosrc = res.body.data.play_url;
          const musics = res.body.data.lyrics.split('\n');
          const regs = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;
          this.lyrics = [];
          for (let i = 0; i < musics.length - 1; i++) {
            let matches = regs.exec(musics[i]);
            let lyric = matches[4];
            this.lyrics.push({
              'ly': lyric,
              'id': i
            });
          }

          function result() {
            let reult = [];
            for (let i = 0; i < musics.length - 1; i++) {
              let matches = regs.exec(musics[i]);
              let time = parseFloat(matches[1]) * 60 + parseFloat(matches[2]) + parseFloat(matches[3]) / 1000;
              reult.push(time);
            }
            return reult;
          }

          this.$store.state.timeList = result();
        }, err => {
          console.log(err)
        });
      }
    }
  }
</script>
<style lang="scss">
  h1 {
    position: absolute;
    text-align: center;
  }

  @mixin bg($img) {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url(../../static/#{$img}.png) no-repeat center;
    background-size: 32px 32px;
  }
  .song {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;

  h1 {
  @extend h1;
    top: 60px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: white;
    z-index: 999;
  }

  audio {
    width: 100%;
  }

  .showlyrics {
  @extend h1;
    top: 40%;
    width: 100%;
    height: 115px;
    overflow-y: auto;
    font-size: 16px;

  li.current {
    color: red;
    font-weight: bold;
  }

  }
  #blur {
    filter: blur(10px);
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    -o-filter: blur(10px);
  }

  .img {
  @extend h1;
    top: 100px;
    left: 50%;
    width: 150px;
    height: 150px;
    margin-left: -75px;
    box-shadow: 1px 2px 3px #ccc;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }

  .line {
    position: relative;
    width: 100%;
    height: 3px;
    margin: 10px 0;
    background: #bbb;

  i {
    position: absolute;
    top: -6px;
    left: 0;
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #1296db;
  }

  }
  .button {
    width: 100%;
    text-align: center;

  .prev {
  @include bg(prev)
  }

  .next {
  @include bg(next)
  }

  .start {
  @include bg(start)
  }

  .stop {
  @include bg(stop)
  }

  .list {
  @include bg(list)
  }

  }
  .cue {
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    text-align: center;
    border-radius: 5px;
    background: #1296db;
    color: white;
  }

  }
  .zoom-enter-active {
    animation: zoomIn .5s;
  }

  .zoom-leave-active {
    animation: zoomOut .5s;
  }
</style>
