import express, {
  Express,
  NextFunction,
  Request,
  response,
  Response,
} from "express";
import bodyParser from "body-parser";
import { AppError } from "./error/AppError";
import { createUser } from "./modules/users/createUser";
import { testsRouter } from "./modules/users/__tests/router";
import { userApi } from "./modules/users/api";
const app: Express = express();


app.use(express.json())
app.use(testsRouter)
app.use(userApi)
app.get("/",async (req: Request, res: Response) => {
    
    try {
    await createUser({
        name: "anomandari",
        username: "aooajodja",
        role: "ADMIN",
      });
      res.send("Express + TypeScript Server");  
} catch (error) {
 console.log(error)   
}
});



export default app;
