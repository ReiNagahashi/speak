import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Index from '@/components/crud/Index'
import Edit from '@/components/crud/Edit'
import Signup from '@/components/auth/Signup'
import Profile from '@/components/profile/Profile'
import ProfileIndex from '@/components/profile/Index'
import Login from '@/components/auth/Login'
import CreateProfile from '@/components/profile/Create'


Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/edit/:post_id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/profile/:user_id',
      name: 'ProfileIndex',
      component: ProfileIndex,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/create_profile',
      name: 'CreateProfile',
      component: CreateProfile,
      meta:{
        requireAuth:true
      }
    },
  ]
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(rec => rec.meta.requireAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    }else{
      next({name:'Login'})
    }
  }else{
    next()
  }
})

export default router
