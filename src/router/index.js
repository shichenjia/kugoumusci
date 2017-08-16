import Vue from 'vue'
import Router from 'vue-router'
import Audio from '@/components/audio'
import Main from '@/components/main'
import Ranking from '@/components/ranking'
import Songs from '@/components/songs'
import Singer from '@/components/singer'
import Search from '@/components/search'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/main'
    },
    {
      name: 'main',
      path: '/main',
      component: Main
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path:'/singer',
      name:'singer',
      component:Singer
    }
  ]
})
