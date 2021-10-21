// WebSocketのサーバの生成
let ws = require('ws')
var server = new ws.Server({port:5001});

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