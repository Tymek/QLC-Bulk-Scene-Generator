<template>
  <div id="output">
    <h4 class="ui dividing header">Output</h4>
    <textarea
      class="ui green raised padded container segment"
      v-model="value"
    ></textarea>
  </div>
</template>

<style>
  #output {
    padding-top: 1rem;
    margin-bottom: 3rem;
  }
  #output textarea {
    font-family: monospace;
  }
</style>

<script>
export default {
  name: "SceneForm",
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    }
  },
}
</script>
