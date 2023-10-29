import app from './app';
import { connectDB } from './config/database';

const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening: http://localhost:${port}`);
});
