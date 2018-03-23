<template>
  <div id="app" class="ui">
    <div class="ui container">
      <h1 id="header" class="ui aligned header">{{ title }}</h1>
      <Form @submit="handleFormSubmit" />
      <Output :value="output" />
    </div>
  </div>
</template>

<script>
import { isNil } from 'ramda'

import Form from './components/Form'
import Output from './components/Output'

import Chaser from './models/Chaser'
import Scene from './models/Scene'

import {
  formatXml,
  renderXml,
} from './utils'

export default {
  name: 'app',
  data: () => ({
    title: 'QLC+ Bulk Scene Generator',
    output: '',
  }),
  methods: {
    handleFormSubmit (input) {
      const { fixtures } = input
      const { startId, scene, range } = input.scenes
      const composeSceneName = (name, number, numberWidth) =>
        name + number.toString().padStart(numberWidth, '0')
      const calculateFixture = (fixture, value) => ({
          ...fixture,
          channels: !isNil(fixture.channels) ? fixture.channels.map(channel => ({
            ...channel,
            value: (x => eval(channel.value))(value), // eslint-disable-line no-unused-vars
          })) : [],
      })
      const scenes = range.map((sceneValue, index) => ({
        id: startId + index,
        name: composeSceneName(scene.name, index, scene.numberWidth),
        path: scene.path,
        Fixtures: fixtures.map(fixture => calculateFixture(fixture, sceneValue)),
      })).map(scene => Scene(scene))
      const chaser = Chaser({
        ...input.chaser,
        Scenes: scenes,
      })
      const functions = [...scenes]
      if (input.chaser.enabled) functions.push(chaser)
      this.output = formatXml(renderXml(functions))
    },
  },
  components: {
    Form,
    Output,
  },
}
</script>

<style>
  #header {
    padding: 2rem 0 1rem;
  }

  .dividerform {
    padding-top: 2rem;
  }

</style>
