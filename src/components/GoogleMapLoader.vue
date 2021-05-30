<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import { POINT_MARKER_ICON_CONFIG } from '@/constants/mapSettings'
import placeCoordinates from '@/constants/placeCoordinates.json'

export default {
  props: {
    mapConfig: {
      type: Object,
      required: true
    },
    markers: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      google: null,
      map: null,
      pinnedMarkers: [],
      content: ''
    }
  },

  async mounted() {
    const loader = new Loader({
      apiKey: process.env.GRIDSOME_GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });
    loader.load()
    .then(() => {
      this.initializeMap()
    })
    .catch(e => {
      console.log(e)
    });
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new google.maps.Map(mapContainer, this.mapConfig);
      this.setMarker()
    },
    setMarker() {
      this.pinnedMarkers = this.markers.map((marker) => {
        const _marker = new google.maps.Marker({
          position: marker.position,
          map: this.map,
          ...POINT_MARKER_ICON_CONFIG
        });
        _marker.addListener("click", () => {
          if (this.infowindow !== undefined) {
            this.infowindow.setMap(null)
          }
          const target = Object.values(placeCoordinates).find(place => place.lat == _marker.getPosition().lat() && place.lng == _marker.getPosition().lng())
          this.content = target.info != undefined ? `<p>${target.info}</p>` : "<p>No Info</p>"
          this.map.setCenter(_marker.getPosition());
          this.infowindow = new google.maps.InfoWindow({
            content: this.content,
          });
          this.infowindow.open(this.map, _marker);
        });
        return _marker
      })
    },
    removeMarkers() {
      this.pinnedMarkers.forEach((marker) => {
        marker.setMap(null)
      })
    }
  },

  watch: {
    markers: function(newVal, oldVal) {
      this.removeMarkers()
      this.setMarker()
    }
  }
}
</script>

<style>
.google-map {
  height: 500px;
  width: 500px;
}
</style>
