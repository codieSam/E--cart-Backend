import jwt from "jsonwebtoken"

const generateJwtToken = (data : {
    id: string,
})=>{
    //@ts-ignore
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn : '30d'
    })
    return token
}

export default generateJwtToken