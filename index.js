
const Discord = require('discord.js');
const { Collection ,Client, MessageEmbed } = require('discord.js');
const { MessageAttachment } = require("discord.js")
const db = require('quick.db');

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


const PREFIX = "su ";
const token = "Nzc2MTA4OTM5ODYyOTk5MDUx.X6wFxg.YbUJFFaZNYbZUlzQjUyQLkL0c_A";

bot.on('ready', () => {
    bot.user.setActivity(`su help`, {type: "LISTENING"});
    console.log(`Hello, I am online on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.size} users`);
})

bot.on("error", async(err) => {
    console.log(err)
    })
bot.on('message', async message => {
if(message.author.bot) return;
if(!message.content.toLowerCase().startsWith(PREFIX)) return;
if(!message.guild) {
    const t = new Discord.MessageEmbed()
    t.setTitle('STOP WHERE YOU ARE! ✋')
    t.setColor(0xf94343)
    t.setDescription('🤷‍♀️ | You can\'t use commands inside DMs')
    t.setTimestamp(new Date())
    t.setFooter('You may stop using commands in DMs')
    return message.channel.send(t);
}
let afk = new db.table("AFKs")
    authorStatus = await afk.fetch(message.author.id),
    mentioned = message.mentions.members.first();

if(mentioned) {
    let status = await afk.fetch(mentioned.id)

if(status) {
    const embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`**${mentioned.user.tag}** is currently AFK: **${status}**`)
    message.channel.send(embed).then(message => message.delete({ timeout: 10000 }));
    }
}
if(authorStatus) {
    const embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`**${message.author.tag}**, I have successfully removed your AFK`)
    message.channel.send(embed).then(message => message.delete({ timeout: 10000 }));
    afk.delete(message.author.id)
}

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