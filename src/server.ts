import app from "./app";
import path from "path";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT? process.env.PORT : 3000

console.log(process.env.JWT_SECRET)
app.listen(PORT, ()=>console.log(`running on port ${PORT}`))

