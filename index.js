const http = require('http');
const https = require('https');

const BOT_TOKEN = '8884463326:AAGd9Z2GRBoGcWotRyMwja2_81LAMMTgNSs';
const CHAT_ID = '7526352123';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const text = url.searchParams.get('text') || 'Hello from Arduino!';
  
  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;
  
  https.get(telegramUrl, (telegramRes) => {
    res.writeHead(200);
    res.end('OK');
  }).on('error', (e) => {
    res.writeHead(500);
    res.end('Error');
  });
});

server.listen(process.env.PORT || 3000);
