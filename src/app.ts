import express, {
  Express
} from "express";

const app: Express = express();
import errorHandler from "./middlewares/globalErrorHandler";
import { userRouter } from "./modules/users/routes";

app.use(express.json());
app.use(userRouter)



app.use(errorHandler)

export default app;
