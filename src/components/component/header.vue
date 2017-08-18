<template>
  <header class="header clearfix">
    <ul class="menu fl">
      <li><router-link to="/">新歌榜</router-link></li>
      <li><router-link to="/ranking">排行榜</router-link></li>
      <li><router-link to="/songs">歌单</router-link></li>
      <li><router-link to="/singer">歌手</router-link></li>
      <li><router-link to="/search"><img src="../../../static/search.png" width="20" height="20"></router-link></li>
    </ul>
  </header>

</template>
<script>
    export default {

    }
</script>
<style lang="scss">
  @mixin bg($img){
    display: inline-block;
    width: 10%;
    height: 42px;
    background: url(../../../static/#{$img}.png) center no-repeat;
    background-size:32px 32px;
  }
  .menu{
    display: flex;
    width: 100%;
    text-align:center;
    height:42px;
    li{
      flex:1;
      padding:10px 0 0;
      cursor:pointer;
      a{
        display: inline-block;
        width: 100%;
        padding-bottom: 10px;
        @at-root .router-link-exact-active {
          border-bottom: 2px solid deepskyblue;
        }
      }

      }
  }
</style>
