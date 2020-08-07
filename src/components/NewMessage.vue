<template>
    <div class="newMessage">
        <form>
            <div class="field form__group">
                <input type="text" name="comment" v-model="newComment" placeholder="Press enter to send a message">
                <button @click.prevent="addComment" :disabled="!newComment" class="btn btn--round btn--white">send</button>
                <span v-if="network === 'PENDING'">
                    <loading-progress 
                    :progress="progress"
                    :indeterminate="indeterminate"
                    size="40"
                    rotate
                    fillDuration="3"
                    rotationDuration="4"
                    />
                </span>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    data:() => ({
        newComment:null,
        network:null
    }),
    props:{ user:Object,profile:Object },

　　 methods:{
        addComment(){
            this.network = 'PENDING'
            db.firestore().collection('comments').add({
                content:this.newComment,
                from:this.user.uid,
                to:this.profile.user_id,
                time:Date.now()
            })
            .then(() => {
                this.newComment = null
                this.network = null
            })
        },
    }
}
</script>