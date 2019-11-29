import { setValue, getValue, getHValue, delValue } from './RedisConfig';

setValue('imooc', 'imooc message');

getValue('imooc').then(res => {
  console.log('getValue:', res);
});

delValue('imooc');

setValue('User2', { name: 'Li', age: 20, city: 'HZ' });

getHValue('User2').then(res => {
  console.log('getHValue:', JSON.stringify(res, null, 2));
});
