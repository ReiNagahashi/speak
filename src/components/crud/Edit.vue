<template>
     <section v-if="post" class="editSection">
         <div class="container editContent">
            <h1 class="post-caption section-title">edit post</h1>
            <form @submit.prevent="editPost" class="form post-form">
                <!-- Title -->
                <div>
                    <div class="post-form__title form__group form-colomun">
                        <label class="label" for="title">Title</label>
                        <input type="text" class="form-colomun__input" id="title" v-model.trim="$v.post.title.$model" :class="{ 'form__group--error': $v.post.title.$error }">
                    </div>
                    <div class="error" v-if="!$v.post.title.required" >title is required </div>  
                </div>
                <div class="categories-description">
                    <!-- Categories -->
                    <div class="form__group form-colomun post-form__categories">
                        <div class="label">Categories</div>
                        <span v-for="(catName,index) in categoriesName" :key="index" class="radio-button">
                            <label>
                                <input type="radio" :value="catName" v-model="post.category" />
                                <span>{{ catName }}</span>
                            </label>
                        </span>
                    </div>
                    <!-- Description -->
                 <div>
                    <div class="form__group form-colomun post-form__description" :class="{ 'form--error': $v.post.description.$error }">
                        <label class="label" for="description">Description</label>
                        <textarea name="description" class="textarea" v-model="$v.post.description.$model"></textarea>                   
                    </div>                    
                    <div class="error" v-if="!$v.post.description.required">Description is required</div>  
                        <div class="error" v-if="!$v.post.description.minLength">Description must have at least {{$v.post.description.$params.minLength.min}} letters.</div>   
                    </div>
                </div>
                <!-- Image Uploading -->
                <div>
                    <div class="form__group form-colomun">
                        <label class="label">Upload Image</label>
                        <div class="file-button">
                            <!--file upload button -->
                            <input type="file" id="file" @change="previewImage" accept="image/*" >
                            <label for="file" class="btn btn--white btn--square">file</label>
                        </div>
                        <div v-if="imageData!=null" class="uploadValue">
                            <p>Progress: {{uploadValue.toFixed()+"%"}}
                                <progress id="progress" :value="uploadValue" max="100" ></progress>  
                            </p>
                            <img class="preview" :src="imageData.name">
                        </div>
                        <img v-else class="preview" :src="post.imageURL">
                    </div>
                    <div class="error" v-if="!$v.post.imageURL.required">Select appropriate file</div>  
                </div>
                <!-- Form Submiting -->
                <div class="form__group">  
                    <span v-if="submitStatus !== 'OK'">
                        <button class="btn btn--normal btn--ja" type="submit">Submit</button>
                    </span>
                    <router-link :to="{name:'Index'}" class="btn btn--normal btn--white ml-3">Back</router-link>
                    <!-- Validation Message -->
                    <p class="error" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                    <p class="success" v-if="submitStatus === 'OK'">Updated successfully!</p>
                </div>
            </form>
        </div>
     </section>
</template>
<script>
import db from '@/firebase/init'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data(){
       return{
           post:{},
           categoriesName:['learning' ,'tradition' ,'holiday'],
           imageData:null,
           uploadValue:0,
           submitStatus: null,
        }
    },
     validations:{
        post:{
          title:{ required },
          description:{
                required,
                minLength:minLength(10)
             },
            imageURL:{required}
         },
     },
    methods:{
         // Upload Image
         previewImage(event){
            this.uploadValue = 0;
            this.imageData = event.target.files[0];
            this.post.imageURL = null
            const storageRef = db.storage().ref(`speakChange/${this.imageData.name}`).put(this.imageData);
                
            storageRef.on(`state_changed`,snapshot => {
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error => {console.log(error.message)},
            
                async () => {
                    let url = await storageRef.snapshot.ref.getDownloadURL()
                    this.post.imageURL = url;  
                    this.uploadValue = 100;
                }
            )
        },
        // test(){ console.log('object') },
         editPost() {
            this.$v.$touch()

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                // Update data on firestore
                db.firestore().collection('posts').doc(this.post.id).update(
                    {
                        title:this.post.title,
                        description:this.post.description,
                        category:this.post.category,
                        imageURL:this.post.imageURL
                    }
                    ).then(
                        this.submitStatus = 'PENDING',
                        setTimeout(() => {
                            // this.test()
                            this.submitStatus = 'OK'
                        }, 500)
                    )
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    },
    created(){
    if(this.$route.params.post_id){
        const ref = db.firestore().collection('posts').doc(this.$route.params.post_id)
        ref.get().then(doc => {
            this.post = doc.data() 
            this.post.id = doc.id
        })
    }

}
   
}
</script>
