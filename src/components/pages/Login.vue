<style scoped lang="scss">
  .main-container{
    display: flex;
    flex-direction: column;
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
        font-size: 44px;
        margin: 0 auto;
        padding-right: 20px;
        font-family: 'Billionthine', sans-serif;
        background: #9f99f7; /* Old browsers */
        background: -moz-linear-gradient(-45deg, #9f99f7 0%, #7664f0 29%, #3a88cf 60%, #1b99bd 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(-45deg, #9f99f7 0%,#7664f0 29%,#3a88cf 60%,#1b99bd 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(135deg, #9f99f7 0%,#7664f0 29%,#3a88cf 60%,#1b99bd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9f99f7', endColorstr='#1b99bd',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        @media (min-width: 768px){
          font-size: 62px;
        }
      }

      .content{
        display: flex;
        flex-direction: column;
        .button-primary{
          border-color: #62d0b6;
          color: #4a9f97;
          background-color: #fff;
          &:hover{
            color: #fff;
            background-color: #62d0b6;
          }
        }
        .google-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .btn-google {
            border: 0;
            background-color: #F44336;
            color: white;
            &:hover {
              background-color: #F44336;
            }
          }
        }
        @media (min-width: 768px){
          min-width: 350px;
        }
      }
    }

    .illustration{
      position: absolute;
      top: 0;
      z-index: -1;
      height: 100vh;
      display: block;
      opacity: 0.2;
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #122a57;
      background-image: url("../../assets/gps.png");
      background-position: center;
      width: 100%;

      @media (min-width: 768px){
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
        <form>

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

          <b-form-checkbox id="remind-me" class="mt-2" v-model="form.remind" unchecked-value="not_accepted">
            Lembrar-me
          </b-form-checkbox>
          <b-button class="mt-4 col-md-6" @click="login()" variant="outline-primary">Entrar</b-button>
          <router-link :to="'/user-registration'" class="btn btn-outline-secondary col-md-5 mt-4 float-right">
            <span class="fa fa-envelope-o"></span> Cadastre-se
          </router-link>
        </form>
        <div class="google-content mt-4">
          <small class="form-text text-muted">Ou entre com sua conta Google</small>
          <b-btn v-b-tooltip.hover
                 title="Google"
                 @click="googleLogin"
                 class="first-btn btn btn-google mt-2"
          >
            <span class="fa fa-google-plus"></span>
          </b-btn>
        </div>
      </div>
    </div>
    <div class="illustration col-md-6"></div>
  </div>
</template>

<script>
  import firebase from 'firebase/index'
  import store from '../../vuex/store'

  export default {
    name: 'Login',
    computed: {
      passState() {
        return this.form.password.length > 5
      }
    },
    data () {
      return {
        title: 'ZipCode-List',
        form: {
          email: '',
          password: '',
          remind: '',
          reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
      }
    },

    mounted () {
      this.form.email = localStorage.getItem('email') ? localStorage.getItem('email') : ''
    },

    methods: {
      login () {
        let form = this.form
        if (this.formValidate) {
          this.requestLogin(form)
          if (this.form.remind) {
            localStorage.setItem('email', form.email)
          }
        }
      },

      isEmailValid () {
        return this.form.email === "" ? "" : this.form.reg.test(this.form.email)
      },

      formValidate () {
        return true
      },

      requestLogin (form) {
        firebase.auth().signInWithEmailAndPassword(form.email, form.password)
          .then((user) => {
            this.loginProcess(user)
          })
          .catch((e) => {
            this.processLoginError(e)
          })
      },

      googleLogin () {
        let googleLoginInstance = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(googleLoginInstance)
          .then((response) => {
            this.loginProcess(response.user)
          })
          .catch((e) => {
            this.processLoginError(e)
          })
      },


      loginProcess (user) {
        store.commit('CHANGE_USER', {
          id: user.uid,
          auth: true,
          name: user.displayName,
          photo: user.photoURL
        })
        this.$router.push('/home')
      },

      processLoginError (e) {
        console.log(e)
        if (e.code === 'auth/network-request-failed') {
          alert('Detectamos problema na sua conexão')
        } else if (e.code === 'auth/account-exists-with-different-credential') {
          alert('Você já se registrou com o email ' + e.email)
        } else if (e.code === 'auth/wrong-password') {
          alert('Senha incorreta')
        } else if (e.com === 'auth/user-not-found') {
          alert('E-mail não encontrado')
        }
      },

      toUserRegistration () {
        this.$router.push('/user-registration')
      }
    }
  }
</script>
