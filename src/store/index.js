import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
  currentTime: 0,
  duration: 0,
  play:true,
  timeList:[],
  windowWidth:document.documentElement.clientWidth,
  marginTop:'',
  left:'',
  hash:null,
  songimg:null,
  songname:null,
  isAuto:'',
  isShow:false,
  who:'start',
  show:false,
  slide:false,
  list:[],
  cue:false,
  msg:'',
  currents:0,
  active:0,
  height:0
};

const mutations={
  updateCurrentTime (state, time) {
    state.currentTime = time;
    let totalTime=state.duration;
    let speed=state.windowWidth/totalTime;
    var counter;
    if(state.play){
      counter=setTimeout(()=> {
        state.left=speed*state.currentTime.toFixed(0);
      },1000);
      for(let i=0;i<state.timeList.length;i++){
        if(state.currentTime>state.timeList[i]){
          state.active=i;
          state.marginTop=40 * i;
        }
      }
    }else{
      clearTimeout(counter)
    }
  },
  plays(state){
    let audio= document.getElementById('audio');
    if(state.play){
      audio.play();
      state.who='stop';
    }else{
      audio.pause();
      state.who='start';
    }
  },
  updatehash(state,hash){
    state.hash=hash
  },
  showlist(state){
    state.slide=true;
  },
  deleteit(state,index){
    state.list.splice(index,1);
  },
};

const actions={
  prev({commit,state},index){
    if(state.list.length==1){
      state.cue=true;
      state.msg='就一首大哥,往上怎么切？';
      setTimeout(()=>{
        state.cue=false;
      },1500);
      return;
    }
    let i = index === 0 ? state.list.length - 1 : (--index);
    commit('updatehash',state.list[i].hash);
    setTimeout(()=>{
      commit('plays')
    },1000)
  },
  next({commit,state},index){
    if(state.list.length==1){
      state.cue=true;
      state.msg='就一首大哥,往下怎么切？';
      setTimeout(()=>{
        state.cue=false;
      },1500);
      return;
    }
    let i = index === state.list.length - 1 ? 0 : (++index);
    commit('updatehash',state.list[i].hash);
    setTimeout(()=>{
      commit('plays')
    },1000)

  }
};

const  getters={
  currentTime: state => {
    function time(time) {
      return time < 10 ? '0' + time : time;
    }
    let min = parseInt(state.currentTime / 60);
    let second = parseInt(state.currentTime % 60);
    second = time(second);
    return min + ':' + second
  },
  height:state=>{
    return document.documentElement.clientHeight-90-42;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
