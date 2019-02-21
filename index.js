import KoaAppliction from './inject';

let client = app => {
  app.watch(require.context("./src/middlewares", true, /.*\.js$/));

}

new KoaAppliction().start(client);