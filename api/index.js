import express from 'express';
import db from './config/database';
import routes from './routes/routes';

const app = express();

db.authenticate()
    .then(() => {
        console.log('Connected');
    })
    .catch(console.log);

const PORT = process.env.PORT || 3000;

app.use('/api/v1', routes);

app.listen(PORT);

export default app;
