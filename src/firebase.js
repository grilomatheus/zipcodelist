import {initializeApp} from '../node_modules/firebase'

const app = initializeApp({
  apiKey: 'AIzaSyCCetGqy5m9x_72TCkESP6tYrm7VqsYgEI',
  authDomain: 'listaendereco.firebaseapp.com',
  databaseURL: 'https://listaendereco.firebaseio.com',
  projectId: 'listaendereco',
  storageBucket: 'listaendereco.appspot.com',
  messagingSenderId: '991683135856'
})

export const fireDB = app.database()
export const addressRef = app.database().ref('address')
