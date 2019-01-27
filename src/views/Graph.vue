<template>
  <div class="home">
    <p>
        <span style="color: #e84a4a">Red</span> denotes classes that you haven't selected which are required as prerequesities.
    </p>
    <GraphInset v-bind:courses=selectedCourses></GraphInset>
    <router-link to="/">Home</router-link>
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
