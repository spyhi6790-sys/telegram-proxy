const http = require('http');
const https = require('https');

const BOT_TOKEN = '8884463326:AAGd9Z2GRBoGcWotRyMwja2_81LAMMTgNSs';
const CHAT_ID = '7526352123';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const text = url.searchParams.get('text') || 'Hello from Arduino!';
  
  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`,
    method: 'GET'
  };

  const telegramReq = https.request(options, (telegramRes) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  });
  
  telegramReq.on('error', (e) => {
    res.writeHead(500);
    res.end('Error: ' + e.message);
  });
  
  telegramReq.end();
});

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('Server running');
});
