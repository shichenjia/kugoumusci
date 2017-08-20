<template>
  <div class="lists">
    <div class="collection clearfix">
      <span>歌曲列表</span>
      <em @click="deleteall">清空</em>
    </div>
    <ul class="listwarpper" :style="{height:listheight+'px'}">
      <li class="clearfix" v-for="(li,index) in list">
        <em @click="changsong(li.hash,li.id)" :class="{active:li.id==currents}" :key="li.id">{{li.name}}</em>
        <span class="delete" @click="deletethis(index)"></span>
      </li>
    </ul>
    <span @click="close" class="close">关闭</span>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapState([
        'slide',
        'hash',
        'deleteit',
        'currents',
        'list'
      ]),
      listheight() {
        return document.documentElement.clientHeight - 40 - 31
      }
    },
    methods: {
      ...mapMutations([
        'plays'
      ]),
      changsong(hash,keyid) {
        this.$store.state.currents=keyid;
        this.$store.commit('updatehash', hash);
        setTimeout(() => {
          this.$store.commit('plays');
          this.$store.state.slide = false;
        }, 1000);
      },
      deleteall() {
        this.list.splice(0, this.list.length)
      },
      deletethis(index) {
        this.$store.commit('deleteit', index)
      },
      close() {
        this.$store.state.slide = false;
      }
    }
  }
</script>
<style lang="scss">
  .lists {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, .5);

  .collection {
    padding: 15px 10px;
    color: white;

  span {
    float: left;
    width: 80%;
  }

  em {
    float: right;
    display: inline-block;
    width: 20%;
    background: url(../../../static/clear.png) no-repeat 1rem center;
    background-size: 16px 16px;
    text-align: right;
    font-style: normal;
  }

  }
  .listwarpper {
    width: 100%;
    overflow-y: auto;

  li {
    padding: 10px;
    color: white;
    border-top: 1px solid white;

  em {
    float: left;
    width: 80%;
    text-align: left;
    font-style: normal;
    @at-root .active{
      color:red;
      font-weight: bold;
    }
  }

  span {
    float: left;
    width: 20%;
    height:20px;
    text-align: right;
    background: url(../../../static/close.png) no-repeat right center;
    background-size: 32px 32px;
  }

  }
  }
  span.close {
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid white;
    text-align: center;
    color: white;
  }

  }
</style>
