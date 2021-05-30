<template>
  <Layout>
    <div>
      <h1>Access Map</h1>
      <p>
        From Narita to
        <select id="prefecture" v-model="selected">
          <option v-for="dest in dests" v-bind:key="dest.name">{{ dest.name }}</option>
        </select>
      </p>

      <GoogleMapLoader :mapConfig="mapConfig" :markers="selectedMarkers"></GoogleMapLoader>
    </div>
  </Layout>
</template>

<script>
import GoogleMapLoader from '@/components/GoogleMapLoader'
import placeCoordinates from '@/constants/placeCoordinates.json'
import { mapSettings } from '@/constants/mapSettings'

export default {

  components: {
    GoogleMapLoader
  },

  data() {
    return {
      origin: { id: 'a', name: '', position: placeCoordinates.narita },
      selected: 'Tokyo',
      dests: [
        { id: 'b', name: 'Tokyo', position: placeCoordinates.tokyo },
        { id: 'c', name: 'Kanagawa', position: placeCoordinates.yokohama },
        { id: 'd', name: 'Chiba', position: placeCoordinates.chiba },
      ]
    }
  },

  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      }
    },

    mapCenter() {
      return this.origin.position
    },

    selectedMarkers() {
      const dest = this.dests.find(dest => dest.name == this.selected)
      return [].concat(this.origin, dest)
    }
  },
}
</script>
