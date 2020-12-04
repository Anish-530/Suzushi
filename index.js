
const Discord = require('discord.js');
const { Collection ,Client, MessageEmbed } = require('discord.js');
const { MessageAttachment } = require("discord.js")
const db = require('quick.db');
const date = new Date();
const fs = require('fs');
const bot = new Discord.Client({
    disableEveryone: true
});

bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
const Timeout = new Set();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});


const ms = require('ms')
const { disconnect } = require('process');
const { start } = require('repl');



const PREFIX = "su ";
const token = "Nzc2MTA4OTM5ODYyOTk5MDUx.X6wFxg.YbUJFFaZNYbZUlzQjUyQLkL0c_A";

bot.on('ready', () => {
    bot.user.setActivity(`su help`, {type: "LISTENING"});
    console.log(`Hello, I am online on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.size} users`);
    /*let drops = require('./commands/fun/drop.js')
    drops.run(bot, Discord)*/
})


bot.on('guildMemberAdd', member => {
    let welcanvas = require('./commands/guild/welcomeCard.js')
    welcanvas.run(bot, Discord, member)
    let autorol = db.get(`autorole_${member.guild.id}`)
    if(autorol) {
        member.roles.add(autorol)
    }
    else if(!autorol) return;
})

bot.on('guildMemberRemove', member => {
    let goodcanvas = require('./commands/guild/goodbyeCard.js')
    goodcanvas.run(bot, Discord, member)
})

bot.on('message', async message => {
    let afk = await db.fetch(`afk_${message.guild.id}_${message.author.id}`)
    if(afk !== null){
      db.delete(`afk_${message.guild.id}_${message.author.id}`);
      await message.reply(`Welcome back, I have removed your afk.`)
    }
    let xd = message.mentions.users.first();
    if(xd){
    let id = xd.id;
    let afkcheck = db.fetch(`afk_${message.guild.id}_${id}`)
    if(afkcheck !== null){
       message.reply(`That user is currently AFK with reason: ${afkcheck.reason}, for ${afkcheck.time}`)
        }
    }

if(message.author.bot) return;
if(!message.content.toLowerCase().startsWith(PREFIX)) return;
if(!message.guild) return;


if(!message.member) message.member = await message.guild.fetchMember(message);
const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
const com = args.shift().toLowerCase();
if(com.length == 0 ) return;
const command = bot.commands.get(com) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(com));
if(command){
    if(command.timeout){
        if(Timeout.has(`${message.author.id}${command.name}`)){
            let um = new Discord.MessageEmbed()
            um.setTitle("Hold Up ✋!")
            um.setDescription(`You have to wait more ${ms(command.timeout)}, to use this command again`)
            um.addField('Why?', 'Because this system was installed, in order not to flood the chat with bot commands everywhere', true)
            um.setFooter(`This message gets deleted after 10s`)
            um.setTimestamp(new Date())
            um.setColor(0xf94343)
            return message.reply(um).then(message => message.delete({ timeout: 10000 }));
        } else {
            Timeout.add(`${message.author.id}${command.name}`)
            setTimeout(() => {
                Timeout.delete(`${message.author.id}${command.name}`)
            }, command.timeout);
        }
    }
    command.run(bot, message, args)
}



})


bot.snipes = new Map();
bot.on('messageDelete', function(message, channel){
    bot.snipes.set(message.channel.id, {
        content:message.content,
        author:message.author,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})
bot.edits = new Map();
bot.on('messageUpdate', function(message,channel){
    bot.edits.set(message.channel.id, {
        content:message.content,
        author:message.author
    })
})



bot.login(token);