<template>
  <transition name="comp-fade" mode="out-in" id="app">
    <router-view :user="user" :profile="profile"/>
  </transition>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'App',
  data:() => ({
        user:{},
        profile:null
  }),
   created(){

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user
          //get profile data
          db.firestore().collection('users').where('user_id','==',user.uid).get()
          .then(snapshot => {
                snapshot.forEach(doc => {
                    this.profile = doc.data()
              })  
          })
      }else{
        this.user = null
      }
    })
    
  },
}
</script>

<style>
   .comp-fade-leave-active{
    animation: bottom-in .8s;
  }
  .comp-fade-enter-active{
    animation: bottom-in .8s reverse;
  }

  @keyframes bottom-in {
  0% {
    transform: translateY(0);
    opacity: 1;
  } 
  100% {
    transform: translateY(100%);
        opacity: 0;
  }
}
</style>

