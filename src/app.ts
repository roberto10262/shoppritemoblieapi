import express, {
  Express,
  NextFunction,
  Request,
  request,
  response,
  Response,
} from "express";
import cors from "cors";
import errorHandler from "./middlewares/globalErrorHandler";
import * as api from "./modules/api";

const app: Express = express();

const allowedOrigins = [
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
];

const options: cors.CorsOptions = {
  origin: true,
  allowedHeaders: "Content-Type",
  methods: ["POST", "PATCH", "GET", "DELETE", "OPTIONS"],
};

app.use(cors(options));
//Body Parser middleware
app.use(express.json());

// app.get("/", (request: Request, Response: Response, next: NextFunction) =>
//  { response.send("<h2>Documentação em andamento").end()}
// );
//Api Routes
app.use(api.productRouter);
app.use(api.userRouter);
app.use(api.stockRouter);
app.use(api.salesRouter);
app.use(api.categoryRouter)
//Error Handler
app.use(errorHandler);

export default app;
