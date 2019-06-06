<style scoped lang="scss">
  .main-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    @media (min-width: 768px){
      width: 100%;
      flex-direction: row;
    }

    .form-container{
      display: flex;
      align-items: center;justify-content: center;
      padding: 30px;
      flex-direction: column;
      h1{
        font-family: 'SimplonHeadLine', sans-serif;
        background: #9f99f7; /* Old browsers */
        background: -moz-linear-gradient(-45deg, #9f99f7 0%, #7664f0 29%, #3a88cf 60%, #1b99bd 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(-45deg, #9f99f7 0%,#7664f0 29%,#3a88cf 60%,#1b99bd 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(135deg, #9f99f7 0%,#7664f0 29%,#3a88cf 60%,#1b99bd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9f99f7', endColorstr='#1b99bd',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .content{
        @media (min-width: 1280px){
          width: 400px;
        }
      }
    }

    .illustration{
      position: absolute;
      top: 0;
      z-index: -1;
      height: 100vh;
      display: none;
      opacity: 0.2;
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #122a57;
      background-image: url("../../assets/gps.png");
      background-position: center;
      width: 100%;

      @media (min-width: 768px){
        display: block;
        opacity: initial;
        position: initial;
      }
    }
  }
</style>

<template>
  <div class="main-container">
    <div class="form-container col-md-6">
      <div class="content">
        <h1>{{title}}</h1>
        <form onsubmit="return false">

          <label for="name">Nome</label>
          <b-input-group>
            <b-input
              id="name"
              type="name"
              v-model="form.name"
              aria-describedby="Nome"
              placeholder="Informe seu nome"
              required/>
          </b-input-group>


          <label class="mt-3 label" for="email">Email</label>
          <b-form-input
            id="email"
            type="email"
            v-model="form.email"
            :state="isEmailValid()"
            aria-describedby="email"
            placeholder="Digite seu email"
            trim
          />
          <b-form-invalid-feedback>Digite um email valido</b-form-invalid-feedback>
          <b-form-text>Email valido</b-form-text>


          <label class="mt-3 label" for="password">Senha</label>
          <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            :state="passState"
            aria-describedby="senha"
            placeholder="Digite sua senha"
            trim
          />
          <b-form-invalid-feedback>
            A senha deve conter pelo menos 6 digitos
          </b-form-invalid-feedback>
          <b-form-text>Senha aceitavel</b-form-text>

          <b-button class="mt-4 col-md-6"
                    type="submit"
                    @click="requesitUserRegistration()"
                    variant="outline-primary"  value="Cadastrar">Cadastrar</b-button>

          <router-link :to="'/'" class="btn btn-outline-secondary col-md-5 mt-4 float-right">
            <span class="fa fa-undo"></span> Voltar
          </router-link>
        </form>

      </div>
    </div>
    <div class="illustration col-md-6"></div>
  </div>
</template>

<script>
  import firebase from 'firebase/index'
  import store from '../../vuex/store'

  export default {
    name: 'UserRegistration',
    computed: {
      passState() {
        return this.form.password.length > 5
      }
    },
    data () {
      return {
        title: 'Cadastre-se',
        form: {
          name: '',
          email: '',
          password: '',
          reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
      }
    },

    methods: {

      isEmailValid () {
        return this.form.email === "" ? "" : this.form.reg.test(this.form.email)
      },

      requesitUserRegistration() {
        let form = this.form
        firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
          .then((user) => {
            user.updateProfile({
              displayName: form.name,
              photoURL: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
            })
              .then((response) => {
                console.log(response)
                user.sendEmailVerification()
                this.processUserRegistration(user)
              })
              .catch((e) => {
                console.log(e)
              })
          })
          .catch((e) => {
            this.processInvalidForm(e)
          })
      },

      processInvalidForm (e) {
        if (e.code === 'auth/email-already-in-use') {
          alert('Este e-mail já está cadastrado')
        } else if (e.code === 'auth/invalid-email') {
          alert('Formato inválido de email')
        } else if (e.code === 'auth/weak-password') {
          alert('Sua senha obrigatóriamente deve conter pelo menos 6 digitos')
        }
      },

      processUserRegistration (user) {
        store.commit('CHANGE_USER', {
          id: user.uid,
          auth: true,
          name: user.displayName,
          photo: user.photoURL
        })
        this.$router.push('/home')
      },

    }
  }
</script>
