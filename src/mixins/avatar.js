export default {
    filters: {
        avatar(val,profiles){
          val = profiles.map(pro => {
                if(pro.user_id == val.user_id){
                    return pro.avatar
                }
            })
        //Remove null from array
            return val.filter(pos => {
                return pos != null
            })
        },
    }
}