import express from 'express';
import { rootHandler } from './handlers/root';
import { chooseOneHandler, shuffleHandler } from './handlers/shuffle';

const app = express();
const port = process.env.PORT || '8000';

app.get('/', rootHandler);
app.get('/v1/shuffle/shuffle', shuffleHandler);
app.get('/v1/shuffle/chooseOne', chooseOneHandler);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});