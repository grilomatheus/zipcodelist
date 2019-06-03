<style scoped lang="scss">
  .main-container{
    background-color: #a2d3d7;
    height: 100vh;
    .title{
      font-family: SimplonLight,sans-serif;
      font-size: 22px;
      color: #fff;
      padding-top: 40px;
      @media (min-width: 768px) {
        width: 40%;
        font-size: 24px;
      }
    }
    .tablist{
      padding: 10px;
      background-color: #a2d3d7;
      @media (min-width: 768px) {
        padding: 0;
      }
      .card{
        @media (min-width: 768px) {
          width: 40%;
          padding: 10px 20px;
          background-color: #a2d3d7;
          border: 0;
          position: inherit;
        }
        @media (min-width: 768px) {
          padding: 2.5px 10px;
        }
        @media (min-width: 1280px) {
          padding: 10px 40px;
        }
        .card-header{
          box-shadow: none;
          background-color: #f5f9f9;
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
            top: 40px;
            width: 60%;
            position: absolute;
            right: 0;
            z-index: 2;
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
  <div>
    <div v-if="addressList.length > 0" class="main-container">
      <h2 class="title text-center">{{title}}</h2>
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
              <div class="panel">
                <b-button title="Editar" v-b-tooltip.hover
                          variant="outline-warning"
                          @click="getAddressToEdit(object.address, object.key)">
                  <span class="fa fa-pencil"></span>
                </b-button>
                <b-button title="Excluir" v-b-tooltip.hover
                          variant="outline-danger"
                          @click="deleteAddress(object.key, object.address)">
                  <span class="fa fa-trash"></span>
                </b-button>

              </div>
            </b-card-body>
            <map-details class="card-map" :address="object.address"></map-details>

          </b-collapse>

        </b-card>
      </div>

      <b-modal ref="myModalRef" hide-footer title="Editar endereço">

        <form class="col-12">
          <div class="form-group">
            <label for="cep">CEP *</label>
            <input id="cep"
                   class="form-control col-12"
                   @blur="verifyCep()"
                   @focus="verifyCep()"
                   @keypress="onlyNumber"
                   v-model="form.cep.value"
                   type="text"
                   maxlength="8"
                   required
                   autofocus
            >

          </div>
          <div class="form-group">
            <label for="street">Logradouro *</label>
            <input id="street" class="form-control" v-model="form.street" type="text" required>
          </div>
          <div class="row">
            <div class="form-group col-sm-12 col-md-4 col-lg-4">
              <label for="number">Número: *</label>
              <input id="number" class="form-control" v-model="form.number" type="text" required>
            </div>
            <div class="form-group col-sm-12 col-md-8 col-lg-8">
              <label for="complement">Complemento: </label>
              <input id="complement" class="form-control" v-model="form.complement" type="text">
            </div>
            <div class="form-group col-sm-12 col-md-12 col-lg-12">
              <label for="neighborhood">Bairro *</label>
              <input id="neighborhood" class="form-control" v-model="form.neighborhood" type="text">
            </div>
          </div>
          <div class="row">
            <div class="form-group col-sm-12 col-md-8 col-lg-8">
              <label for="city">Cidade *</label>
              <input id="city" class="form-control" v-model="form.city" type="text" required>
            </div>
            <div class="form-group col-sm-12 col-md-4 col-lg-4">
              <label for="state">Estado (UF) *</label>
              <input id="state" class="form-control" v-model="form.state" type="text" placeholder="Ex: RJ" required>
            </div>
          </div>
        </form>

        <div class="row col-12 ml-0 mb-2">
          <button  class="btn btn-outline-danger mr-3" @click="hideModal(); finishEdit()">
            <span class="fa fa-times"></span> Cancelar Edição</button>
          <button class="btn btn-outline-success" @click="editAddress()">
            <span class="fa fa-save"></span> Salvar</button>
        </div>
      </b-modal>

      <b-modal centered id="modal-response" hide-footer>
        <span class="d-block text-center">{{response}}</span>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import MapDetails from './MapDetails'
  import store from '../../vuex/store'

  export default {
    name: 'EditAddress',
    data () {
      return {
        title: 'Endereços Cadastrados',
        form: {
          cep: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: ''
        },
        addresskey: '',
        showCollapse: false
      }
    },

    computed: {
      addressList () {
        return store.state.userAddressList
      }
    },

    mounted () {
      this.uid = store.state.user.id
      store.commit('GET_ADDRESS_LIST')
    },

    methods: {
      deleteAddress (key, address) {
        if (confirm(`Deseja mesmo excluir o endereço
        ${address.cep.value} -
        ${address.street}, ${address.city} - ${address.state}?`)) {
          store.commit('DELETE_ADDRESS', key)
          store.commit('GET_ADDRESS_LIST')
        }
      },

      onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
          $event.preventDefault();
        }
      },

      getAddressToEdit (address, key) {
        console.log('key que meu formulario manda' + key)
        this.showModal()
        this.addresskey = key
        this.form = address
      },

      editAddress () {
        let form = this.form
        let key = this.addresskey
        console.log('key que vou mandar para mutation' + key)
        store.commit('EDIT_ADDRESS', {form: form, key: key})
        store.commit('GET_ADDRESS_LIST')
        this.finishEdit()
      },

      finishEdit () {
        this.addresskey = ''
        this.hideModal()
      },

      showModal () {
        this.$refs.myModalRef.show()
      },

      hideModal () {
        this.$refs.myModalRef.hide()
      }
    },

    components: {
      'map-details': MapDetails
    }
  }
</script>
