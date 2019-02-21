import Koa from 'koa';
import Inject from './inject';
import Before from './before';
const app = new Koa();

Before(app);
Inject(app);

app.listen(1029, () => {
  console.log('server is running at http://localhost:1029')
});