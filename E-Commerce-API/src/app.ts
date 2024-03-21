import express, { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import {sendJsonErrors} from './helpers/responseHandler';
import cors from "cors";
import bodyParser from 'body-parser';

import categoriesRoute from './routes/CategoryRoute';
import employeesRoute from './routes/EmployeeRoute';
import customersRoute from './routes/CustomerRoute';
import brandsRoute from "./routes/BrandRoute";
import productsRoute from './routes/ProductRoute';
import authRoute from './routes/AuthRoute';

const app: Express = express();

//Middleware Application ở đây
app.use(cors({ origin: '*' })); //Cho phép gọi bất kỳ đâu

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

app.use('/api/auth', authRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/employees', employeesRoute);
app.use('/api/customers', customersRoute);
app.use('/api/brands', brandsRoute);
app.use('/api/products', productsRoute);

/***
 * Từ đây trở xuống là không được chèn cái gì vào thêm bên dưới
 */
//Handle Errors App
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler --> tất cả lỗi khác rơi vào đây
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.log('<<< Error Handler Stack >>>', err.stack);
  //console.error('<< Middleware Error >>', err);
  
  sendJsonErrors(res, err);
});

export default app;
