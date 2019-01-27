import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    selectedCourses: []
}

const actions = {
    selectCourses(context, courses){
        context.commit('selectCourses', courses);
    }
}

const mutations = {
    selectCourses(state, courses){
        state.selectedCourses = courses
    }
}

const getters = {
    selectedCourses(state){
      return state.selectedCourses
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  })