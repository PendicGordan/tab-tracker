<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <router-link
        class="home"
        tag="span"
        :to="{name: 'songs'}"
        flat
        dark>
        TabTracker
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
         flat
         class="home"
         dark
         :to="{name: 'songs'}">
        Browser
      </v-btn>
    </v-toolbar-items>

    <v-spacer>

    </v-spacer>

    <v-toolbar-items>
      <v-btn
        :to="{name: 'login'}"
        class="home"
        flat
        dark
        v-if="!this.$store.state.isUserLoggedIn">
        Login Up
      </v-btn>
      <v-btn
        :to="{name: 'register'}"
        class="home"
        flat
        dark
        v-if="!this.$store.state.isUserLoggedIn"
      >
        Sign Up
      </v-btn>
      <v-btn
        @click="logout"
        class="home"
        flat
        dark
        v-if="this.$store.state.isUserLoggedIn">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    /*navigateTo(route) {
      this.$router.push(route)
    },*/
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      // redirect user to the login page
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>
<style scoped>
  .home {
    cursor: pointer;
  }
  .home:hover {
    color: #000;
  }
</style>
