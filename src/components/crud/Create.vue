<template>
    <div class="container modalBg">
        <h1 class="post-caption section-title">create post</h1>
        <form @submit.prevent="addPost" class="form post-form">
            <!-- Title -->
            <div>
                <div class="post-form__title form__group form-colomun">
                    <label class="label" for="title">Title</label>
                    <input type="text" class="form-colomun__input" id="title" v-model.trim="$v.title.$model" :class="{ 'form__group--error': $v.title.$error }">
                </div>
                <div class="error" v-if="!$v.title.required" >title is required </div>  
                <div class="error" v-if="!$v.title.maxLength">title must have within {{$v.title.$params.maxLength.max}} letters.</div>   
            </div>
            <div class="categories-description">
                <!-- Categories -->
                <div class="form__group form-colomun post-form__categories">
                    <div class="label">Categories</div>
                    <span v-for="(catName,index) in categoriesName" :key="index" class="radio-button">
                        <label>
                            <input type="radio" :value="catName" v-model="category" />
                            <span>{{ catName }}</span>
                        </label>
                    </span>
                </div>
                <!-- Description -->
                <div>
                    <div class="form__group form-colomun post-form__description" :class="{ 'form--error': $v.description.$error }">
                        <label class="label" for="description">Description</label>
                        <textarea name="description" class="textarea" v-model="$v.description.$model"></textarea>                   
                    </div>                    
                    <div class="error" v-if="!$v.description.required">Description is required</div>  
                    <div class="error" v-if="!$v.description.minLength">Description must have at least {{$v.description.$params.minLength.min}} letters.</div>   
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
                        <img class="preview" :src="picture">
                    </div>
                </div>
                <div class="error" v-if="!$v.imageData.required">Select appropriate file</div>  
            </div>
            <!-- Form Submiting -->
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
                <button v-else class="btn btn--en btn--normal" type="submit">Submit</button>
                <!-- Validation Message -->
                <p class="error" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            </div>
         </form>
    </div>
</template>
<script>
import db from '@/firebase/init'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Image from '@/mixins/image'

export default {
    data(){
       return{
           title:'',
           description:'',
           categoriesName:['learning' ,'tradition' ,'holiday'],           
           category:null,
           submitStatus:null
        }
    },
    props:{ user:Object },
     validations:{
          title:{ 
              required,
              maxLength:maxLength(30)
            },
          description:{
                required,
                minLength:minLength(10)
             },
          category:{ required },
         imageData:{ required }
     },
    methods:{

      async addPost() {
        this.$v.$touch()

        if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
        } else {
            this.submitStatus = 'PENDING'
            await db.firestore().collection('posts').add(
                {
                    title:this.title,
                    description:this.description,
                    category:this.category,
                    imageURL:this.picture,
                    user_id:this.user.uid
                })

               await setTimeout(() => {
                    alert('Post created successfully !')
                    this.submitStatus = 'OK'                    
                }, 500)

                this.title = null
                this.description = null
                this.category = null
                this.imageData = null

                this.submitStatus = null
        }
    }
},
mixins:[Image]
   
}
</script>

<style>

/* For Input style */
    .input-field{
        margin: 30px 0 !important;
    }

    input.valid[type=text]:not(.browser-default){
        padding: 10px 0;
    }

    .description{
        margin-top: -20px;
    }

    input:focus {
        border-bottom: none!important;
        box-shadow: none!important;
    }

      textarea:focus {
        border-bottom: none!important;
        box-shadow: none!important;
    }

    img.preview{
        width: 200px;
    }
</style>