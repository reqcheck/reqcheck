<template>
  <div id="app">
    <p>First, select your school below:</p>
        <vue-select ref="select" :options="options" v-model="school"></vue-select>
  </div>
</template>

<script>

  import vueSelect from 'vue-select'
  import { mapActions } from 'vuex'
 
  export default {
    name: 'SelectSchool',
    data () {
        return {
            options: ['University of British Columbia', 'University of Victoria'],
            school: "",
        }
    },
    methods: {
        ...mapActions( {
            selectSchool: 'selectSchool'
        } )
    },
    watch: {
        school () {
            console.log("schoool updated")
            this.selectSchool(this.school)
        }
    },
    components: {
        vueSelect
    },
  }
</script>

<style scoped>
body {
    font-family: 'Open Sans', sans-serif;
}
#app {
  max-width: 35em;
  margin: 1em auto;
}
</style>