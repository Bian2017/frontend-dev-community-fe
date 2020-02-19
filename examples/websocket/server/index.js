const WebSocket = require("ws");
const http = require("http");
const jwt = require("jsonwebtoken");

const wss = new WebSocket.Server({ noServer: true });
const server = http.createServer();

const group = {}; // 记录每个房间号的人数
const timeInterval = 1000; // 1s

// ws代表当前收到消息的客户端
wss.on("connection", function connection(ws) {
  ws.isAlive = true; // 初始的心跳连接状态

  // 接收客户端消息
  ws.on("message", function(msg) {
    const msgObj = JSON.parse(msg);

    if (msgObj.event === "enter") {
      ws.name = msgObj.message;
      ws.roomid = msgObj.roomid;

      if (typeof group[ws.roomid] === "undefined") {
        group[ws.roomid] = 1;
      } else {
        group[ws.roomid] += 1;
      }
    }

    // 鉴权
    if (msgObj.event === "auth") {
      // 密钥设置成secret
      jwt.verify(msgObj.message, "secret", function(err, decode) {
        if (err) {
          console.log("鉴权失败");
          ws.send(JSON.stringify({ event: "noauth", message: "请先进行鉴权" }));
        } else {
          // 鉴权通过
          console.log("解密：", decode);
          ws.isAuth = true;
        }
      });
      return;
    }

    // 拦截非鉴权请求
    if (!ws.isAuth) {
      return;
    }

    // 心跳检测
    if (msgObj.event === "heartbeat" && msgObj.message === "pong") {
      ws.isAlive = true;
      return;
    }

    // 广播消息(即获取所有的客户端)
    wss.clients.forEach(client => {
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
      }
    });
  });

  // 当ws客户端断开链接的时候
  ws.on("close", function(msg) {
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

server.on("upgrade", function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
});

server.listen(3000);

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      group[ws.roomid] -= 1; // 在线人数减1
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