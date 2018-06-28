<template>
    <v-layout >
      <v-flex xs6>
        <songs-bookmarks />
      </v-flex>
      <v-flex xs6 >
        <songs-search-panel />
        <songs-panel class="mt-2" />
      </v-flex>
    </v-layout>
</template>

<script>
  import SongsPanel from '@/components/Songs/SongsPanel'
  import SongsSearchPanel from '@/components/Songs/SongsSearchPanel'
  import SongsService from '@/services/SongsService'
  import SongsBookmarks from '@/components/Songs/SongsBookmarks'

  export default {
    data() {
      return {
        songs: []
      }
    },
    async mounted() {
      // do a request to the backends for songs
      this.songs = (await SongsService.index()).data
    },
    components: {
      SongsPanel,
      SongsSearchPanel,
      SongsBookmarks
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>
<style scoped>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
  }
  .song-title {
    font-size: 30px;
  }
  .song-artist {
    font-size: 24px;
  }
  .song-genre {
    font-size: 18px;
  }
  .album-image {
    width: 70%;
  }
</style>
