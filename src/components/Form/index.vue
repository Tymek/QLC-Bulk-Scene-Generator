<template>
  <form class="ui form segments">
    <ScenesFieldset @change="handleScenesChange" />
    <FixturesFieldset @change="handleFixturesChange" initialState="formState.fixtures" />
    <!-- <ChaserFieldset @change="handleChaserChange" /> -->
    <div class="ui blue segment">
      <div class="ui primary button" @click="generate">Generate</div>
      <!-- <div class="ui button">Reset form</div>
      <div class="ui button">Reset fixture ID</div> -->
    </div>
  </form>
</template>

<style>
  .field {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
</style>

<script>
import ScenesFieldset from './components/Scenes'
import FixturesFieldset from './components/Fixtures'
import ChaserFieldset from './components/Chaser'

export default {
  name: "Form",
  props: {},
  data: () => ({
    formState: {
      scenes: {},
      fixtures: [{
        id: 0,
        channels: [{
          id: 0,
          value: 'x',
        }],
      }],
      chaser: {},
    },
  }),
  methods: {
    handleScenesChange (event) {
      this.formState = {
        ...this.formState,
        scenes: {
          ...event,
        },
      }
    },
    handleFixturesChange (event) {
      this.formState = {
        ...this.formState,
        fixtures: [
          ...event,
        ],
      }
    },
    handleChaserChange (event) {
      this.formState = {
        ...this.formState,
        chaser: {
          ...event,
        },
      }
    },
    generate () {
      this.$emit('submit', this.formState)
    }
  },
  mounted () {
    this.generate()
  },
  components: {
    ScenesFieldset,
    FixturesFieldset,
    ChaserFieldset,
  },
}
</script>
