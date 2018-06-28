<template>
  <panel title="Search">
    <div slot="content">
      <v-text-field
        name="search"
        label="Search by Title, Artist, Album, Genre"
        id="search"
        v-model="search"
      ></v-text-field>
    </div>
  </panel>
</template>

<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        search: ''
      }
    },
    watch: {
      search: _.debounce(async function(value) {
        const route = {
          name: 'songs'
        }
        if(this.search !== '') {
          route.query = {
            search: this.search
          }
        }

        this.$router.push(route)
      }, 700),
      '$route.query.search': {
        immediate: true,
        handler(value) {
          this.search = value
        }
      }
    }
  }
</script>
<style scoped>

</style>
