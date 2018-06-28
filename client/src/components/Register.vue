<template>
  <v-layout >
    <v-flex xs6 offset-xs3 >
      <panel title="Register">
        <div slot="content">
              <div>
                <form name="tab-tracker-form" autocomplete="off">
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                  ></v-text-field>
                  <br>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="new-password"
                  ></v-text-field>
                </form>
                <br>
              </div>
          <v-alert :value="true" type="error" v-if="error" icon="fas fa-info">
            {{error}}
          </v-alert>
            <v-btn @click="register" class="cyan" dark>Register</v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({
          name: 'songs'
        });
        console.log(response)
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
    /*setTimeout(() => {
      this.email = 'hello world'
    }, 1000)*/
  }
}
</script>
<style scoped>
  .error {
    color: #FFF;
  }
</style>
