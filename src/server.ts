import app from "./app";
import path from "path";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT? process.env.PORT : 5000
console.log(process.env.DATABASE_URL)

app.listen(PORT, ()=>console.log(`running on port ${PORT}`))