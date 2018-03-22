<template>
  <fieldset id="scenes" class="ui red segment">
    <h4 class="ui dividing header">Scenes</h4>
    <div class="fields">
      <div class="two wide field">
        <label>First ID</label>
        <input
          type="number"
          min="0"
          placeholder="0"
          v-model.number="startId"
          @change="change"
        />
      </div>
      <div class="five wide field">
        <label>Name</label>
        <input
          type="text"
          placeholder="Scene #"
          v-model="func.name"
          @change="change"
        />
      </div>
      <div class="three wide field">
        <label>Ordering width <small>(leading zeros)</small></label>
        <input
          type="number"
          min="0"
          placeholder="0"
          v-model.number="func.numberWidth"
          @change="change"
        />
      </div>
      <div class="six wide field">
        <label>Path</label>
        <input
          type="text"
          placeholder="Generated scenes/New/Scene name"
          v-model="func.path"
          @change="change"
        />
      </div>
    </div>
    <div class="fields">
      <div class="two wide field">
        <label>Step from</label>
        <input
          type="number"
          placeholder="0"
          :value="step.start"
          @change="setStepStart($event.target.value)"
        />
      </div>
      <div class="two wide field">
        <label>Step until</label>
        <input
          type="number"
          placeholder="255"
          :value="step.end"
          @change="setStepEnd($event.target.value)"
        />
      </div>
      <div class="nine wide field">
        <label>Step filter <small>(equasion where <code>x</code> is step number)</small></label>
        <input 
          type="text"
          placeholder="x == 0 || (x + 1) % 4 === 0"
          v-model.lazy="step.filterEquation"
          @change="change"
        />
      </div>
      <div class="three wide field">
        <label>Number of scenes</label>
        <input
          type="number"
          readonly
          disabled
          :value="count"
        />
      </div>
    </div>
  </fieldset>
</template>

<script>
import {
  isEmpty,
  range,
} from 'ramda'

export default {
  name: "ScenesFieldset",
  props: {},
  data: () => ({
    startId: 0,
    func: {
      name: 'Scene #',
      path: '',
      numberWidth: 3,
    },
    step: {
      start: 0,
      end: 255,
      filterEquation: 'true',
    },
  }),
  methods: {
    setStepStart: function (value) {
      this.step.start = parseInt(value, 10)
      if (this.step.end < this.step.start) this.step.end = this.step.start
      this.change()
    },
    setStepEnd: function (value) {
      this.step.end = parseInt(value, 10)
      if (this.step.start > this.step.end) this.step.start = this.step.end
      this.change()
    },
    change: function () {
      this.$emit('change', {
          startId: this.startId,
          scene: {
            ...this.func
          },
          range: this.filteredRange,
      })
    },
  },
  mounted () {
    this.change()
  },
  computed: {
    range: function () {
      const { start, end } = this.step
      return range(start, end + 1)
    },
    filteredRange: function () {
      if (isEmpty(this.step.range)) return []
      return this.range.filter(x => // eslint-disable-line no-unused-vars
        eval(this.step.filterEquation)
      )
    },
    count: function () {
      return (this.filteredRange) ? this.filteredRange.length : 0
    },
  },
}
</script>
