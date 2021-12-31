import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityInfo:{}
  },
  mutations: {
    //自定义修改数据方法
    editCityInfo(state,val){
      state.cityInfo=val
    }
  },
  actions: {
  },
  modules: {
  }
})
