<style scoped lang="scss">
  .main-container{
    height: 100vh;
    .info-content{
      @media (min-width: 768px) {
        width: 40%;
      }
      .info{
        width: 100%;
        padding: 20px;
        font-family: SimplonLight,sans-serif;
        font-size: 14px;
      }
      .title{
        font-family: SimplonLight,sans-serif;
        font-size: 22px;
        color: #222;
        padding-top: 40px;
        @media (min-width: 768px) {
          font-size: 24px;
        }
      }
      .button-content{
        display: flex;
        align-items: center;
        justify-content: center;
        a{
          margin-right: 10px;
        }
      }
      #url{
        opacity: 0;
      }
    }
    .tablist{
      padding: 10px;
      @media (min-width: 768px) {
        padding: 0;
      }
      .card{
        /*border: 1px solid #222;*/
        @media (min-width: 768px) {
          width: 40%;
          padding: 20px;
          border: 0;
          position: inherit;
        }
        @media (min-width: 1280px) {
          padding: 10px 40px;
        }
        .card-header{
          box-shadow: none;
          background-color: #f0f0f0;
          cursor: pointer;
          border: 0;
          :hover{
            background-color: #eef2f2;
          }
          .card-title{
            color: #222;
          }
        }
        .card-details{
          border: 1px solid #f0f0f0;
          padding: 10px;
          background-color: white;
          display: flex;
          @media (min-width: 1024px){
            padding: 20px;
          }
          .details{
            width: 100%;
          }
          .panel{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 125px;
          }
        }
        .card-map{
          @media (min-width: 768px){
            top: 0;
            width: 60%;
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }

  .edit-container {
    margin: 0 auto;
    width: 80%
  }
</style>

<template>
  <div class="main-container">
    <div class="info-content">
      <h2 class="title text-center">Lista compartilhada de<br>{{listOwner}}</h2>
      <div v-if="isOwner" class="info text-center">Copie o link e compartilhe com quem quiser</div>
      <div class="button-content">
        <router-link class="btn btn-outline-success" :to="'/'">
          Crie uma nova lista
        </router-link>
        <b-button title="Copiar URL" v-b-tooltip.hover
                  variant="outline-info"
                  @click="copyUrl()">
          <span class="fa fa-copy"></span>
        </b-button>
      </div>
      <textarea id="url" rows="1" cols="30"></textarea>
    </div>
    <div class="tablist" role="tablist">
      <b-card no-body class="card mb-1" v-for="object in addressList" :key="object.key">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-btn block @click="object.address.cep.status = !object.address.cep.status"
                 class="card-header"
                 :class="object.address.cep.status ? 'collapsed' : null"
                 :aria-controls="addressList.indexOf(object)"
                 :aria-expanded="object.address.cep.status" variant="info">
            <strong class="card-title">
              {{`CEP: ${object.address.cep.value}`}}
            </strong>
            <br>
            <span class="card-title">
                {{`${object.address.street} - ${object.address.state}`}}
              </span>
          </b-btn>
        </b-card-header>
        <b-collapse :id="String(addressList.indexOf(object))"
                    class="collapse"
                    v-model="object.address.cep.status"
                    accordion="my-accordion"
                    role="tabpanel"
        >
          <b-card-body class="card-details">
            <div class="details">
              {{object.address.street}},
              {{object.address.number}} -
              {{object.address.neighborhood}},
              <br>
              {{object.address.city}} - {{object.address.state}}
            </div>
          </b-card-body>
          <map-details class="card-map" :address="object.address"></map-details>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
  import MapDetails from './MapDetails'
  import store from '../../vuex/store'

  export default {
    name: 'ShareList',

    computed: {
      addressList () {
        return store.state.userAddressList
      },

      listOwner () {
        return this.$route.query.userName
      },

      isOwner () {
        return store.state.user.auth === true
      }
    },

    mounted () {
      store.commit('GET_ADDRESS_LIST', this.$route.query.uid)
      this.getUserLocation()
    },

    methods: {
      getUserLocation () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            store.commit('SET_USER_LOCATION', position.coords.latitude + ',' + position.coords.longitude)
          })
        } else {
          store.commit('SET_USER_LOCATION', null)
          alert('Precisamos da sua localização para uma melhor experiencia com o aplicativo')
        }
      },

      copyUrl() {
        let Url = document.getElementById("url");
        Url.innerHTML = window.location.href;
        Url.select();
        document.execCommand("copy");
      }
    },

    components: {
      'map-details': MapDetails
    }
  }
</script>
