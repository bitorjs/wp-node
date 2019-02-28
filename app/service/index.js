import axios from '../libs/axios';

export {}

export const aa = async ()=> {
  console.warn('09998')
  axios.get('/').then(res => {
    console.log(res)
  })
  const res = await axios.get('/');
  console.warn(res)
  return 'from service2-' + res;
}
