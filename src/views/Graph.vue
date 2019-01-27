<template>
  <div class="home">
    <GraphInset courses="Yee"></GraphInset>
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
