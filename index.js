//387786311:AAHPSBye586ZGGjowN68n3jXK93EQR5qm-A


const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '387786311:AAHPSBye586ZGGjowN68n3jXK93EQR5qm-A';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/license [whatever]"
bot.onText(/\/license/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, '给你一个序列号');
});


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, msg.text);
});