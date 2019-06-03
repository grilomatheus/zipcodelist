import {initializeApp} from '../node_modules/firebase'

const app = initializeApp({
  apiKey: 'AIzaSyAaRvRZeiTS1_Vcb661FQno4IBj2BoxOqQ',
  authDomain: 'zipcodelist.firebaseapp.com',
  databaseURL: 'https://zipcodelist.firebaseio.com',
  projectId: 'zipcodelist',
  storageBucket: 'zipcodelist.appspot.com',
  messagingSenderId: '396345707336'
})

export const fireDB = app.database()
export const addressRef = app.database().ref('address')
