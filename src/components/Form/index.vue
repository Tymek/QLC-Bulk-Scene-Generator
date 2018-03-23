<template>
  <form class="ui form segments">
    <ScenesFieldset @change="handleScenesChange" />
    <FixturesFieldset @change="handleFixturesChange" initialState="formState.fixtures" />
    <!-- <ChaserFieldset @change="handleChaserChange" /> -->
    <div class="ui blue buttons grid segment">
      <div class="left floated column">
        <div class="ui primary button" @click="generate">Generate</div>
        <!-- <div class="ui button">Reset form</div>
        <div class="ui button">Reset fixture ID</div> -->
      </div>

      <div class="right floated badge column">
        <div class="badge content" ref="badge">
          <a class="github-button" href="https://github.com/Tymek/QLC-Bulk-Scene-Generator/" data-size="large">Source Code</a>
        </div>
      </div>
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
<style scoped>
  .badge.column {
    min-width: 138px;
  }
  .badge.content {
    display: flex;
    align-items: center;
    min-height: 100%
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
    },
    addGithubButtonScript () {
      let githubButtonScript = document.createElement('script')
      githubButtonScript.setAttribute('src', 'https://buttons.github.io/buttons.js')
      githubButtonScript.setAttribute('async', 'async')
      githubButtonScript.setAttribute('defer', 'defer')
      this.$refs.badge.appendChild(githubButtonScript)
    }
  },
  mounted () {
    this.generate()
    this.addGithubButtonScript()
  },
  components: {
    ScenesFieldset,
    FixturesFieldset,
    ChaserFieldset,
  },
}
</script>
