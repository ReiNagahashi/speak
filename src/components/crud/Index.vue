<template>
  <div class="entireSection">
    <!-- Navigatioon bar -->
    <nav-app :user="user" class="navComp"></nav-app>
    <kinesis-container class="kinesis-container kinesis-container--hero" :duration="2000" >
       <!-- Back fonts -->
            <kinesis-element type="depth" :strength="1" class="kinesis-field kinesis-field--1">
                 <div class="kinesis-field__font kinesis-field__font--1">すぴいく</div>
            </kinesis-element>
            <kinesis-element :strength="10" class="kinesis-field kinesis-field--2">
                <div class="kinesis-field__font kinesis-field__font--2">やさしさ</div>
            </kinesis-element>
            <kinesis-element :strength="20" class="kinesis-field kinesis-field--3">
                <div class="kinesis-field__font kinesis-field__font--3 section-title">Oh My friends</div>
            </kinesis-element>
        <!-- Hero section -->
        <div class="container">
            <section class="hero" v-wow="{ 'animation-name': 'fadeInUp','animation-duration': '2s'}">
                <h1 class="hero__title">すぴいく</h1>
                <div class="hero__paragraph">
                    <p class="hero__paragraph--ja">このサイトは日本語と日本の文化を学んでいる英国人、並びに英語とイギリスの文化を学んでいる
                        日本人の方に向けて作られた語学・文化交流サイトです。</p>
                    <p class="hero__paragraph--en">This website is created for English people who study Japanese language and
                        culture also, the same as for Japanese people who study English and culture</p>
                </div>
            </section>
        </div>
        <kinesis-element :strength="40" class="kinesis-field kinesis-field--4">
            <div class="kinesis-field__font kinesis-field__font--4 section-title">Welcome!</div>
        </kinesis-element>
        <kinesis-element :strength="50" class="kinesis-field kinesis-field--5">
            <div class="kinesis-field__font kinesis-field__font--5">とびたて</div>
        </kinesis-element>
    </kinesis-container>
        <!-- GREEN SECTION -->
        <section class="green-section">
           <kinesis-container class="kinesis-container kinesis-container--hero" :duration="2000" >
            <div class="latest" data-aos="fade-up" data-aos-offset="300" data-aos-duration="1500">
                <h4 class="latest__title container home-title holder">Latest Posts</h4>
                <carousel :per-page="2.5" :navigate-to="posts" :mouse-drag="true" :paginationEnabled="false"
                 :navigationEnabled="true" navigationNextLabel="👉" navigationPrevLabel="👈" :loop="true" 
                  class="carousel">
                  <slide v-for="post in posts" :key="post.id" class="card">
                    <figure class="card-content" @mouseup="openModal(post)">
                        <!-- Background Image of post -->
                        <div class="image">
                            <div class="card-content__image" :style="{ backgroundImage: `url(${post.imageURL})` }"></div>
                        </div>
                        <!-- Post info of front -->
                        <figcaption class="card-front">
                            <div class="card-front__title">{{ post.title }}</div>
                            <div class="card-front__description">{{ post.description | slice }} ...</div>
                            <div class="card-details">
                                <img :src="post | avatar(profiles)" alt="avatar-image" class="card-details__avatar">
                                <div class="card-details__author">John Doe</div> <div class="card-details__date"><i>2019/3/20</i></div>
                            </div>
                        </figcaption>
                    </figure>
                    </slide>
                </carousel>
            </div>
            <kinesis-element :strength="20" class="kinesis-field kinesis-field--6">
                <div class="kinesis-field__font kinesis-field__font--6">エキサイティングしていますか?</div>
            </kinesis-element>
            <kinesis-element :strength="3" class="kinesis-field kinesis-field--7">
                <div class="kinesis-field__font kinesis-field__font--7">鷹揚に生きる</div>
            </kinesis-element>
            <!-- NEW USER SECTION -->
             <div class="newUser container" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="400">
                <h2 class="newUser__title home-title" >New Users</h2>
                <div class="newUser__cards">
                    <section v-for="profile in filterdProfiles" :key="profile.id" class="userCard">
                        <div class="userCard-content">
                            <div class="userCard-header">
                                <img :src="profile.avatar" class="userCard-header__image" >
                                <div class="userCard-header__name mr-1">{{ profile.name }}</div>
                            </div>
                            <div class="userCard-content__introduction mt-4 mb-4">{{ profile.introduction | slice }} ...</div>
                            <router-link :to="{name:'ProfileIndex',params:{ user_id:profile.user_id }}" class="btn btn--normal btn--white">profile & chat</router-link>
                        </div>
                    </section>
                </div>
            </div>
        </kinesis-container>
        </section>
        <!-- Pink section - Category Posts -->
        <section class="pink-section">
            <kinesis-container class="kinesis-container kinesis-container--hero" :duration="500" >
                 <kinesis-element :strength="40" class="kinesis-field kinesis-field--11">
                    <div class="kinesis-field__font kinesis-field__font--11 section-title">What’s going guys</div>
                 </kinesis-element>
            <kinesis-element :strength="20" class="kinesis-field kinesis-field--12">
                <div class="kinesis-field__font kinesis-field__font--12">Mario!She was kidnapped again yesterday!!!</div>
            </kinesis-element>
                <h2 class="pink-section__title home-title" data-aos="fade-up" data-aos-offset="450" data-aos-duration="1500">By Category</h2>
                <!-- Learn -->
                <section class="learn rightSide" data-aos="fade-left" data-aos-offset="500" data-aos-duration="1500">
                    <h4 class="category__title rightSide__title container">Learn</h4>
                    <carousel :per-page="2.5" :navigate-to="posts" :mouse-drag="true" :paginationEnabled="false"
                    :navigationEnabled="true" navigationNextLabel="" navigationPrevLabel="👈" :loop="true" class="carousel">
                    <slide v-for="post in learnPosts" :key="post.id" class="card">
                        <figure class="card-content" @mouseup="openModal(post)">
                            <!-- Background Image of post -->
                            <div class="image">
                                <div class="card-content__image" :style="{ backgroundImage: `url(${post.imageURL})` }"></div>
                            </div>
                            <!-- Post info of front -->
                            <figcaption class="card-front">
                                <div class="card-front__title">{{ post.title }}</div>
                                <div class="card-front__description">{{ post.description | slice }} ...</div>
                                <div class="card-details">
                                    <img :src="post | avatar(profiles)" alt="avatar-image" class="card-details__avatar">
                                    <div class="card-details__author">{{ post | name(profiles) }}</div> <div class="card-details__date"><i>2019/3/20</i></div>
                                </div>
                            </figcaption>
                        </figure>
                    </slide>
                    </carousel>
                </section>
                <!-- Tradition -->
                <section class="tradition leftSide" data-aos="fade-right" data-aos-offset="500" data-aos-duration="1500">
                    <h4 class="category__title container leftSide__title">Tradition</h4>
                    <carousel :per-page="2.5" :navigate-to="posts"  :mouse-drag="true" :paginationEnabled="false"
                    :navigationEnabled="true" navigationNextLabel="👉" navigationPrevLabel="" :loop="true" class="carousel">
                    <slide v-for="post in traditionPosts" :key="post.id" class="card">
                        <figure class="card-content" @mouseup="openModal(post)">
                            <!-- Background Image of post -->
                            <div class="image">
                                <div class="card-content__image" :style="{ backgroundImage: `url(${post.imageURL})` }"></div>
                            </div>
                            <!-- Post info of front -->
                            <figcaption class="card-front">
                                <div class="card-front__title">{{ post.title }}</div>
                                <div class="card-front__description">{{ post.description | slice }} ...</div>
                                <div class="card-details">
                                    <img :src="post | avatar(profiles)" alt="avatar-image" class="card-details__avatar">
                                    <div class="card-details__author">{{ post | name(profiles) }}</div> <div class="card-details__date"><i>2019/3/20</i></div>
                                </div>
                            </figcaption>
                        </figure>
                    </slide>
                    </carousel>
                </section>
                <!-- Holiday -->
                <section class="holiday rightSide" data-aos="fade-left" data-aos-offset="300" data-aos-duration="1500">
                    <h4 class="category__title rightSide__title container">Holiday</h4>
                    <carousel :per-page="2.5" :navigate-to="posts" :mouse-drag="true" :paginationEnabled="false"
                    :navigationEnabled="true" navigationNextLabel="" navigationPrevLabel="👈" :loop="true" class="carousel">
                    <slide v-for="post in holidayPosts" :key="post.id" class="card">
                        <figure class="card-content" @mouseup="openModal(post)">
                            <!-- Background Image of post -->
                            <div class="image">
                                <div class="card-content__image" :style="{ backgroundImage: `url(${post.imageURL})` }"></div>
                            </div>
                            <!-- Post info of front -->
                            <figcaption class="card-front">
                                <div class="card-front__title">{{ post.title }}</div>
                                <div class="card-front__description">{{ post.description | slice }} ...</div>
                                <div class="card-details">
                                    <img :src="post | avatar(profiles)" alt="avatar-image" class="card-details__avatar">
                                    <div class="card-details__author">{{ post | name(profiles) }}</div> <div class="card-details__date"><i>2019/3/20</i></div>
                                </div>
                            </figcaption>
                        </figure>
                    </slide>
                    </carousel>
                </section>
            </kinesis-container>
        </section>
        <!-- MODAL STRUCTURE -->
        <div id="Postmodal"  class="postModal" :class="{ 'show-modal':showModal }">
            <!-- Modal CLOSE -->
            <a href="#" class="closeBtn" @click.prevent="closeModal">✖︎</a>
            <div class="showPostModal">
                <!-- Modal COMP -->
                <show v-if="post" :post="post" :user="user" :profiles="profiles"/>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import Create from './Create'
