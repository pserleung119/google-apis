<template>
  <Layout>
    <div>
      <h1>Spot Map</h1>
      <div class="d-flex">
        <ul class="col-3 px-0">
          <div v-for="spot in spots" v-bind:key="spot.id">
            <input type="checkbox" :value="spot.name" v-model="selectedSpots" :id="spot.id">
            <label class="ml-2" :for="spot.id">{{ spot.name }}</label>
          </div>
        </ul>
        <GoogleMapLoader :mapConfig="mapConfig" :markers="selectedMarkers" class="col"></GoogleMapLoader>
      </div>
    </div>
  </Layout>
</template>

<script>
import GoogleMapLoader from '@/components/GoogleMapLoader'
import placeCoordinates from '@/constants/placeCoordinates.json'

export default {

  components: {
    GoogleMapLoader
  },

  data() {
    return {
      prefectures: ['東京', '千葉', '神奈川'],
      selectedSpots: [],
      spots: [
        { id: 'a', name: 'Senso-ji', position: placeCoordinates.sensoji },
        { id: 'b', name: 'Tokyo Skytree', position: placeCoordinates.skytree },
        { id: 'c', name: 'Tokyo Tower', position: placeCoordinates.tokyotower },
        { id: 'd', name: 'Shibuya SKY', position: placeCoordinates.shibuyasky },
      ]
    }
  },

  computed: {
    mapConfig() {
      return {
        zoom: 10,
        center: this.mapCenter
      }
    },

    mapCenter() {
      return { "lat": 35.65138097879182, "lng": 139.75867629113915}
    },

    selectedMarkers() {
      return this.spots.filter(spot => this.selectedSpots.includes(spot.name))
    }
  },
}
</script>
