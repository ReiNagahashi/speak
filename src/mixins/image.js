import db from '@/firebase/init'

export default{
    data(){
        return{
            imageData:null,
            uploadValue:null,
            picture:null
        }
    },
    methods:{
         // Upload Image
         previewImage(event){
            this.uploadValue = 0;
            this.imageData = event.target.files[0];
            this.picture = null;

            // Image manipulation
            this.picture = null
            const storageRef = db.storage().ref(`speak/${this.imageData.name}`).put(this.imageData);
                
            storageRef.on(`state_changed`,snapshot => {
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error => {console.log(error.message)},
            
                async () => {
                    let url = await storageRef.snapshot.ref.getDownloadURL()
                    this.picture = url;  
                    this.uploadValue = 100;
                }
            )
        },
    }
}