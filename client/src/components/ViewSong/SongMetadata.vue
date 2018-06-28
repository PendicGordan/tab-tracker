<template>
  <panel title="Song Metadata">
    <div slot="content">
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
              :to="{name: 'song-edit',
                    params() {
                      return {
                        songId: song.id
                      }
                    }
                   }">
              Edit
            </v-btn>
            <v-btn
              v-if="isUserLoggedIn && !bookmark"
              dark
              class="cyan"
              @click="bookmark1"
              >
              Bookmark
            </v-btn>
            <v-btn
              v-if="isUserLoggedIn && bookmark"
              dark
              class="cyan"
              @click="unbookmark"
            >
              Unbookmark
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <img class="album-image" :src="song.albumImage" />
            <br>
            {{ song.album }}
          </v-flex>
        </v-layout>
    </div>
  </panel>
</template>

<script>
  import {mapState} from 'vuex'
  import BookmarksService from '@/services/BookmarksService'

  export default {
    data() {
      return {
        bookmark: null
      }
    },
    props: [
      'song'
    ],
    methods: {
      /*navigateTo(route) {
        this.$router.push(route)
      }*/
      async bookmark1() {
        try {
          const temp = await BookmarksService.index({
            songId: this.$store.state.route.params.songId,
            userId: this.$store.state.user.id
          })

          if(temp.data.length != 0) return;

          const temp2 = (await BookmarksService.post({
            songId: this.song.id,
            userId: this.$store.state.user.id
          })).data

          this.bookmark = {
            bookmarkId: temp2.id,
            songId: temp2.SongId,
            userId: temp2.UserId
          }

          console.log(this.bookmark)
        } catch(err) {
          console.log(err)
        }
      },
      async unbookmark() {
        try {
          await BookmarksService.delete(this.bookmark.bookmarkId)
          this.bookmark = null
        } catch(err) {
          console.log(err)
        }
      }
    },
    async mounted() {
          if(this.isUserLoggedIn) {
            try {
              const temp = await BookmarksService.index({
                songId: this.user.id,
                userId: this.$store.state.user.id
              })
              console.log(temp.data[0])
              if(temp.data[0] != undefined) {
                this.bookmark = {
                  bookmarkId: temp.data[0].bookmarkId,
                  songId: temp.data[0].songId,
                  userId: temp.data[0].userId
                }
              }
              console.log(this.bookmark)
            } catch(err) {
              console.log(err)
            }
          }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ])
    }
  }
</script>
<style scoped>
  textarea {
    width: 100%;
    font-family: monospace;
    border: none;
    height: 600px;
    border-style: none;
    border-color: transparent;
    overflow: auto;
    padding: 40px;
  }
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
