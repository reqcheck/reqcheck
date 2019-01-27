import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    selectedCourses: []
}

const actions = {
    selectCourses(context, courses){
        console.log('selecting courses')
        context.commit('selectCourses', courses);
    }
}

const mutations = {
    selectCourses(state, courses){
        console.log('courses mutations')
        state.selectedCourses = courses
    }
}

const getters = {
    selectedCourses(state){
      console.log('getting selected courses')
      return state.selectedCourses
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  })