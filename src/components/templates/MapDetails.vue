<style scoped lang="scss">
  .main-container{
    background-color: white;
    height: 100vh;
    z-index: 2;
  }
  .map{
    border: none;
    width: 100%;
    height: 400px;
    @media (min-width: 768px) {
      height: 500px;
    }
  }
</style>
<template>
  <div class="main-container pt-4">
    <weather-details :city="address.city"></weather-details>
    <iframe class="map"
            :src="`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCdy7wKFGnVg_s5vLBOf1oopre5V_xeico&origin=${address.cep.value}&destination=${destination}&mode=${mode}`"
            allowfullscreen>
    </iframe>
  </div>
</template>

<script>
import WeatherDetails from './WeatherDetails'
import store from '../../vuex/store'

export default {
  name: 'MapDetails',

  data () {
    return {
      title: '',
      mode: 'driving'
    }
  },

  computed: {
    destination: () => {
      return store.state.UserLocation
    }
  },

  mounted () {
    this.getUserLocation()
  },

  props: {
    address: ''
  },

  methods: {
    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let coords = position.coords.latitude + ',' + position.coords.longitude
          store.commit('SET_USER_LOCATION', coords)
        })
      } else {
        console.log('ok')
      }
    }
  },

  components: {
    'weather-details': WeatherDetails
  }
}
</script>
