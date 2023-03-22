<template>
  <v-container fluid>
      <v-app-bar
      color="orange"
      dark
      >
      <v-spacer/>
      <!-- <pre style="color: black;">{{ $route }}</pre> -->
      <v-btn v-if="!isLoginPage" outlined class="ml-3">
        <router-link to="/">Главная</router-link>
      </v-btn>
      <v-btn v-if="!isLoginPage" outlined class="ml-3">
        <router-link to="/photo">Фото</router-link>
      </v-btn>
      <v-btn outlined class="ml-3">
        <router-link to="/login">login</router-link>
      </v-btn>
      </v-app-bar>
    </v-container>
</template>

<script>
export default {
  name: 'TheNavbar',
  computed: {
    isLoginPage () {
      return this.$router.currentRoute.name === 'Login'
    }
  },
  created () {

  }
}
</script>
