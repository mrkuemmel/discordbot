// Load up the discord.js library
const Discord = require("discord.js");

//Google spreadsheet stuff
var Spreadsheet = require('edit-google-spreadsheet');

//Too lazy to implement my own, this seems kind of sketchy but looks like it works lmao
var MarkovChain = require('markovchain-generate');

//My job would be so much easier if it wasn't a Google Spreadsheet
var fs = require("fs");
//var seraphThesis = fs.readFileSync("./seraph.txt", {"encoding": "utf-8"});

var mappedItems = {

}

var paragons = {
    Havencraft: "204741410442706944",
    Runecraft: "261610099699744769",
    Shadowcaft: "232040363957813248",
    Forestcraft: "289789718638362625",
    Swordcraft: "100482322888933376",
    Dragoncraft: "323638452262535169",
    Bloodcraft: "206304635672068098",
    Portalcraft: "194297171829325825"
}

var secondaries = {
    Havencraft: "142898856999387136",
    Runecraft: "261678719511429120",
    Shadowcaft: "360227821999882240",
    Forestcraft: "355373307979366403",
    Swordcraft: "173427691595366402",
    Dragoncraft: "TBD",
    Bloodcraft: "176455413003190272",
    Portalcraft: "262329399901159426"
}

var titleRows = {
    Paragon: 22,
    Secondary: 51,
    Guest: 81,
    Tournament: 111
}

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

//REMEMBER TO READ FROM SALTER CACHE ON STARTUP

// Here we load the config.json file that contains our token and our prefix values.
//const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Practicing Coding Bat`);
    /*Spreadsheet.load({
        debug: true,
        spreadsheetName: 'Dawnbreakers Deck Data Log',
        worksheetName: 'SAlter Cache',
        oauth2: {
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            refresh_token: process.env.refresh_token
        }
    },
        function sheetReady(err, spreadsheet) {
            if (err) throw err;
            spreadsheet.receive({ getValues: true }, function (err, rows, info) {
                if (err) throw err;
                //console.log(rows);
                //console.log(Object.keys(rows));
                for (var i = 1; i <= Object.keys(rows).length; i++) {
                    var obj = rows[i];
                    //console.log(obj);
                    mappedItems[obj['1']] = obj['2'];

                }
                //console.log(mapped);
            });
        });*/
});

/*client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setGame(`on ${client.guilds.size} servers`);
});*/

function checkMap(name) {
    while (name !== checkHelper(name)) {
        name = checkHelper(name);
    }
    return name;
}

//lmao fuck the users
function checkHelper(name) {
    var mapKeys = Object.keys(mappedItems);
    var trueName = name;
    if (mapKeys.indexOf(name) !== -1) {
        trueName = mappedItems[name];
    }
    return trueName;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//lmao im drunk
/*function findCraft(lower) {
    lower = lower.toLowerCase();
    var deckCraft = "ERROR";
    if (lower.indexOf("haven") !== -1) {
        deckCraft = "Havencraft";
    }
    else if (lower.indexOf("shadow") !== -1) {
        deckCraft = "Shadowcraft";
    }
    else if (lower.indexOf("rune") !== -1) {
        deckCraft = "Runecraft";
    }
    else if (lower.indexOf("forest") !== -1) {
        deckCraft = "Forestcraft";
    }
    else if (lower.indexOf("sword") !== -1) {
        deckCraft = "Swordcraft";
    }
    else if (lower.indexOf("dragon") !== -1) {
        deckCraft = "Dragoncraft";
    }
    else if (lower.indexOf("blood") !== -1) {
        deckCraft = "Bloodcraft";
    }
    else if (lower.indexOf("portal") !== -1) {
        deckCraft = "Portalcraft";
    }
    return deckCraft;
}*/
client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;
    }

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(process.env.prefix) !== 0) return;

    //bot_and_salt only
    //if (message.channel.name != "salt_and_salter" && message.channel.name != "team_chat" && message.channel.name != "general" && message.channel.name != "granblue_discussion") return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(process.env.prefix.length).trim().split(/\;/g);
    const command = args.shift().toLowerCase();
    console.log(command);
    console.log(args);

    if(command === "magic8ball"){
      var randomNumberBetween0and22 = Math.floor(Math.random()*20);
      var responses = ["It is certain","It is decidedly so","Without a dobut",
      "Yes, definitely","You may rely on it","You can count on it","As I see it, yes"
      "Most likely","Outlook good","Yes","Signs point to yes","Absolutely","Reply hazy try again",
      "Ask again later","Better not tell you now","Cannot predict now","Concentrate and ask again",
      "Don't count on it","My reply is on","My sources say no","Outlook not so good","Very doubtful",
      "Chances aren't good"];
      message.channel.send(responses[randomNumberBetween0and22]);
      return;
    }

    
    else {
        message.channel.send("You know, I'm only a bot");
        return;
    }
});

client.login(process.env.BOT_TOKEN);
