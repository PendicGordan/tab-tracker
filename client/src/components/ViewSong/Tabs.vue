<template>
  <panel title="Tabs">
    <div slot="content">
            <textarea
              readonly
              label="Tab"
              id="tab"
              v-model="tabs"
            ></textarea>
    </div>
  </panel>
</template>

<script>
  export default {
    props: [
      'tabs'
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
