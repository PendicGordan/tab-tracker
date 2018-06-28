<template>
  <div>
    <v-layout>
      <v-flex xs4>
        <panel title="Song Metadata">
          <div slot="content">
            <v-text-field
              name="title"
              label="Title"
              id="title"
              required
              :rules="[required]"
              v-model="song.title"
            ></v-text-field>
            <br>
            <v-text-field
              name="artist"
              label="Artist"
              id="artist"
              required
              :rules="[required]"
              v-model="song.artist"
            ></v-text-field>
            <br>
            <v-text-field
              name="genre"
              label="Genre"
              id="genre"
              required
              :rules="[required]"
              v-model="song.genre"
            ></v-text-field>
            <br>
            <v-text-field
              name="album"
              label="Album"
              id="album"
              required
              :rules="[required]"
              v-model="song.album"
            ></v-text-field>
            <br>
            <v-text-field
              name="albumImage"
              label="Album Image URL"
              id="albumImage"
              required
              :rules="[required]"
              v-model="song.albumImage"
            ></v-text-field>
            <br>
            <v-text-field
              name="youtubeId"
              label="Youtube ID"
              id="youtubeId"
              required
              :rules="[required]"
              v-model="song.youtubeId"
            ></v-text-field>
            <br>
          </div>
        </panel>
      </v-flex>
      <v-flex xs8>
        <panel title="Song Structure" class="ml-4">
          <div slot="content">
            <v-text-field
              name="lyrics"
              label="Lyrics"
              id="lyrics"
              required
              :rules="[required]"
              v-model="song.lyrics"
              multi-line=""
            ></v-text-field>
            <br>
            <v-text-field
              name="tab"
              label="Tab"
              id="tab"
              required
              :rules="[required]"
              v-model="song.tab"
              multi-line=""
            ></v-text-field>
          </div>
        </panel>
        <span class="danger-alert" v-if="error">{{error}}</span>
        <v-btn dark
               class="cyan"
               @click="save"
        >
          Create Song
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'

  export default {
    data() {
      return {
        song: {
          title: null,
          artist: null,
          genre: null,
          album: null,
          albumImage: null,
          youtubeId: null,
          lyrics: null,
          tab: null
        },
        required: (value) => !!value || 'Required.',
        error: null
      }
    },
    methods: {
      async save() {
        const areAllFieldsFilledIn = Object
                                      .keys(this.song)
                                      .every(key => !!this.song[key])
        if(!areAllFieldsFilledIn) {
          this.error = 'Please fill in all required fields'
          return;
        }
        try {
          const songId = this.$store.state.route.params.songId

          await SongsService.put(this.song, songId)
          this.$router.push({
            name: 'songs',
            params: {
              songId: songId
            }
          })
        } catch(err) {
          console.log(err)
        }
      },
    },
    async mounted() {
      try {
        const songId = this.$store.state.route.params.songId
        this.song = (await SongsService.show(songId)).data
        console.log(this.song)
      } catch(err) {
        console.log(err)
      }
    }
  }
</script>
<style scoped>
  .danger-alert {
    color: red;
  }
</style>
