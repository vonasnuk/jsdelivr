import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        library: null,
        status: true
    },
    mutations: {
        updateLibrary(state, library) {
            state.library = library
        },
    },
    actions: {
        async fetchGetLibrary(ctx, searchData) {
            const res = await fetch(`https://data.jsdelivr.com/v1/package/npm/${searchData}`).then((response) => {
                if (response.ok) {
                    return response
                } else {
                    throw new Error(`Something went wrong. Status: ${response.status}`);
                }
            })
            const results = await res.json();
            const library = await results
            console.log(library)
            ctx.commit('updateLibrary', library)
        }
    },
    getters: {
        getLibraryBySearch(state) {
            return state.library
        }
    }
})
