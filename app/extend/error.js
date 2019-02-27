export default app => {
  app.on('error', (err, ctx) => {
    console.log('server error', err)
    // ctx.log.error('err')
    // ctx.log.info('from before middleware')
  });
}