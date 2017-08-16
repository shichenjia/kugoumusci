<template>
  <div id="app">
    <p-header></p-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <p-footer v-if="show"></p-footer>
    <p-audio v-show="isShow"></p-audio>
    <transition name="slide">
      <p-list v-if="slide"></p-list>
    </transition>
  </div>
</template>

<script>
import PHeader from './components/component/header.vue'
import PAudio from './components/audio.vue';
import PFooter from './components/component/footer.vue'
import PList from './components/component/list.vue'
import {mapState} from 'vuex'
export default {
  name: 'app',
  components:{
    PAudio,
    PFooter,
    PHeader,
    PList
  },
  computed:{
    ...mapState([
      'isShow',
      'show',
      'slide'
    ])
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  ::-webkit-scrollbar{
    width: 2px;
  }
.slide-enter-active {
  animation: slideInUp .5s;
}
.slide-leave-active {
  animation: slideInUp .5s reverse;
}
</style>
