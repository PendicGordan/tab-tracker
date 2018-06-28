<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>
      <v-flex xs6 class="ml-2">
        <tabs :tabs="song.tab"></tabs>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <youtube-video :youtubeId="song.youtubeId"></youtube-video>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <lyrics :lyrics="song.lyrics"></lyrics>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import SongsService from '@/services/SongsService'
  import SongMetadata from "@/components/ViewSong/SongMetadata";
  import YoutubeVideo from "@/components/ViewSong/YoutubeVideo";
  import Tabs from "@/components/ViewSong/Tabs";
  import Lyrics from "@/components/ViewSong/Lyrics";

  export default {
    components: {Lyrics, Tabs, YoutubeVideo, SongMetadata},
    data() {
      return {
        song: {}
      }
    },
    async mounted() {
      const songId = this.$store.state.route.params.songId
      //console.log(songId);
      this.song = (await SongsService.show(songId)).data
      //console.log(this.song)
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
</style>
