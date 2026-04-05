const mineflayer = require('mineflayer');

const SERVER_IP = 'vneco.asia';
const VERSION = '1.20.1';
const PASSWORD = 'de231980';

const accounts = [];
for (let i = 1; i <= 10; i++) {
  accounts.push(`ATRONTOP${i}`);
}

function createBot(username) {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    username: username,
    version: VERSION
  });

  bot.on('login', () => {
    console.log(`${username} đã vào server`);
  });

  bot.on('spawn', () => {
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      bot.chat(`/login ${PASSWORD}`);
    }, 3000);

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('kicked', (reason) => {
    console.log(`${username} bị kick:`, reason);
  });

  bot.on('error', (err) => {
    console.log(`${username} lỗi:`, err);
  });
}

accounts.forEach(acc => createBot(acc));
