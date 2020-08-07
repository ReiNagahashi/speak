<template>
<section class="profileChange">
       <div class="profileCreate">
        <div class="container">
            <form @submit.prevent="createProfile" class="profile">
                <!-- Avatar Uploading -->
                    <section class="form__group form-colomun">
                        <!-- DISPLAY IMAGE -->
                        <div v-if="imageData!=null" class="uploadValue">
                            <p class="mb-2">Progress: {{uploadValue.toFixed()+"%"}}
                                <progress id="progress" :value="uploadValue" max="100"></progress>  
                            </p>
                            <img class="avatarImg" :src="picture">
                        </div>
                        <div v-else class="blankRound">&nbsp;</div>
                        <label class="label mt-3 mb-3">Upload Image</label>
                        <div class="file-button">
                            <!--file upload button -->
                            <input type="file" id="file" @change="previewImage" accept="image/*" >
                            <label for="file" class="btn btn--white btn--square">file</label>
                        </div>
                    </section>
                    <div class="error" v-if="!$v.imageData.required">Select appropriate file</div>  
                <div class="profile-content create-content">
                    <!-- Profile name -->
                    <div class="name-country">
                        <div>
                            <div class="profile-content__name form-colomun form__group ">
                                <label class="label" for="name">name</label>
                                <input type="text"  id="name" v-model.trim="$v.name.$model" :class="{ 'form__group--error': $v.name.$error }">
                            </div>
                            <div class="error" v-if="!$v.name.required" >name is required </div>  
                        </div>
                        <section class="profile-content__country">
                            <!-- Display country with flag-->
                            <div class="input-field form-colomun">
                                <label for="country" class="label">Country</label>
                                <div class="flex">
                                    <label class="flags">
                                        <input type="radio" name="country" value="0" v-model="$v.country.$model"/>
                                        <span class="ml-1"><img class="create-flag" src="@/assets/image/japan.png" alt="Japanese"></span>
                                    </label>            
                                    <label class="flags ml-3">
                                        <input type="radio" name="country" value="1" v-model="$v.country.$model"/>
                                        <span><img class="create-flag" src="@/assets/image/uk.png" alt="England"></span>
                                    </label>
                                    <div class="error" v-if="!$v.country.required" >Country is required</div>  
                                </div>
                            </div>
                        </section>
                    </div>
                    <!-- Introduction -->
                    <section class="form__group form-colomun profile-content__introduction" :class="{ 'form--error': $v.introduction.$error }">
                        <label class="label" for="introduction">Introduction</label>
                        <textarea name="introduction" class="textarea create-textarea" v-model="$v.introduction.$model"></textarea>                   
                    </section>   
                        <!-- Button -->
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
                        <button v-else class="btn btn--white btn--normal" type="submit">Submit</button>
                        <!-- Validation Message -->
                        <p class="error" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
  </section>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import db from '@/firebase/init'
import firebase from 'firebase'
import Image from '@/mixins/image'


export default {
    name:'CreateProfile',
    data:()=>({
        name:null,
        country:0,
        introduction:"よろしくお願いします。(Nice to meet you!)",
        submitStatus:null,
    }),
    props:{ user:Object,profile:Object },

   async created(){
        try{
            const snapshot = await db.firestore().collection('users').where('user_id','==',this.user.uid).get()
            snapshot.forEach(doc => {
                if(doc.data()){
                    this.$router.push({name:'Profile'})
                    }
                })
        }catch(error){
            console.log(error)
        }
    },

    validations:{
        // Creating profil e
          name:{ required },

          introduction:{
                required,
                minLength:minLength(10)
             },
             
          country:{ required },
          imageData:{ required },
     },

    methods:{
        test(){
                console.log(this.picture,this.imageData)
        },
    // Create profile
       async createProfile() {
            this.$v.$touch()

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                try{
                    // Update data on firestore
                    await db.firestore().collection('users').add(
                        {
                            name:this.name,
                            introduction:this.introduction,
                            country:this.country,
                            avatar:this.picture,
                            user_id:this.user.uid
                        })
                    this.submitStatus = 'PENDING',
                    setTimeout(() => {
                        this.$router.push({name: 'Profile'})
                    }, 500)

                }catch(err){
                    console.log(err)
                }
            } 
        }
    },
    mixins:[Image]
}
</script>