import { Carousel, Slide } from 'vue-carousel';
import Show from './Show'
import Nav from '@/components/Navigation'

// Mixins
import Avatar from '@/mixins/avatar.js'
import Name from '@/mixins/name.js'
// Animation
import { KinesisContainer, KinesisElement } from 'vue-kinesis'

export default {
    components:{
           Create:Create,
           Carousel,
           Slide,
           Show:Show,
            navApp:Nav,
        },
    data:() => ({
        posts:[],
        showModal:false,
        post:null,
        profiles:[]  
    }),
   async created(){
        // Get posts on realtime
           db.firestore().collection('posts')
           .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let data = change.doc.data()
                    // Push to posts array
                        this.posts.push({
                            id:change.doc.id,
                            description:data.description,
                            imageURL:data.imageURL,
                            title:data.title,
                            user_id:data.user_id,
                            category:data.category
                        })
                    }
                })
            })
        // Get profiles
        const snapshot = await db.firestore().collection('users').get()
        snapshot.forEach(doc => {
            this.profiles.push(doc.data())
        })
    },
    props:{ user:Object },
    methods:{
       //Open modal 
        openModal(post){
            if(this.user){
                this.post = post
                this.showModal = true
            }else{
                this.$router.push({ name:'Login' })
            }
        },
       // Delete post
       async deletePost(id){
           await db.firestore().collection('posts').doc(id).delete()
            this.posts = this.posts.filter(post => {
                return post.id != id
            })
        },
        closeModal(){
            this.showModal = false
      }
    },
    filters: {
        slice(value){
            return value.toString().slice(0,50)
        },
    },
    computed:{
        filterdProfiles(){
         return this.profiles.slice(0,3)
        },
        // Category posts
        learnPosts(){
            return this.posts.filter(post => {
              return  post.category == 'learning'
            })
        },
         traditionPosts(){
            return this.posts.filter(post => {
              return  post.category == 'tradition'
            })
        },
         holidayPosts(){
            return this.posts.filter(post => {
              return  post.category == 'holiday'
            })
        },
    },
    mixins:[Avatar,Name]
}
</script>

