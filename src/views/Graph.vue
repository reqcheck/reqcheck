<template>
  <div class="home">
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
