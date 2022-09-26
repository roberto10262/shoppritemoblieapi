import express, {
  Express,
  NextFunction,
  Request,
  request,
  response,
  Response,
} from "express";
import { resolve } from "path";
const app: Express = express();
import errorHandler from "./middlewares/globalErrorHandler";
import * as api from "./modules/api";

//Body Parser middleware
app.use(express.json());

// app.get("/", (request: Request, Response: Response, next: NextFunction) =>
//  { response.send("<h2>Documentação em andamento").end()}
// );
//Api Routes
app.use(api.productRouter);
app.use(api.userRouter);
app.use(api.stockRouter);
app.use(api.salesRouter)
//Error Handler
app.use(errorHandler);

export default app;
