const http = require('http');
const fs = require('fs');
const { Telegraf } = require('telegraf');
const bot = new Telegraf('1222502327:AAGAf9fKeIp3XbkdCj5Dj-bPe3EApucTI0w');
const chatIdPath = process.env.DELIVERY_PATH;
const txsPath = process.env.TXS_PATH;
let chatId = readChatId();

bot.on('text', (ctx) => {
    chatId = writeChatId(ctx.message.from.id);
    return ctx.reply(`Freeze requests will be delivered to: ${ctx.message.from.username}`)
})



const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        return fs.createReadStream('index.html').pipe(res);
    }

    if (req.method === 'POST') {
        const unixNano = + new Date();
        const tx = req.url.replace('/', '');
        fs.writeFile(txsPath + unixNano, tx, () => {
            if(chatId && chatId > 0){
                bot.telegram.sendMessage(chatId, tx).then(stats => {
                    res.end(tx);
                });
            }
        });

    }
});

bot.launch();
server.listen(process.env.PORT || 3000);

function writeChatId(chatId){
    fs.writeFileSync(chatIdPath, chatId);
    return parseInt(chatId);
}

function readChatId(){
    const chatId = fs.readFileSync(chatIdPath).toString();
    if(parseInt(chatId.trim()) && parseInt(chatId.trim()) == chatId.trim()){
        return parseInt(chatId.trim());
    }
    return false;
}
