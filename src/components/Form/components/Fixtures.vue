<template>
  <fieldset id="fixtures" class="ui black segment">
    <h4 class="ui dividing header">Fixtures</h4>
    <table class="ui celled definition table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Channel</th>
          <th>Value <small>(integer or equasion where <code>x</code> is step number)</small></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-for="(fixture, fixtureIndex) in fixtures" :key="fixtureIndex">
        <tr v-for="(channel, channelIndex) in fixture.channels" :key="channelIndex">
          <td class="collapsing fixture-id">
            <input
              type="number"
              min="0"
              placeholder="0"
              v-if="channelIndex === 0"
              :value="fixture.id"
              @change="setFixtureId(fixtureIndex, $event.target.value)"
            />
          </td>
          <td class="collapsing fixture-channel">
            <input
              type="number"
              min="0"
              placeholder="0"
              :value="channel.id"
              @change="setChannelId(fixtureIndex, channelIndex, $event.target.value)"
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="255-x"
              :value="channel.value"
              @change="setChannelValue(fixtureIndex, channelIndex, $event.target.value)"
            />
            <!-- IDEA random placeholder -->
          </td>
          <td class="right aligned collapsing">
            <div class="ui button" @click="removeChannel(fixtureIndex, channelIndex)">
              <i class="minus circle icon"></i> Remove
            </div>
            <div class="ui button" @click="addChannel(fixtureIndex, channelIndex)">
              <i class="plus circle icon"></i> Add
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ui button" @click="addFixture">
      <i class="plus square icon"></i> Add fixture
    </div>
    <div class="ui button" @click="sort">
      <i class="sort numeric down icon"></i> Sort
    </div>
  </fieldset>
</template>

<style>
  .fixture-id, .fixture-channel {
    min-width: 120px;
  }
</style>

<script>
import { isEmpty } from 'ramda'

const createEmptyFixture = () => ({
  id: '',
  channels: [
    {
      id: '',
      value: '',
    },
  ],
})

export default {
  name: "FixturesFieldset",
  props: {},
  data: () => ({
    fixtures: [
      createEmptyFixture(),
    ],
  }),
  methods: {
    setFixtureId: function (fixtureIndex, value) {
      this.fixtures[fixtureIndex].id = value
      this.change()
    },
    setChannelId: function (fixtureIndex, channelIndex, value) {
      this.fixtures[fixtureIndex].channels[channelIndex].id = value
      this.change()
    },
    setChannelValue: function (fixtureIndex, channelIndex, value) {
      this.fixtures[fixtureIndex].channels[channelIndex].value = value
      this.change()
    },
    addFixture: function () {
      this.fixtures.push(createEmptyFixture())
      this.change()
    },
    addChannel: function (fixtureIndexToAddTo, channelIndexToAddAfter) {
      this.fixtures[fixtureIndexToAddTo].channels.splice(
        channelIndexToAddAfter + 1,
        0,
        createEmptyFixture()
      )
      this.change()
    },
    removeChannel: function (fixtureIndexToRemoveFrom, channelIndexToRemove) {
      this.fixtures[fixtureIndexToRemoveFrom].channels.splice(channelIndexToRemove, 1)
      this.fixtures = this.fixtures.filter(fixture => fixture.channels.length)
      if (!this.fixtures.length) this.addFixture()
      this.change()
    },
    sort: function () {
      const sortByIdInt = (first, second) => {
        const a = parseInt(first.id, 10)
        const b = parseInt(second.id, 10)
        if (a < b) return -1
        if (a > b) return 1
        return 0
      }
      this.fixtures.forEach((fixture, fixtureIndex) => {
        this.fixtures[fixtureIndex].channels = this.fixtures[fixtureIndex].channels.sort(sortByIdInt)
      })
      this.fixtures = this.fixtures.sort(sortByIdInt)
      this.change()
    },
    change: function () {
      this.$emit('change', this.fixtures.map(fixture => ({
        id: parseInt(fixture.id, 10),
        channels: fixture.channels.map(channel => ({
          id: parseInt(channel.id, 10),
          ...channel,
        })).filter(channel => !isEmpty(channel.id) && !isEmpty(channel.value)),
        ...fixture,
      })).filter(fixture =>
        !isEmpty(fixture.id) && !isEmpty(fixture.channels)
      ))
    },
  },
}
</script>
