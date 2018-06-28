<template>
  <panel title="Lyrics">
    <div slot="content">
            <textarea
              readonly
              label="Lyrics"
              id="lyrics"
              v-model="lyrics"
            ></textarea>
    </div>
  </panel>
</template>

<script>
  export default {
    props: [
      'lyrics'
    ]
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
