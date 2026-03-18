

export const validation = (schema)=>{
    return (req ,res ,next)=>{
        let {error} = schema.validate(req.body, {abortEarly:false})
        if(error){
           return res.json({message: error.details})
        }
        next()
    }
}