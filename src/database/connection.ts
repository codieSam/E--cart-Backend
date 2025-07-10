import {Sequelize} from "sequelize-typescript"


const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    models: [__dirname+"/models"]
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated, Connected !")
}).catch((e)=>{
    console.log(e)
})

sequelize.sync({alter: false})
.then(()=>{
    console.log("Migrated Successfully !")
})
.catch((e)=> {
    console.log("The error is ", e)
})



export default sequelize