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
  msg:''
};

const mutations={
  updateCurrentTime (state, time) {
    state.currentTime = time;
    let totalTime=state.duration;
    let speed=state.windowWidth/totalTime;
    var counter=setTimeout(()=> {
      state.left=speed*state.currentTime.toFixed(0);
    },1000);
    if(state.play){
      for(let i=0;i<state.timeList.length;i++){
        if(state.currentTime>state.timeList[i]){
          document.getElementById(i).setAttribute('class','current');
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
    let i = index === 0 ? state.list.length - 1 : (--index);
    commit('updatehash',state.list[i].hash);
    setTimeout(()=>{
      commit('plays')
    },1000)
  },
  next({commit,state},index){
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
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
