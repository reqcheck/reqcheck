<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/req.png" style="height:200px; width=100px">
    <Select/>
  </div>
</template>

<script>
// @ is an alias to /src

import Select from '@/components/Select.vue'

export default {
  name: 'home',
  components: {
    Select
  }
}
</script>
