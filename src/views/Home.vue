<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <img alt="ReqCheck logo" src="../assets/req2.png" style="width:412px">
    <Select/>
  </div>
</template>

<script>
// @ is an alias to /src

import Select from '@/components/Select.vue'

export default {
  name: 'home',
  components: {
    Select,
  }
}
</script>
