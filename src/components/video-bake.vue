<!--废弃-->
<template>
  <div class="song">
    <h1>{{author}}</h1>
    <img :src="imgsrc" id="blur" width="100%">
    <img :src="imgsrc" class="img">
    <audio :src="audiosrc" id="audio" autoplay ></audio>
    <ul class="showsongs"></ul>
    <div class="line">
      <i></i>
    </div>
    <div class="clearfix">
      <span class="starttime fl">0:00</span>
      <span class="endtime fr">3:35</span>
    </div>
    <div class="button">
      <img src="../../static/prev.png" class="prev">
      <img src="../../static/stop.png" class="stop">
      <img src="../../static/next.png" class="next">
    </div>
  </div>
</template>

<script>

  export default {
    name: 'hello',
    data() {
      return {
        audiosrc: '',
        imgsrc: '',
        author: ''
      }
    },
    methods: {

    },
    mounted() {
      console.log(this)
      this.$http.get('http://127.0.0.1:3000/', {params: {'url': 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=CB7EE97F4CC11C4EA7A1FA4B516A5D97'}}, {emulateJSON: true}).then(res => {
        console.log(res.body);
        //图片
        this.imgsrc = res.body.data.img;
        //时长
        const alltime = res.body.data.timelength;
        const min=parseInt((alltime/1000)/60);
        const second=parseInt((alltime/1000)%60);
        document.getElementsByClassName('endtime')[0].innerHTML=min+':'+second;
        //歌名
        this.author = res.body.data.audio_name;
        //歌曲路径
        this.audiosrc = res.body.data.play_url;
        //歌曲文字
        const musics = res.body.data.lyrics.split('\n');
        const regs = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;
        for (let i = 0; i < musics.length - 1; i++) {
          let matches = regs.exec(musics[i]);
          let lyric = matches[4];
          let li = document.createElement('li');
          li.id = i;
          li.innerHTML = lyric;
          document.getElementsByClassName('showsongs')[0].appendChild(li);
        }
        let result = function () {
          let reult = [];
          for (let i = 0; i < musics.length - 1; i++) {
            let matches = regs.exec(musics[i]);
            let time = parseFloat(matches[1]) * 60 + parseFloat(matches[2]) + parseFloat(matches[3]) / 1000;
            reult.push(time);
          }
          return reult;
        };
        let audio = document.getElementById('audio');
        audio.ontimeupdate = function (e) {
          let clientwidth=document.documentElement.clientWidth;
          let speed=clientwidth/(alltime/1000);
          let arry = result();
          for (let i = 0; i < musics.length - 1; i++) {
            if (this.currentTime > arry[i]) {
              document.getElementById(i).setAttribute('class', 'current');
              document.getElementsByClassName('showsongs')[0].scrollTop = 20 * i;
            }
          }
          function time(time) {
            return time < 10 ? '0' + time : time;
          }
          let min = parseInt(this.currentTime / 60);
          let second = parseInt(this.currentTime % 60);
          second = time(second);
          document.getElementsByClassName('starttime')[0].innerHTML=min + ':' + second
          setTimeout( ()=> {
            document.getElementsByClassName('line')[0].getElementsByTagName('i')[0].style.left=speed*this.currentTime.toFixed(0)+'px';
          },1000)
        };
        document.getElementsByClassName('stop')[0].onclick=function () {
          if(audio.paused){
            audio.play();
          }else{
            audio.pause();
          }
        }
      }, err => {
        console.log(err)
      })
    }
  }
</script>

<style lang="scss">
  h1 {
    position: absolute;
    text-align: center;
  }

  h1 {
  @extend h1;
    top: 20px;
    width: 100%;
    color: white;
    z-index: 999;
  }

  audio {
    width: 100%;
  }

  .showsongs {
  @extend h1;
    top: 40%;
    width: 100%;
    height: 100px;
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
    top: 60px;
    left: 50%;
    width: 200px;
    height: 200px;
    margin-left: -100px;
    box-shadow: 1px 2px 3px #ccc;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }
  .line{
    position: relative;
    width: 100%;
    height: 3px;
    margin: 10px 0;
    background: black;
    i{
      position: absolute;
      top: -6px;
      left: 0;
      display: block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: blue;
    }
  }
  .button{
    width: 100%;
    text-align: center;
  }
</style>
