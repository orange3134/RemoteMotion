const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// WebSocketのサーバの生成
let ws = require('ws')
var server = new ws.Server({port:PORT});

// 接続時に呼ばれる
server.on('connection', ws => {
    console.log('connected!');
    // クライアントからのデータ受信時に呼ばれる
    ws.on('message', message => {
        var messageString = message.toString();
        console.log(messageString);

        // クライアントにデータを返信
        server.clients.forEach(client => {
            client.send(messageString);
        });
    });

    // 切断時に呼ばれる
    ws.on('close', () => {
        console.log('close');
    });
});