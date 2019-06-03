<style scoped lang="scss">
  .main-container{
    position: relative;
    .menu{
      height: 40px;
      .title{
        color: #fff;
        margin: 0;
        font-family: 'Billionthine', sans-serif;
        padding-top: 20px;
        padding-left: 20px;
        @media (min-width: 768px){
          padding-top: 40px;
          padding-left: 20px;
          font-size: 30px;
          width: 40%;
        }
        @media (min-width: 1280px) {
          padding-top: 60px;
          padding-left: 40px;
        }
      }
      .user-panel{
        font-style: normal;
        background-color: #a2d3d7;
        display: block;
        padding-top: 10px;
        z-index: 3;
        @media (min-width: 768px){
          padding-top: 0;
          background-color: #f0f0f0;
          height: 40px;
          width: 60%;
        }
        .btn{
          font-style: normal;
          font-family: SimplonLight,sans-serif;
          color: #fff;
          @media (min-width: 768px) {
            color: #222;
            font-size: 14px;
            font-family: 'SimplonMedium', sans-serif;
          }
        }
        .drop-itens {
          transition: ease-in-out 300ms;
        }
      }
    }
    .panel-add{
      color: white;
      margin-top: 30px;
      paddin-bottom: 20px;
      @media (min-width: 768px){
        margin-top: 60px;
        width: 40%;
      }
      .content{
        margin: 0 auto;
        flex-direction: row;
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 280px;
      }
    }
    .map-details-bg{
      display: none;
      @media (min-width: 768px) {
        display: block;
        background-color: white;
        position: absolute;
        width: 60%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 1;
      }
    }
    .panel-details-bg{
      display: none;
      @media (min-width: 768px) {
        display: block;
        background-color: #a2d3d7;
        position: absolute;
        width: 40%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: -1;
      }
    }
  }

</style>
<template>
  <div class="main-container">
    <b-navbar class="menu p-0" >
      <b-navbar-toggle class="menu-mobile" target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="title" href="#">{{title}}</b-navbar-brand>
      <b-collapse is-nav class="user-panel" id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item>
              <b-nav-item-dropdown right>
                <template slot="button-content">
                  <em class="btn">{{user.name}}</em>
                </template>
                <b-dropdown-item @click="logoff" href="" class="text-center drop-itens">
                  Sair
                  <span class="fa fa-power-off"></span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="panel-add">
      <div class="content">
        <b-button title="Cadastrar"
                  variant="outline-light"
                  @click="showModal()">
          <span class="fa fa-plus mr-2"></span>Cadastrar
        </b-button>
        <b-button title="Compartilhar"
                  variant="outline-light"
                  @click="shareList()">
          <span class="fa fa-share mr-2"></span>Compartilhar
        </b-button>
      </div>
    </div>

    <b-modal ref="myModalRef" hide-footer title="Cadastre um novo endereço">
      <form-address></form-address>
    </b-modal>

    <div class="center">
      <edit-address></edit-address>
    </div>
    <div class="map-details-bg"></div>
    <div class="panel-details-bg"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Navbar } from 'bootstrap-vue/es/components/index'
  import router from '../../router'
  import FormAddress from '../templates/FormAddress'
  import EditAddress from '../templates/EditAddress'
  import bModal from 'bootstrap-vue/es/components/modal/modal'
  import store from '../../vuex/store'
  Vue.use(Navbar)

  export default {
    name: 'Home',

    data () {
      return {
        title: 'ZipCode-List',
        user: ''
      }
    },

    mounted () {
      this.user = store.state.user
    },

    methods: {
      logoff () {
        store.commit('LOG_OFF')
        router.push('/')
      },

      showModal () {
        this.$refs.myModalRef.show()
      },

      hideModal () {
        this.$refs.myModalRef.hide()
      },

      shareList () {
        let user = this.user
        this.$router.push({
          path: '/share-list',
          query: {
            uid: user.id,
            userName: user.name
          }
        })
      }
    },

    components: {
      'form-address': FormAddress,
      'edit-address': EditAddress,
      'b-modal': bModal
    }
  }
</script>
