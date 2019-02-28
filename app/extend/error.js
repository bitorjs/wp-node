export default app => {
  app.on('error', (err, ctx) => {
    ctx.log.error(err)
  });
}