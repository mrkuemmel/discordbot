//loads discord.js library
const Discord = require('discord.js');

//creates discord client
const client = new Discord.Client();

//load package.json file
const config = require("./package.json");


client.on('ready', () => {
    console.log('I am ready!');
    client.user.setActivity(`Practicing Coding Bat`);
});

//async means this applies to all messages recieved
client.on('message', async message => {
  //returns nothing if bot is author of message
   if (message.author.bot) return;
  //returns nothing if message doesn't start with prefix
   if(message.content.indexOf(config.prefix) !== 0) return;

   const args = message.content.slice(config.prefix.length).trim().split(/ ./g);
   const command = args.shift().toLowerCase();

   if(command=="whoisagoodboy"){
     message.channel.send("little stevie is!");
   }

    if(command === "magic8ball"){
      var randomNumberBetween0and22 = Math.floor(Math.random()*20);
      var responses = ["It is certain","It is decidedly so","Without a dobut",
     "Yes, definitely","You may rely on it","You can count on it","As I see it, yes",
     "Most likely","Outlook good","Yes","Signs point to yes","Absolutely","Reply hazy try again",
     "Ask again later","Better not tell you now","Cannot predict now","Concentrate and ask again",
     "Don't count on it","My reply is no","My sources say no","Outlook not so good","Very doubtful",
     "Chances aren't good"];
     message.channel.send(responses[randomNumberBetween0and22]);
   }

   if (command=="help"){
     message.channel.send("A current list of commands are: whoisagoodboy, magic8ball, help");

   }
});

//client.login(process.env.BOT_TOKEN);

client.login(config.token);
