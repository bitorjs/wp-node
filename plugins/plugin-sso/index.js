let client = (app, options) => {
  
  app.watch(require.context("./src", true, /.*\.js$/));
  console.warn('..plugin a')
}

export default client;