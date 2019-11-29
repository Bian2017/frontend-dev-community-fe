/**
 * Redis 配置
 */
import redis from 'redis';
import { promisifyAll } from 'bluebird';
import config from './index';

const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  password: config.REDIS.password,
  // 当给Redis传递二进制的buffer时候，redis server会在回调中将buffer返回回来，而不是将它转换为string。
  detect_buffers: true,
  // 采用官方推荐的重试策略
  retry_strategy: function(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }

    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }

    if (options.attempt > 10) {
      return undefined;
    }

    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
};

/**
 * Bluebird 的 Promise.promisifyAll 方法可以为一个对象的属性中的所有方法创建一个对应的使用 Promise 的版本。
 *
 * 原理：
 * ```javascript
 * // 获取对象的所有方法
 * var keys = util.inheritedDataKeys(target);
 *   for (var i = 0; i < keys.length; ++i) {
 *       var value = target[keys[i]];
 *       if (keys[i] !== "constructor" &&
 *           util.isClass(value)) {
 *           // suffix默认值为Async。此处将所有方法转化为promise，并添加Async后缀
 *           promisifyAll(value.prototype, suffix, filter, promisifier,
 *               multiArgs);
 *           promisifyAll(value, suffix, filter, promisifier, multiArgs);
 *       }
 *   }
 * ```
 */
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
      client.set(key, value, 'EX', time); // 设置过期时间
    } else {
      client.set(key, value);
    }
  } else if (typeof value === 'object') {
    // 使用JSON.stringify转换对象，会消耗一定性能。所以使用Hash表
    Object.keys(value).forEach(item => {
      client.hset(key, item, value[item], redis.print); // redis.print: 打印设置成功之后的系统返回回来的日志
    });
  }
};

const getValue = key => {
  return client.getAsync(key);
};

const getHValue = key => {
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
