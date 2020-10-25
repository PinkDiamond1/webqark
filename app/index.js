const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const chatIdPath = process.env.DELIVERY_PATH;
const txsPath = process.env.TXS_PATH;
let chatId = readChatId();

bot.on('text', (ctx) => {
    if(process.env.DELIVERY_ALLOW.split(':').includes(ctx.message.from.id.toString())){
        chatId = writeChatId(ctx.message.from.id);
        return ctx.reply(`Freeze requests will be delivered to: ${ctx.message.from.username}`)
    }
})



const server = http.createServer((req, res) => {

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
        return;
    }

    // parse URL
    const parsedUrl = url.parse(req.url);
    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;

    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
    let ext = path.parse(pathname).ext;

    if(pathname === './'){
        pathname = './index.html';
        ext = '.html';
    }


    // maps file extention to MIME typere
    const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
    };

    pathname = pathname.replace('./', './dist/');
    console.log(`${req.method} ${req.url} => ${pathname}`);

    fs.exists(pathname, function(exist) {
        if (!exist) {
            // if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // if is a directory search for index file matching the extention
        if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

        // read file from file system
        fs.readFile(pathname, function(err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', map[ext] || 'text/plain');
                res.end(data);
            }
        });
    });


})
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

console.log(`Server listening on port ${(process.env.PORT || 3000)}`);
