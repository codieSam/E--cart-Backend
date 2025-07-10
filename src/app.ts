import express from "express"
import cors from "cors"

import authRoute from "../src/routes/global/authRoute"


const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/user', authRoute)



export default app