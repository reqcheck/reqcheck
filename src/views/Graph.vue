<template>
  <div class="home">
    <p>
        <span style="color: #e84a4a">Red</span> denotes classes that you haven't selected which are required as prerequesities.
    </p>
    <p>
        <router-link to="/">Go back to course selection</router-link>
    </p>
    <GraphInset v-bind:courses=selectedCourses></GraphInset>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

// @ is an alias to /src
import GraphInset from '@/components/GraphInset.vue'

export default {
  data () {
      return {
          courses: this.$router.params
      }
  },
  name: 'graph',
  components: {
    GraphInset
  },
  computed: {
      ...mapGetters([
          'selectedCourses'
      ])
  }
}
</script>
