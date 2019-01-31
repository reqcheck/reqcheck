<template>
  <div id="app">
    <div id="SchoolSelect">
        <br>
        <br>
        <br>       
        <multiselect ref="select" v-model="school" :options="schoolOptions" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="false" placeholder="Pick your school" label="name" openDirection="top" track-by="name">
            <template slot="Select" slot-scope="{ options, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
        </multiselect>
        <p>First, select your school.</p> 
    </div>
    <br>
    <div id="CourseSelect" v-if="school != ''">   
        <multiselect ref="select" v-model="selected" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="false" placeholder="Select a Course" label="label" track-by="name" openDirection="top" :max-height="150">
            <template slot="Select" slot-scope="{ options, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
        </multiselect>
        <p>Great! Now select your classes. </p>
    </div>
    <div id="buttons" v-if="selected.length != 0">
        <br><br><br>
    <p>Nice! Now hit go to check out your prerequisite graph!</p>
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

  //import vueSelect from 'vue-select'
  import * as uvic_data from '@/assets/uvic_data.json'
  import * as ubc_data from '@/assets/ubc_data.json'
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  import Multiselect from 'vue-multiselect'
 
  export default {
    name: 'Select',
    data () {
        return {
            selected: [],
            show_courses: false,
            schoolOptions: [{name: "University of Victoria"},{name: "University of British Columbia"}],
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
            var long_name = course + ": " + this.used_data.default[course].name
        options.push({name: course, label: long_name})
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
            selectCourses: 'selectCourses',
            selectSchool: 'selectSchool'
        } ),
        makeGraph(){
            let result = this.selected.map(a => a.name)
            if(this.selected.length === 0){
                alert("Please select at least one course!")
            } else {
                this.selectCourses(result)
                this.selectSchool(this.school)
                this.$router.push('graph')
            }
        }
    },
    components: {
        Multiselect
    },
    watch: {
        school: function() {
            this.used_data = this.schoolLookup[this.school.name]
        }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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