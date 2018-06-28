<template>
  <v-layout >
    <v-flex xs6 offset-xs3 >
      <panel title="Login">
        <div slot="content">
          <div>
            <form name="tab-tracker-form">
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="email"
                autocomplete="new-password"
              ></v-text-field>
              <br>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="password"
                type="password"
              ></v-text-field>
            </form>
            <br>
          </div>
          <v-alert :value="true" type="error" v-if="error" icon="fas fa-info">
            {{error}}
          </v-alert>
          <v-btn @click="login" class="cyan" dark>Login</v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async login () {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUser', response.data.user);
          console.log(response)
          this.$router.push({
            name: 'songs'
          });
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    },
    watch: {
      email (value) {
        //console.log('Email changes to ' + value)
      }
    },
    mounted () {

    }
  }
</script>
<style scoped>
  .error {
    color: #FFF;
  }
</style>
