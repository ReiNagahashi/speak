<template>
  <div class="profile-section">
    <nav-app :user="user" class="navComp"></nav-app>
    <div class="container">
        <!-- Preview Section -->
        <figure v-if="!open" class="profile">
            <!-- Avatar -->
            <div class="profile__image">
                <img :src="profile.avatar" class="avatarImg">
            </div>
            <figcaption class="profile-content">
                <!-- Profile name -->
                <div class="profile-content__name">
                    {{ profile.name }} 
                    <!-- Display country with flag 　-->
                    <span class="profile-content__country profile-content__country--1" v-if="profile.country == 0">
                        <img class="flag" src="@/assets/image/japan.png" alt="Japanese">
                    </span>
                    <span class="profile-content__country profile-content__country--2" v-else>
                        <img class="flag" src="@/assets/image/uk.png" alt="England">
                    </span>
                </div>
                <!-- Introduction -->
                <div class="profile-content__introduction">{{ profile.introduction }}</div>
                <div class="profile-content__btn">
                    <button @click="open = true" class="btn btn--normal btn--ja">Edit Profile</button>
                </div>
            </figcaption>
        </figure>
        <!-- Edit Section -->
        <section v-if="open" class="card">
            <!-- Edit Section -->
            <form @submit.prevent="update" class="profile profileChange">
                <!-- Avatar Uploading -->
                    <section class="form__group form-colomun">
                        <!-- DISPLAY IMAGE -->
                        <img :src="profile.avatar" @click="emitFileChange" class="avatarImg mb-3">
                        <input type="file" id="fileInput" @change="previewImage" accept="image/*" style="display:none">
                        <span v-if="imageData">
                            <p>Progress: {{uploadValue.toFixed()+"%"}}
                                <progress id="progress" :value="uploadValue" max="100" ></progress>  
                            </p>
                            <div class="error" v-if="!$v.profile.avatar.required">Select appropriate file</div>  
                        </span>
                        <label class="label mt-3 mb-3">Upload Image</label>
                    </section>
                    <div class="error" v-if="!$v.profile.avatar.required">Select appropriate file</div>  
                <div class="profile-content create-content">
                    <!-- Profile name -->
                    <div class="name-country">
                        <div>
                            <div class="profile-content__name form-colomun form__group ">
                                <label class="label" for="name">name</label>
                                <input type="text"  id="name" v-model.trim="$v.profile.name.$model" :class="{ 'form__group--error': $v.profile.name.$error }">
                            </div>
                            <div class="error" v-if="!$v.profile.name.required" >name is required </div>  
                        </div>
                        <section class="profile-content__country">
                            <!-- Display country with flag-->
                            <div class="input-field form-colomun">
                                <label for="country" class="label">Country</label>
                                <div class="flex">
                                    <label class="flags">
                                        <input type="radio" name="country" value="0" v-model="profile.country"/>
                                        <span class="ml-1"><img class="create-flag" src="@/assets/image/japan.png" alt="Japanese"></span>
                                    </label>            
                                    <label class="flags ml-3">
                                        <input type="radio" name="country" value="1" v-model="profile.country"/>
                                        <span><img class="create-flag" src="@/assets/image/uk.png" alt="England"></span>
                                    </label>
                                </div>
                            </div>
                        </section>
                    </div>
                    <!-- Introduction -->
                    <section class="form__group form-colomun profile-content__introduction" :class="{ 'form--error': $v.profile.introduction.$error }">
                        <label class="label" for="introduction">Introduction</label>
                        <textarea name="introduction" class="textarea create-textarea" v-model="$v.profile.introduction.$model"></textarea>                   
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
        </section>
        <!-- Comment Sectiton -->
        <section class="comments">
            <h2 class="comments__title section-title">Chat room</h2>
                <ul class="comments__card" v-chat-scroll>
                    <span v-for="(comment,index) in comments" :key="index">
                        <li class="comment" :class="{ auth:comment.from.user_id == user.uid }">
                            <img :src="comment.from.avatar" alt="avatar" class="comment__avatar">
                            <div>
                                <div class="comment__user">{{ comment.from.name }}</div>    
                                <div class="comment__content">{{ comment.content }}</div>
                            </div>
                            <div class="comment__time">{{ comment.timeStamp }}</div>
                        </li>
                    </span>
                </ul>
            <div class="comments__action">
                <new-message :user="user" :profile="profile"></new-message>
            </div>
        </section>
     </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import { required, minLength } from 'vuelidate/lib/validators'
import CommentsMixin from '@/mixins/comment'
import NewMessage from '@/components/NewMessage'
import Nav from '@/components/Navigation'


export default {
    data:()=>({
        open:false,
        imageData:null,
        uploadValue:null,
        submitStatus:null,
        profile:{}
    }),
        components:{
        NewMessage:NewMessage,
        navApp:Nav
    },
    props:{ user:Object },

    mixins:[CommentsMixin],

    created(){
        this.getComments(this.user.uid)

        //get profile data
          db.firestore().collection('users').where('user_id','==',this.user.uid).get()
          .then(snapshot => {
                snapshot.forEach(doc => {
                    this.profile = doc.data()
                    this.profile.id = doc.id
              })  
          })
    },

    validations:{
        // Creating profile
        profile:{
          name:{ required },

          introduction:{
                required,
                minLength:minLength(10)
             },
             
          avatar:{ required },
        },
     },
    methods:{
        emitFileChange(){
            let fileInput = document.getElementById('fileInput')
            fileInput.click()
        },
        // Upload Image
        previewImage(event){
            this.uploadValue = 0;
            this.imageData = event.target.files[0];
            this.profile.avatar = null;

            // Image manipulation
            this.profile.avatar = null
            const storageRef = db.storage().ref(`speakChange/${this.imageData.name}`).put(this.imageData);
                
            storageRef.on(`state_changed`,snapshot => {
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error => {console.log(error.message)},
            
                async () => {
                    let url = await storageRef.snapshot.ref.getDownloadURL()
                    this.profile.avatar = url;  
                    this.uploadValue = 100;
                }
            )
        },
        // Update data on firestore
       async update() {
            this.$v.$touch()

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            }else{
                this.submitStatus = 'PENDING'
                try{
                    await db.firestore().collection('users').doc(this.profile.id).update(
                        {
                            name:this.profile.name,
                            introduction:this.profile.introduction,
                            country:this.profile.country,
                            avatar:this.profile.avatar,
                            user_id:this.user.uid
                        })
                    this.open = false;
                }catch(err){
                    alert(err)
                }
                this.submitStatus = 'OK'
            }
            this.submitStatus = null
        },
    }
}

</script>