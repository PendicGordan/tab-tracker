<template>
      <panel title="Songs">
        <router-link
          :to="{name: 'songs-create'}"
          slot="action"
        >
          <v-btn fab
                 light
                 medium
                 absolute
                 right
                 middle
                 class="green accent-2"
                 :to="{name: 'songs-create'}"
          >
            <v-icon>fas fa-plus</v-icon>
          </v-btn>
        </router-link>
        <div slot="content">
          <p v-if="songs.length == 0">No songs</p>
          <div v-for="song in songs"
               :key="song.title"
               class="song">
            <v-layout>
              <v-flex xs6>
                <div class="song-title">
                  {{song.title}}
                </div>
                <div class="song-artist">
                  {{song.artist}}
                </div>
                <div class="song-genre">
                  {{song.genre}}
                </div>
                <v-btn
                  dark
                  class="cyan"
                  :to="{name: 'song',
                                      params: {
                                        songId: song.id}
                                      }">
                  View
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <img class="album-image" :src="song.albumImage" />
              </v-flex>
            </v-layout>
          </div>
        </div>
      </panel>
</template>

<script>
  import SongsService from '@/services/SongsService'

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
    methods: {
      /*navigateTo(route) {
        this.$router.push(route)
      }*/
    },
    watch: {
      '$route.query.search': {
        immediate: true,
        async handler(value) {
          console.log(value)
          this.songs = (await SongsService.index(value)).data
          console.log(this.songs)
        }
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
