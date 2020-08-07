<template>
<div>

  <!-- Nav menu with check box hack -->
    <div class="navigation container">
      <input type="checkbox" v-model="checkVal" class="navigation__checkbox" id="navi-toggle">

  <!-- Logo -->
      <router-link :to="{ name:'Index' }" class="header-nav__logo"><img src="@/assets/image/logoImg.png" alt="logo" class="header-nav__img"></router-link>

      <label for="navi-toggle" class="navigation__button">
        <span class="navigation__icon">&nbsp;</span>
      </label>

      <div class="navigation__background">&nbsp;</div>

      <nav class="navigation__nav" v-show="checkVal">
        <ul class="navigation__list">
              <li class="navigation__item"><a href="#" @click="moveLink('Index')" class="navigation__link section-title" >HOME</a></li>
              <span v-if="!user">
                <li class="navigation__item"><a href="#" @click="moveLink('Signup')" class="navigation__link section-title">Register</a></li>
                <li class="navigation__item"><a href="#" @click="moveLink('Login')" class="navigation__link section-title">Login</a></li>
              </span>
              <span v-if="user">
                <li class="navigation__item" @click="closeNav"><a href="#modal" @click="createPostModal = !createPostModal" class="navigation__link section-title">New Post</a></li>
                <li class="navigation__item">
                  <a href="#" @click="moveLink('CreateProfile')" class="navigation__link section-title">Profile</a>  
                </li>
                <li class="navigation__item"><a href="#logout" @click="logout" class="navigation__link section-title">Log out</a></li>
              </span>
          </ul>
      </nav>
    </div>
    <nav class="header-nav">
      <!-- Modal Structure -->
      <div id="Postmodal"  class="postModal" :class="{ 'show-modal':createPostModal }">
          <!-- Modal close -->
          <a href="#" class="closeBtn" @click="createPostModal = !createPostModal">✖︎</a>
          <div class="createPostModal">
              <!-- Modal comp -->
              <Create :user="user"/>
          </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Create from './crud/Create'
import firebase from 'firebase'

export default {
  components:{
    Create:Create
  },
  data:()=>({
    createPostModal:false,
    checkVal:false
  }),
 props:{ user:Object },
    methods:{
      logout(){
        firebase.auth().signOut().then(()=>{
          this.$router.push({ name:'Login' })
        })
      },
      // Router transition
      moveLink(param){
          setTimeout(() => {
                  this.$router.push({name: param})
            }, 500)
      },
      closeNav(){
        this.checkVal = false
      }
    },

}

</script>

<style>

</style>