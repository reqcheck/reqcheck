<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <img alt="ReqCheck logo" src="../assets/req2.png" style="width:412px">
    <SelectSchool/>
    <Select/>
  </div>
</template>

<script>
// @ is an alias to /src

import Select from '@/components/Select.vue'
import SelectSchool from '@/components/SelectSchool.vue'

export default {
  name: 'home',
  components: {
    Select,
    SelectSchool,
  }
}
</script>
