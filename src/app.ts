import express, { Express } from "express";
const app: Express = express();
import errorHandler from "./middlewares/globalErrorHandler";
import * as api from "./modules/api";

//Body Parser middleware
app.use(express.json());

//Api Routes
app.use(api.productRouter);
app.use(api.userRouter);
app.use(api.stockRouter)

//Error Handler
app.use(errorHandler);

export default app;
