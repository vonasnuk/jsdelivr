import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    library: null
  },
  mutations: {
    updateLibrary(state, library){
      state.library = library
    },
  },
  actions: {
    async fetchGetLibrary(ctx, searchData){
      const res = await fetch(`https://data.jsdelivr.com/v1/package/npm/${searchData}`);
      const results = await res.json();
      const library = await results
      console.log(library)
      ctx.commit('updateLibrary', library)
    }
  },
  getters: {
    getLibraryBySearch(state){
      return state.library
    }
  }
})
