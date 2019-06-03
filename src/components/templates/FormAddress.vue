<template>
  <div class="container">
    <div class="row justify-content-center">

      <form onsubmit="return false" class="col-sm-12">
        <div class="form-group">
          <label for="cep"
                 class="mr-1"
                 :class="'btn-sm text-white bg-'+form.cep.status">
            {{form.cep.mensage}}
          </label>
          <b-button class="btn-sm col-md-04 mr-2"
                    variant="outline-info"
                    @click="findMyCep()">
            {{ requestCep ? 'Cancelar' : 'Não sei meu CEP' }}
          </b-button>
          <b-spinner v-if="loading" variant="primary" small role="status" hide></b-spinner>
          <input id="cep"
                 class="form-control col-12"
                 @blur="verifyCep()"
                 @focus="verifyCep()"
                 @keypress="onlyNumber"
                 v-model="form.cep.value"
                 type="text"
                 maxlength="8"
                 placeholder="Ex: 12345678"
                 required
                 autofocus
          >

          <div v-if="requestCep">
            <small :class="requestCepStatus">{{requestCepMensage}}</small>
          </div>
          <div v-if="ceps && !form.cep.value">
            <small class="bg-success text-white">Este são os CEPs encontrados para sua busca</small>
            <select class="form-control col-12" v-model="choosedCep" @blur="verifyCep()" @focus="verifyCep()">
              <option v-for="cep in ceps" :key="cep['.key']" :value="cep">
                {{cep.cep ? cep.cep : ''}}
                {{cep.logradouro ? ' - ' + cep.logradouro : ''}} <br>
                {{cep.numero ? cep.numero : ''}}
                {{cep.complemento ? cep.complemento : ''}}
                {{cep.bairro ? ', ' + cep.bairro : ''}} <br>
                {{cep.localidade ? ', ' + cep.localidade : ''}}
                {{cep.uf ? ' - ' + cep.uf : ''}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="street">Logradouro *</label>
          <input id="street" :class="streetStatus + ' form-control'" v-model="form.street" type="text" required>
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
            <input id="city" :class="cityStatus + ' form-control'" v-model="form.city" type="text" required>
          </div>
          <div class="form-group col-sm-12 col-md-4 col-lg-4">
            <label for="state">Estado (UF) *</label>
            <input
              id="state"
              :class="stateStatus + ' form-control'"
              v-model="form.state"
              type="text"
              placeholder="Ex: RJ"
              required
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12 align-items-center d-flex justify-content-between">
            <b-button type="button"
                      class="col-sm-4 mr-2"
                      title="Buscar CEP"
                      variant="info"
                      v-if="requestCep"
                      @click="getCep()">Buscar CEP
            </b-button>
            <b-button type="submit"
                      class="col-sm-6"
                      title="Cadastrar"
                      variant="success"
                      @click="saveAddress()">Cadastrar
            </b-button>
          </div>
        </div>
      </form>
    </div>
    <b-modal centered id="modal-response" hide-footer>
      <span class="d-block text-center">{{response}}</span>
    </b-modal>
  </div>
</template>

<script>
  import store from '../../vuex/store'
  export default {
    name: 'Index',

    data () {
      return {
        loading: false,
        status: false,
        response: '',
        form: {
          cep: {
            value: '',
            mensage: 'Digite seu CEP',
            status: 'secondary'
          },
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: ''
        },
        ceps: '',
        choosedCep: '',
        requestCep: false,
        streetStatus: '',
        cityStatus: '',
        stateStatus: '',
        requestCepMensage: '',
        requestCepStatus: ''
      }
    },

    methods: {
      verifyCep () {
        let cep = this.form.cep
        if (cep.value.length === 8) {
          this.loading = true
          this.getAddres()
        } else if (cep.value !== '' && cep.value.length !== 9) {
          this.showAlert('CEP inválido', 'warning')
        } else if (this.choosedCep) {
          this.setChoosedCep()
        }
      },

      setChoosedCep () {
        let form = this.form
        form.cep.value = this.choosedCep.cep
        form.street = this.choosedCep.logradouro
        form.number = this.choosedCep.numero
        form.complement = this.choosedCep.complemento
        form.neighborhood = this.choosedCep.bairro
        form.city = this.choosedCep.localidade
        form.state = this.choosedCep.uf
        this.choosedCep = ''
        this.showAlert('CEP válido', 'success')
      },

      getAddres () {
        let cep = this.form.cep
        this.$http.get(`https://viacep.com.br/ws/${cep.value}/json/`).then(response => {
          if (response.ok) {
            if (response.body.erro) {
              this.showAlert('CEP não encontrado', 'warning')
              this.loading = false
            } else {
              this.showAlert('CEP válido', 'success')
              this.fillFormAddress(response.body)
              this.loading = false
            }
          }
        }, (e) => {
          console.log(e)
        })
      },

      findMyCep () {
        this.clearForm()
        this.requestCep = !this.requestCep
        this.setBorder('Preencha os campos abaixo para achar seu CEP', false)
      },

      setBorder (mensage, validate) {
        this.requestCepMensage = mensage
        this.requestCepStatus = validate ? 'btn-success' : 'btn-warning'
        this.streetStatus = this.requestCep && !validate ? 'border border-warning' : ''
        this.cityStatus = this.requestCep && !validate ? 'border border-warning' : ''
        this.stateStatus = this.requestCep && !validate ? 'border border-warning' : ''
      },

      getCep () {
        if (this.validateRequestCep()) {
          let form = this.form
          this.$http.get(`https://viacep.com.br/ws/${form.state}/${form.city}/${form.street}/json/`).then(response => {
            if (response.ok) {
              this.requestCep = false
              this.setBorder('success', true)
              this.ceps = response.body
            }
          })
        } else {
          this.setBorder('Ainda existem itens pendentes a serem preenchidos', false)
        }
      },

      validateRequestCep () {
        let form = this.form
        return form.street && form.city && form.state
      },

      fillFormAddress (address) {
        let form = this.form
        form.street = address.logradouro
        form.number = address.complemento
        form.neighborhood = address.bairro
        form.city = address.localidade
        form.state = address.uf
      },

      showAlert (mensage, status) {
        let cep = this.form.cep
        cep.mensage = mensage
        cep.status = status
      },

      saveAddress () {
        if (this.isValidAddress()) {
          this.ceps = ''
          this.form.cep.status = false
          store.commit('ADD_ADDRESS', this.form)
          store.commit('GET_ADDRESS_LIST')
          this.clearForm()

          this.response = 'Endereço cadastrado com sucesso.'
          this.$refs.forgotcep.hide()
          this.$bvModal.show('modal-response')
        }
        else {
          this.response = 'Preencha os campos obrigatórios.'
          this.$bvModal.show('modal-response')
        }
      },

      clearForm () {
        this.form = {
          cep: {
            value: '',
            mensage: 'Digite seu CEP',
            status: 'secondary'
          },
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: ''
        }
      },

      onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
          $event.preventDefault();
        }
      },

      isValidAddress () {
        let form = this.form
        return form.cep.value && form.street && form.neighborhood && form.city && form.state
      },

      showModal () {
        this.$refs.forgotcep.show()
      },

      hideModal () {
        this.$refs.forgotcep.hide()
      }
    }
  }
</script>
