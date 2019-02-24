import KoaAppliction from './inject';
import config from './config';





let client = app => {

  app.watch(require.context("./src", true, /.*\.js$/));
  app.watch(require.context("./config", true, /.*\.js$/));


}

new KoaAppliction().start(client, config.port);