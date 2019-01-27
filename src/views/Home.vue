<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/req.png">
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
