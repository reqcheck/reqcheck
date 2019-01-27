<template>
  <div id="app">
    <h1>Vue Select - Select All</h1>
        <vue-select ref="select" multiple :options="options" v-model="selected"></vue-select>
    <button class="btn btn-default" @click="selectAll">Select All</button>
    <button class="btn btn-default" @click="makeGraph">Go!</button>
  </div>
</template>

<script>

  import vueSelect from 'vue-select'
  import * as data from '@/assets/sampledata.json'
  import { mapActions } from 'vuex'
 
  export default {
    name: 'Select',
    data () {
        return {
            selected: [],
        }
    },
    computed: {
        options: function() {
        let options = []
        for (var course in data.default){
        options.push(course)
        }
        return options
        }
    }, 
    methods: {
        selectAll() {
            const select = this.$refs.select;
            select.options.forEach(option => {
                select.select(option);
            });
      
      // bug caused by onAfterSelect
            select.open = false
        },
        ...mapActions( {
            selectCourses: 'selectCourses'
        } ),
        makeGraph(){
            this.selectCourses(this.selected)
            this.$router.push('graph')
        },
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