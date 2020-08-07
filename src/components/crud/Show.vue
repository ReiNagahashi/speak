<template>
    <!-- Modal -->
    <figure class="cardReveal">
        <div class="card-content card-content__image" :style="{ backgroundImage: `url(${post.imageURL})` }">
            <figcaption class="card-content__fig">
                <div class="card-content__title">{{ post.title }}</div>
                <div class="card-content__description">{{ post.description }}</div>
                <div class="card-content__date"><i>2020/8/10</i></div>
                <div class="card-details">
                    <div v-if="user.uid === post.user_id">
                        <div class="auth-buttons">
                            <router-link :to="{name:'Edit',params: { post_id:post.id }}" class="btn btn--normal btn--ja">
                                edit
                            </router-link>
                            <button @click="deletePost(post.id)" class="btn btn--normal btn--en">
                                delete
                            </button>
                        </div>
                    </div>
                    <div class="nonAuth" v-else >
                        <img :src="post | avatar(profiles)" alt="avatar-image" class="card-details__avatar">
                        <div class="card-details__author">{{ post | name(profiles) }}</div>
                        <router-link :to="{name:'ProfileIndex',params:{ user_id:post.user_id }}" class="btn btn--normal btn--white">profile</router-link>
                    </div>
                </div>
            </figcaption>
        </div>
    </figure>
</template>

<script>
import Avatar from '@/mixins/avatar.js'
import Name from '@/mixins/name.js'

export default {
    props:{ post:Object, user:Object, profiles:Array },

    mixins:[Avatar,Name]

}
</script>