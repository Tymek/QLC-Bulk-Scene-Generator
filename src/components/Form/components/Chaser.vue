<template>
  <fieldset id="chaser" class="ui yellow segment">
    <h4 class="ui dividing header">
      Chaser
      <div class="ui fitted slider checkbox">
        <input type="checkbox"> <label></label>
      </div>
    </h4>
    <div class="field">
      <div class="fields">
        <div class="two wide field">
          <label>ID</label>
          <input type="number" min="0" placeholder="0">
        </div>
        <div class="five wide field">
          <label>Name</label>
          <input type="text" placeholder="New Chaser">
        </div>
        <div class="four wide field">
          <label>Path</label>
          <input type="text" placeholder="Generated chasers/New">
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "ChaserFieldset",
  props: {},
  data: () => ({
    
  }),
}
</script>
