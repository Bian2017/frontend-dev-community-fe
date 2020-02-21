const WebSocket = require("ws");
const { getValue, setValue, existKey } = require("./config/RedisConfig");
// const jwt = require("jsonwebtoken");
// const http = require("http");

// const wss = new WebSocket.Server({ noServer: true });
// const server = http.createServer();
const wss = new WebSocket.Server({ port: 3000 });

const group = {}; // 记录每个房间号的人数
const timeInterval = 30000; // 30s

const prefix = "chatbot-";

// ws代表当前收到消息的客户端
wss.on("connection", function connection(ws) {
  ws.isAlive = true; // 初始的心跳连接状态

  // 接收客户端消息
  ws.on("message", async function(msg) {
    const msgObj = JSON.parse(msg);
    const roomid = prefix + (msgObj.roomid ? msgObj.roomid : ws.roomid);

    if (msgObj.event === "enter") {
      /**
       * 当用户进入之后，需要判断用户的房间是否存在。如果用户的房间不存在，
       * 则在redis中创建房间号，用于保存用户信息。主要是用于统计房间里的
       * 人数，用于后面进行消息发送
       */
      ws.name = msgObj.message;
      ws.roomid = msgObj.roomid;
      ws.uid = msgObj.uid;

      // 判断Redis中是否有对应的roomid的键值
      const result = await existKey(roomid);
      if (result === 0) {
        // 初始化一个房间数据
        setValue(roomid, ws.uid);
      } else {
        // 已经存在该房间则缓存用户uid
        const arrStr = await getValue(roomid);
        const arr = arrStr.split(",");
        if (arr.indexOf(ws.uid) === -1) {
          setValue(roomid, `${arrStr},${ws.uid}`);
        }
      }

      if (typeof group[ws.roomid] === "undefined") {
        group[ws.roomid] = 1;
      } else {
        group[ws.roomid] += 1;
      }
    }

    // 鉴权
    // if (msgObj.event === "auth") {
    //   // 密钥设置成secret
    //   jwt.verify(msgObj.message, "secret", function(err, decode) {
    //     if (err) {
    //       console.log("鉴权失败");
    //       ws.send(JSON.stringify({ event: "noauth", message: "请先进行鉴权" }));
    //     } else {
    //       // 鉴权通过
    //       console.log("解密：", decode);
    //       ws.isAuth = true;
    //     }
    //   });
    //   return;
    // }

    // 拦截非鉴权请求
    // if (!ws.isAuth) {
    //   return;
    // }

    // 心跳检测
    if (msgObj.event === "heartbeat" && msgObj.message === "pong") {
      ws.isAlive = true;
      return;
    }

    // 获取当前房间里所有的用户id
    const arrStr = await getValue(roomid);
    const users = arrStr.split(",");

    // 广播消息(即获取所有的客户端)
    wss.clients.forEach(async client => {
      /**
       *  多聊天室功能
       *  roomid -> 对应相同的roomid进行广播消息
       *  补充：如何判断非自己的客户端：ws !== client
       */
      if (client.readyState === WebSocket.OPEN && client.roomid === ws.roomid) {
        msgObj.name = ws.name;
        // msgObj.num = wss.clients.size; // 聊天室的人数
        msgObj.num = group[ws.roomid]; // 聊天室的人数
        client.send(JSON.stringify(msgObj));

        // 排除已发送了消息的客户端(表示现在已上线，可收取之前缓存的消息)
        if (users.indexOf(client.uid) !== -1) {
          users.splice(users.indexOf(client.uid), 1);
        }

        // 取redis中的uid数据，即取用户的消息缓存
        const result = await existKey(ws.uid);
        if (result !== 0) {
          // 存在未发送的离线消息数据
          const msgValue = await getValue(ws.uid);
          const msgArrs = JSON.parse(msgValue);
          const { uid } = ws;

          if (msgArrs.length > 0) {
            const i = [];

            // 遍历该用户的离线缓存数据，取出该房间的缓存数据
            msgArrs.forEach(item => {
              // 判断用户的房间id是否与当前一致
              if (item.roomid === client.roomid && uid === client.uid) {
                // 用户登录到了当前的房间
                console.log("item:", item);
                client.send(JSON.stringify(item));
                i.push(item);
              }
            });

            // 删除刚才已发送的缓存消息数据
            if (i.length > 0) {
              i.forEach(item => {
                msgArrs.splice(item, 1);
              });
            }

            setValue(ws.uid, JSON.stringify(msgArrs));
          }
        }
      }
    });

    // 针对与服务端断开连接的用户id，缓存其他客户端发送了的消息
    if (users.length > 0 && msgObj.event === "message") {
      users.forEach(async function(item) {
        const result = await existKey(item); // uid是否存在(即是否在同一个房间)
        if (result !== 0) {
          // 说明该房间已缓存其他用户发给该用户的离线消息
          const userData = await getValue(item);
          const msgs = JSON.parse(userData);

          msgs.push({ roomid: ws.roomid, ...msgObj });
          setValue(item, JSON.stringify(msgs));
        } else {
          // 说明先前这个用户一直在线，并且无离线消息数据
          setValue(item, JSON.stringify([{ roomid: ws.roomid, ...msgObj }]));
        }
      });
    }
  });

  // 当ws客户端断开链接的时候
  ws.on("close", function() {
    if (ws.name) {
      group[ws.roomid] -= 1;
    }

    const msgObj = {};
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && ws.roomid === client.roomid) {
        msgObj.name = ws.name;
        msgObj.num = group[ws.roomid]; // 聊天室的人数
        msgObj.event = "out";
        client.send(JSON.stringify(msgObj));
      }
    });
  });
});

// server.on("upgrade", function upgrade(request, socket, head) {
//   wss.handleUpgrade(request, socket, head, function done(ws) {
//     wss.emit("connection", ws, request);
//   });
// });

// server.listen(3000);

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive && ws.roomid) {
      group[ws.roomid] -= 1; // 在线人数减1
      delete ws.roomid;
      return ws.terminate(); // 关闭websocket
    }

    ws.isAlive = false;

    // 主动发送心跳检测请求
    // 当客户端返回了消息之后，主动设置flag为在线
    ws.send(
      JSON.stringify({
        event: "heartbeat",
        message: "ping",
        num: group[ws.roomid]
      })
    );
  });
}, timeInterval);
