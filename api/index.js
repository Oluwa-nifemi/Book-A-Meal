import express from 'express';
import db from './config/database';
import routes from './routes/routes';
import Meal from './models/Meal';

const app = express();

db.sync()
    .then(() => {
        console.log('Connection established');
    })
    .catch(console.log);

const PORT = process.env.PORT || 3000;

app.use('/api/v1', routes);

app.listen(PORT);

export default app;
