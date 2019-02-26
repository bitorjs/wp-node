export default app => {
  app.on('error', err => {
    console.log('server error', err)
  });
}