<template>
  <div class="profile-section profile-section--en">
    <!-- Navigatioon bar -->
    <nav-app :user="user" class="navComp"></nav-app>
    <div class="container">
        <!-- Preview Section -->
        <figure class="profile">
            <!-- Avatar -->
            <div class="profile__image">
                <img :src="profile.avatar" class="avatarImg">
            </div>
            <figcaption class="profile-content">
                <!-- Profile name -->
                <div class="profile-content__name ">
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
            </figcaption>
        </figure>
     </div>
    <!-- Comment Sectiton -->
    <section class="comments container">
        <h2 class="comments__title section-title mb-4">Chat with {{ profile.name }}</h2>
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
</template>
<script>
import NewMessage from '@/components/NewMessage'
import CommentsMixin from '@/mixins/comment'
import Nav from '@/components/Navigation'

export default {
    components:{
        NewMessage:NewMessage,
        NavApp:Nav
    },
    props:{ user:Object },
    mixins:[CommentsMixin],

    created(){
        this.getComments(this.$route.params.user_id)
    }
}
</script>

