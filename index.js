const mineflayer = require('mineflayer')

const config = {
  host: 'vneco.asia',
  password: 'de231980'
}

const botNames = []
for (let i = 1; i <= 10; i++) {
  botNames.push(`ATRONTOP${i}`)
}

function createBot(name) {
  const bot = mineflayer.createBot({
    host: config.host,
    username: name,
    version: false
  })

  bot.on('spawn', () => {
    console.log(`${name} vào server`)
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
      }
    }, 5000)
  })

  bot.on('messagestr', (msg) => {
    const text = msg.toLowerCase()
    if (text.includes('/register')) {
      bot.chat(`/register ${config.password} ${config.password}`)
    }
    if (text.includes('/login')) {
      bot.chat(`/login ${config.password}`)
    }
  })

  bot.on('end', () => {
    setTimeout(() => createBot(name), 5000)
  })
}

botNames.forEach((name, i) => {
  setTimeout(() => createBot(name), i * 2000)
})
