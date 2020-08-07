<template>
    <div class="signup entireSection">
        <!-- Kenesis Fonts -->
        <kinesis-container class="kinesis-container kinesis-container--hero" :duration="2000" >
            <kinesis-element :strength="80" class="kinesis-field kinesis-field--8">
                <div class="kinesis-field__font kinesis-field__font--8">R</div>
            </kinesis-element>
            <kinesis-element :strength="3" class="kinesis-field kinesis-field--9">
                <div class="kinesis-field__font kinesis-field__font--9">Dive Into The New World</div>
            </kinesis-element>
            <kinesis-element :strength="60" class="kinesis-field kinesis-field--10">
                <div class="kinesis-field__font kinesis-field__font--10">Wow, Hey Gang!!</div>
            </kinesis-element>
            <!-- Navigatioon bar -->
            <nav-app :user="user" class="navComp"></nav-app>
        <!-- Login form starts -->
         <div class="container signup__content">
             <div class="signupCard">
                 <h1 class="section-title">register</h1>
                 <p class="signupCard__paragraph">After creating your account, we recommend to also 
                    creating profile to post and chat with another users</p>
                <form @submit.prevent="signup" class="form auth-form">                         
                    <div class="form__group">
                        <div class="auth-form__input-label">
                            <label for="email">Email</label>
                            <input id="email" type="email" class="validate" v-model="$v.email.$model" :class="{ 'form__group--error': $v.email.$error }">
                         </div>
                        <div class="error auth-form__error" v-if="!$v.email.required">Email is required</div>
                    </div>
                    <div class="form__group">
                        <div class="auth-form__input-label">
                            <label for="password">Password</label>
                            <input id="password" type="password" class="validate" v-model="$v.password.$model" :class="{ 'form__group--error': $v.password.$error }">
                        </div>
                        <div class="error auth-form__error" v-if="!$v.password.required">password is required</div>
                        <div class="error auth-form__error" v-if="!$v.password.minLength">password must have at least {{$v.password.$params.minLength.min}} letters.</div>
                    </div>
                    <div class="form__group">
                        <div v-if="submitStatus === 'PENDING'">
                            <p>Please wait ...</p>
                            <loading-progress 
                            :progress="progress"
                            :indeterminate="indeterminate"
                            size="64"
                            rotate
                            fillDuration="2"
                            rotationDuration="1"
                            />
                        </div>
                        <button v-else class="btn btn--en btn--middle" type="submit">Submit</button>
                    </div>
                    <p class="auth-form__error" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                </form>
            </div>
         </div>
         </kinesis-container>
    </div>
</template>
<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import { required, minLength } from 'vuelidate/lib/validators'
import Nav from '@/components/Navigation'


export default {
   components:{
        navApp:Nav
  },
    data:() => ({
        email:null,
        password:null,
        submitStatus:null,
        alert:null
    }),
        props:{ progress:NaN,user:Object },
    validations:{
        email:{ required },
        password:
            { required,
                minLength:minLength(6) 
            }
     },
     methods: {
       async signup() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
               this.submitStatus = 'PENDING'
                try{
                    await firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                    this.$router.push({ name:'Index' })
                }catch(error){
                    console.log(error)
                }               
            }
        }
    }
}
</script>