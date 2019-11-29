import redis from 'redis';
import { promisifyAll } from 'bluebird';
import config from './index';

const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  password: config.REDIS.password,
  // 当给Redis传递二进制的buffer时候，redis server会在回调中将buffer返回回来，而不是将它转换为string。
  detect_buffers: true,
  // 采用官方推荐
  retry_strategy: function(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
};

// const client = redis.createClient(options);
const client = promisifyAll(redis.createClient(options));

client.on('error', err => {
  console.log('Redis client error:', err);
});

const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return;
  }

  if (typeof value === 'string') {
    if (typeof time !== undefined) {
      client.set(key, value, 'EX', time);
    } else {
      client.set(key, value);
    }
  } else if (typeof value === 'object') {
    // 使用JSON.stringify转换对象，会消耗一定性能。所以使用Hash表
    Object.keys(value).forEach(item => {
      // redis.print: 打印设置成功之后的系统返回回来的日志
      client.hset(key, item, value[item], redis.print);
    });
  }
};

// const { promisify } = require('util');
// const getAsync = promisify(client.get).bind(client);

const getValue = key => {
  return client.getAsync(key);
};

const getHValue = key => {
  // v8 Promisify methods use util, must node > 8
  // return promisify(client.hgetall).bind(client)(key);

  // bluebird async
  return client.hgetallAsync(key);
};

const delValue = key => {
  return client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully');
    } else {
      console.log('delete redis key error:', err);
    }
  });
};

export { client, setValue, getValue, getHValue, delValue };
