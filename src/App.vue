<template>
  <NavigationView/>
  <router-view></router-view>
</template>

<script>
import NavigationView from './components/Navigation.vue'

export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    NavigationView
  },
  methods: {
  },
  mounted(){
  }
}
</script>
