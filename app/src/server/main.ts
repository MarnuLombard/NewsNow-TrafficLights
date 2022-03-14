import bodyParser from 'body-parser';
import cors from 'cors';
import express, {
  Application, Request, Response, NextFunction,
} from 'express';
import morgan from 'morgan';
import path from 'path';
import { route } from '../shared/helpers/route';
import { routes as statusRoutes } from './routes/status';
import { routes as dashboardsRoutes } from './routes/dashboards';

const app: Application = express();

// Configuration
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(route('status.show').relative, statusRoutes);
app.use(route('dashboards.index').relative, dashboardsRoutes);
// Serve static assets
app.use(route('client').relative, (req: Request, res: Response) => {
  return res.redirect('/');
});
// path is relative to package.json
app.use(express.static(path.resolve('./dist/')));

app.get('*', (req: Request, res: Response) => {
  res.sendStatus(404);
});

// Error handlers
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// noinspection JSUnusedLocalSymbols
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .send(err.message || err);
});

app.listen(8888, () => {
  console.info(`API server started on port ${8888}`);
});
