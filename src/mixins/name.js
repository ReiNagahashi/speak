export default {
    filters: {
        name(val, profiles){
          val = profiles.map(pro => {
                if(pro.user_id == val.user_id){
                    return pro.name
                }
            })

           return val.filter(pos => {
                return pos != null
            })
        },
    }
}