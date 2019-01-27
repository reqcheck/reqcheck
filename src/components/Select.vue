<template>
  <div id="app">
    <p>Select your classes below:</p>
        <vue-select ref="select" multiple :options="options" v-model="selected"></vue-select>
    <button class="btn btn-default" @click="deselect">Reset</button>
    <button class="btn btn-default" @click="selectAll">Select All</button>
    <button class="btn btn-default" @click="makeGraph">Go!</button>
  </div>
</template>

<script>

  import vueSelect from 'vue-select'
  import * as data from '@/assets/uvic_data.json'
  //import * as ubc_data from '@/assets/ubc_data.json'
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
 
  export default {
    name: 'Select',
    data () {
        return {
            selected: [],
            show_courses: false
        }
    },
    computed: {
        options: function() {
        
        let options = []
        for (var course in data.default){
        options.push(course)
        }
        return options
        },
        ...mapGetters([
            'selectedCourses',
            'selectedSchool'
        ]),
        selectedSchool: function() {
            return this.selectedSchool()
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
        deselect() {
            this.selected = []
        },
        ...mapActions( {
            selectCourses: 'selectCourses'
        } ),
        makeGraph(){
            console.log(this.selected.length)
            if(this.selected.length === 0){
                alert("Please select at least one course!")
            } else {
                this.selectCourses(this.selected)
                this.$router.push('graph')
            }
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