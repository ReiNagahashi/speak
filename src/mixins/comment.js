import db from '@/firebase/init'
import moment from 'moment'

export default{
    data:()=>({
        profile:{},
        comments:[],
    }),
     methods:{
        getComments: async function (id){

         //get properties
        const ref = db.firestore().collection('users')
        let ref2 = db.firestore().collection('comments')

        try{
            // Get current profile
            let snapshot = await ref.where('user_id','==',id).get()

            snapshot.forEach(doc => {
                this.profile = doc.data()
            })
            // Get comments and user name
            ref2.where('to','==',this.profile.user_id).orderBy('time')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    // get name of users who posted a comment 
                    ref.where('user_id','==',change.doc.data().from).get()
                        .then(snap => {
                            let commentUser = null;
                            snap.forEach(doc => {
                                commentUser = doc.data()
                            })
                            // create properties to cycle through them
                            this.comments.push({
                                from:commentUser,
                                content:change.doc.data().content,
                                timeStamp:moment(change.doc.data().time).format('lll')
                            })
                        })
                    }
                })
            })
            }catch(error){
                console.log(error)
            }
        }
    }
}