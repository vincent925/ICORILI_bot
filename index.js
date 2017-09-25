//387786311:AAHPSBye586ZGGjowN68n3jXK93EQR5qm-A


const TelegramBot = require('node-telegram-bot-api');
var License = require('./model/license.js');
var UUID = require('uuid');

// replace the value below with the Telegram token you receive from @BotFather
const token = '387786311:AAHPSBye586ZGGjowN68n3jXK93EQR5qm-A';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/license [whatever]"
bot.onText(/\/license/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  var userid = msg.from.id;
  var username = msg.from.username;
  License.findOne({
    where: { userid: userid }
  }).then(function (l) {
    if (l != null) {
      bot.sendMessage(chatId, '每个人只能领取一个邀请码，你已经领取过邀请码了哦，您的邀请码为：' + l.license + '\n欢迎加入我们的群：https://t.me/joinchat/EsO6wAzj_ixR3t9gGnA9oQ');
    }
    else {
      var lse = {
        license: UUID.v1(),
        state: 'notactive',
        userid: userid,
        username: username
      };

      License.create(lse).then(function (result) {
        bot.sendMessage(chatId, '每个人只有一次领取机会哦，你给了别人自己就没有了哦！一定拿好这个邀请码：' + lse.license + '\n欢迎加入我们的群：https://t.me/joinchat/EsO6wAzj_ixR3t9gGnA9oQ');
      });

    }
  });

});


// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, msg.text);
// });


bot.onText(/\/start/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  var userid = msg.from.id;
  var username = msg.from.username;
  bot.sendMessage(chatId, '/web 获取ICO日历的网址。\n/license 获取注册邀请码。\n/search [邀请码]  查询邀请码状态，命令后加空格不用输入中括号。\n欢迎加入我们的群：https://t.me/joinchat/EsO6wAzj_ixR3t9gGnA9oQ');

});

bot.onText(/\/web/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  var userid = msg.from.id;
  var username = msg.from.username;
  bot.sendMessage(chatId, 'ICO日历的网址：http://icorili.net\n欢迎加入我们的群：https://t.me/joinchat/EsO6wAzj_ixR3t9gGnA9oQ');

});

bot.onText(/\/search (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  var userid = msg.from.id;
  var username = msg.from.username;
  const resp = match[1];
  License.findOne({
    where: { license: resp }
  }).then(function (l) {
    if (l != null) {
      if (l.state == 'notactive') {
        bot.sendMessage(chatId, '您的邀请码还未激活，可以使用哦！o(^▽^)o');
      }
      else {
        bot.sendMessage(chatId, '您的邀请码已经被使用了...( ▼-▼ )');
      }
    }
    else {
      bot.sendMessage(chatId, '找不到这个邀请码！≧ ﹏ ≦');

    }
  });

});