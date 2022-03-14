import bodyParser from 'body-parser';
import cors from 'cors';
import express, {Application, Request, Response} from 'express';
import morgan from 'morgan';
import {routes as statusRoutes} from "@/routes/status";
import {routes as dashboardsRoutes} from "@/routes/dashboards";

const app: Application = express();

// Configuration
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/status', statusRoutes)
app.use('/dashboards', dashboardsRoutes)
app.use('/client', express.static('../dist/client.html', {index: false}));
// Serve js
app.use('/js/*.js', express.static('../dist/js/', {index: false}));

app.use('*', (req: Request, res: Response) => {
  res.sendStatus(404)
})

// Error handlers
app.use((err: any, req: Request, res: Response) => {
  res
    .status(500)
    .send(err.message || err)
})

app.listen(8888, () => {
  console.info(`API server started on port ${8888}`)
})
