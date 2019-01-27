<template>
  <div id="app">
    <div id="SchoolSelect">
        <p>First, select your school:</p>
        <vue-select ref="select" :options="schoolOptions" v-model="school"></vue-select>
    </div>
    <div id="CourseSelect" v-if="school != ''">
    <br>
    <p>Great! Now select your classes below:</p>
        <vue-select ref="select" multiple :options="options" v-model="selected"></vue-select><br>
    </div>
    <div id="buttons" v-if="selected.length != 0">
    <p>Nice! Now hit go to check out your prerequesite graph!</p>
    <sui-button class="ui fade animated button" @click="deselect">
      <sui-button-content visible>Reset</sui-button-content>
      <sui-button-content hidden>
        <sui-icon name="undo icon"/>
      </sui-button-content>
    </sui-button>
    <sui-button class="ui fade animated button" @click="makeGraph">
      <sui-button-content visible>Go!</sui-button-content>
      <sui-button-content hidden>
        <sui-icon name="checkmark icon" />
      </sui-button-content>
    </sui-button>
    </div>
  </div>
</template>

<script>

  import vueSelect from 'vue-select'
  import * as uvic_data from '@/assets/uvic_data.json'
  import * as ubc_data from '@/assets/ubc_data.json'
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
 
  export default {
    name: 'Select',
    data () {
        return {
            selected: [],
            show_courses: false,
            schoolOptions: ["University of Victoria", "University of British Columbia"],
            schoolLookup: {
                "University of Victoria": uvic_data,
                "University of British Columbia": ubc_data
            },
            school: "",
            used_data: uvic_data
        }
    },
    computed: {
        
        options: function() {
        
        let options = []
        for (var course in this.used_data.default){
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
        },
        
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
    watch: {
        school: function() {
            this.used_data = this.schoolLookup[this.school]
        }
    }
  }
</script>

<style scoped>
body {
    font-family: 'Open Sans', sans-serif;
}
#app {
  max-width: 35em;
  margin: 1em auto;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
}
</style>