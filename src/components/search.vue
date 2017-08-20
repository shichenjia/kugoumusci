<template>
  <div class="search">
    <div class="searchWarpper">
      <div>
        <div style="text-align: center;">
          <input type="text" v-model="keywords" key="inner" class="keywords">
          <button @click="search" class="searchit">搜索</button>
        </div>
        <p>热门关键字</p>
        <div class="hotwords">
          <span v-for="hotword in hotwords" @click="hotsearch(hotword.keyword)">{{hotword.keyword}}</span>
        </div>
      </div>
    </div>
    <transition name="fadeDown">
      <div class="result" v-if="fadeDown" :style="{height:height+'px'}">
        <div>
          <img src="../../static/back.png" class="goback" @click="goback" width="32px" style="margin: 10px">
          <input type="text" v-model="keywords" key="top" class="keywords">
          <button @click="search" class="searchit">搜索</button>
        </div>

        <ul>
          <li v-for="(result,index) in results" @click="getsong(index,result.hash)">
            {{result.name}}
          </li>
        </ul>
        <transition name="zoom">
          <div class="cue" v-if="cue">添加歌曲列表成功!</div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapMutations,mapState,mapGetters} from 'vuex'
  export default {
    data() {
      return {
        keywords: '',
        hotwords: [],
        fadeDown:false,
        results:[],
        cue:false
      }
    },
    computed:{
      ...mapGetters([
        'height'
      ]),
      ...mapState([
        'currents',
        'list',
        'show'
      ])
    },
    methods: {
      ...mapMutations([
        'updatehash',
        'plays'
      ]),
      getsong(index,hash){
        this.$store.state.currents=index;
        this.$store.state.list.push(this.results[index]);
        this.$store.state.list = Array.from(new Set(this.$store.state.list));
        this.$store.commit('updatehash', hash);
        this.$store.state.show = true;
        this.cue = true;
        setTimeout(() => {
          this.$store.commit('plays');
          this.cue = false;
        }, 1000)
      },
      search() {
        this.results=[];
        this.$http.get('http://127.0.0.1:3000/', {params: {url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=' + encodeURI(this.keywords) + '&page=1&pagesize=20&showtype=1'}}, {emulateJSON: true}).then(res => {
          console.log(res.body);
          for(let i=0;i<res.body.data.info.length;i++){
            this.results.push({
              'name':res.body.data.info[i].filename.split('【')[0],
              'hash':res.body.data.info[i].hash,
              'id':i
            });
          }
          setTimeout(()=>{
            this.fadeDown=true;
          },500)
        }, error => {
          console.log(error)
        })
      },
      hotsearch(word) {
        this.keywords = word;
        this.results=[];
        this.$http.get('http://127.0.0.1:3000/', {params: {url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=' + encodeURI(word) + '&page=1&pagesize=20&showtype=1'}}, {emulateJSON: true}).then(res => {
          console.log(res.body);
          for(let i=0;i<res.body.data.info.length;i++){
            this.results.push({
              'name':res.body.data.info[i].filename.split('【')[0],
              'hash':res.body.data.info[i].hash,
              'id':i
            });
          }
          setTimeout(()=>{
            this.fadeDown=true;
          },500)
        }, error => {
          console.log(error)
        })
      },
      goback(){
         this.fadeDown=false;
      }
    },
    created() {
      this.$http.get('http://127.0.0.1:3000/', {params: {url: 'http://mobilecdn.kugou.com/api/v3/search/hot?format=json&plat=0&count=30'}}, {emulateJSON: true}).then(res => {
        console.log(res.body);
        for (let i = 0; i < res.body.data.info.length; i++) {
          this.hotwords.push({
            'keyword': res.body.data.info[i].keyword
          });
        }
      }, error => {
        console.log(error)
      })
    }
  }
</script>
<style lang="scss">
  .public{
    border:1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }
  .search {
    padding: 5px;
    .keywords{
      width: 50%;
      background: white;
      @extend .public
    }
    .searchit{
      width: 20%;
      background: #1296db;
      color:white;
      @extend .public
    }
  .hotwords {

  span {
    display: inline-block;
    padding: 5px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  }
  .result{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    z-index: 99;
    background:white;
    overflow:auto;
    ul{
      padding:10px;
      li{
        border-bottom:1px solid #ccc;
        padding:10px;
        span{
          display: block;
        }
      }
    }
  .cue {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index:100;
    width: 150px;
    height: 50px;
    line-height: 50px;
    margin-top: -15px;
    margin-left: -75px;
    background: #1296db;
    color: white;
    border-radius: 5px;
    text-align: center;
  }

  }
  }
  .fadeDown-enter-active {
    animation: fadeInRight .5s;
  }

  .fadeDown-leave-active {
    animation: fadeInRight .5s re;
  }
  .zoom-enter-active {
    animation: zoomIn .5s;
  }

  .zoom-leave-active {
    animation: zoomOut .5s;
  }
</style>
