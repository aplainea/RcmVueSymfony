import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const MAJ = store => {
  // subscribe est appelé quand le store est modifié...
  store.subscribe((mutation, state) => {
    // console.log('store MAJ')
    sessionStorage.setItem('store', JSON.stringify(state));
  })
}


export default new Vuex.Store({
  state: {
    connecte: false,
    login: '',
  },
  plugins: [
    MAJ
  ],
  mutations: {
    initialiseStore(state) {
      if(sessionStorage.getItem('store') && sessionStorage.getItem('token')) {
        // console.log('store initialisé par session Storage')
        this.replaceState(Object.assign(state, JSON.parse(sessionStorage.getItem('store'))))
      }
    },
    connect(state,login) {
      state.connecte=true
      let user = login.split("@")
      state.login = user[0]
    }
  },
  actions: {
  },

  modules: {
  }
})
