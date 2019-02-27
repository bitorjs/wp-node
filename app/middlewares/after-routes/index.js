export default async (ctx, next) => {
  console.log('after routes');
  await next()
}