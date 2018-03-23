<template>
  <fieldset id="chaser" class="ui yellow segment">
    <h4 class="ui dividing header">
      <span>Chaser</span>
      <div class="ui fitted slider checkbox">
        <input
          type="checkbox"
          v-model="enabled"
          @change="change"
        /> <label></label>
      </div>
    </h4>
    <Collapse>
      <div class="field" v-show="enabled">
        <div class="fields">
          <div class="two wide field">
            <label>ID</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              :value="chaserId"
              @change="change"
              disabled
            />
          </div>
          <div class="five wide field">
            <label>Name</label>
            <input
              type="text"
              placeholder="New Chaser"
              v-model="name"
              @change="change"
            />
          </div>
          <div class="four wide field">
            <label>Path</label>
            <input
              type="text"
              placeholder="Generated chasers/New"
              v-model="path"
              @change="change"
            />
          </div>
        </div>
      </div>
    </Collapse>
  </fieldset>
</template>

<style scoped>
  .header span {
    display: inline-block;
    margin-right: 0.75rem;
  }
  .header .slider {
    display: inline-block;
    margin-bottom: -3px;
  }
</style>

<script>
import Collapse from '../../../utils/Collapse'

export default {
  name: "ChaserFieldset",
  props: {
    id: {
      type: Number,
      default: 256,
    }
  },
  data: () => ({
    chaserId: 0,
    name: 'Chaser',
    path: '',
    enabled: false,
  }),
  methods: {
    change: function () {
      this.$emit('change', {
        id: this.chaserId,
        name: this.name,
        path: this.path,
        enabled: this.enabled,
      })
    },
    setId: function (value) {
      this.chaserId = value
    } 
  },
  mounted () {
    this.setId(this.id)
  },
  watch: {
    id: function (newId) {
      this.setId(newId)
    },
  },
  components: {
    Collapse,
  }
}
</script>
