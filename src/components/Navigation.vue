<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <!-- Brand/logo -->
    <a class="navbar-brand" href="#">Super Heroes</a>

    <!-- Links -->
    <ul class="mr-auto navbar-nav">
      <li class="nav-item" v-for="(route) in navPath" :key="route.path">
        <router-link class="nav-link" :to="route.path"> {{ route.name }} </router-link>
      </li>
    </ul>

    <!-- Search Box -->
    <div id="serachDiv"></div>
  </nav>
</template>

<script>
import { routes } from '../router.js'

export default {
  name: 'MainMenus',
  data() {
    return {
      navPath: routes
    }
  },
  props: {
  }
}
</script>

