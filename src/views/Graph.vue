<template>
  <div class="home">
    <GraphInset v-bind:courses="['ECE 100', 'ECE 101', 'ECE 200', 'ECE 210', 'ECE 300', 'ECE 301', 'ECE 299', 'ENGR 400', 'CSC 100']"></GraphInset>
  </div>
</template>

<script>
// @ is an alias to /src
import GraphInset from '@/components/GraphInset.vue'

export default {
  name: 'graph',
  components: {
    GraphInset
  }
}
</script>
