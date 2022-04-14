import express from 'express';
import { rootHandler } from './handlers/root';
import { router } from './router';

const app = express();
const port = process.env.PORT || '8000';
app.get('/', rootHandler);
app.use('/v1', router);

app.listen(port, () => console.log(`Server is listening on ${port}`));
