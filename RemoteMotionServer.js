
// WebSocketのサーバの生成
var ws = require('ws');
var port = process.env.PORT || 5001;
var server = new ws.Server({port:port});
console.log('port:' + port);

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