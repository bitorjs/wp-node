const koaSso = require('koa-sso')

export default app => {
  app.use(koaSso({
    ssourl: 'https://sso.duibatest.com.cn/',
    systemId: 29,
    systemName: 'jimo',
    appSecret: '95cfda1e006330958c2abbefd64d5259',
    profiles: 'test'
  }))
}