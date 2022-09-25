import express, {
  Express
} from "express";

const app: Express = express();
import errorHandler from "./middlewares/globalErrorHandler";
import { productRouter } from "./modules/products/routes";
import { userRouter } from "./modules/users/routes";

app.use(express.json());
app.use(productRouter)



app.use(errorHandler)

export default app;
