const TelegramBot = require('node-telegram-bot-api');
const {
  exec
} = require('child_process');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1142563610:AAGlnxLHbkcF584keYOYGd8eMTumw8P95YQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});

const AllowedCommands = ["screenfetch", "ls", "ifconfig" , "curl ifconfig.me"];

bot.onText(/\/command (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  if (!AllowedCommands.includes(match[1])){
    bot.sendMessage(chatId, "incorrect or illegal command");
    bot.sendMessage(chatId, "Allowed commands: " + AllowedCommands);
    return;
  }else {
    exec(match[1], (err, stdout, stderr) => {


      if (err) {
        bot.sendMessage(chatId, "error executing command");
      }
  
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      bot.sendMessage(chatId, "output of command: " + stdout + "\n" + "err: " + stderr);
    });
  }

});