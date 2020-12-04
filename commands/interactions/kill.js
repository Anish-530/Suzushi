const Discord = require('discord.js');
const {MessageEmbed, MessageAttachment} = require('discord.js');
const fs = require('fs');
const Tenor = require("tenorjs").client({
    "Key": "JLH9C6HHQDVR", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
const db = require('quick.db');
module.exports={
    name: 'kill',
    category: 'interactions',
    description: 'angry? want to kill someone?',
    aliases: [],
    usage: 'su kill <mention>',
    run: async(bot, message, args)=>{
        try{
            const mentionedddMembere222b = message.mentions.users.first()
            //changed
            if (message.mentions.members.first() !== undefined) {

                if (message.mentions.members.first().id === bot.user.id) {
              
                 return message.channel.send(`*:( bad*`)
              
                }
            }
            if(!mentionedddMembere222b) return message.channel.send('Mention someone to kill, you can\'t kill yourself :(')
            if(mentionedddMembere222b.id === message.author.id) return message.channel.send('You can\'t kill youself :(')
            let kill = [
                './wasted1.gif',
                './wasted2.gif',
                './wasted3.gif',
                './wasted4.gif',
                './wasted5.gif',
                './wasted6.gif',
                './wasted7.gif'
            ]
            let random_kills = kill[Math.floor(Math.random() * kill.length)]
            
            const attachment = new Discord.MessageAttachment(random_kills, `Kill.gif`);
            const em = new Discord.MessageEmbed()
            .attachFiles(attachment)
            .setImage(`attachment://Kill.gif`)
            .setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** killed **${message.guild.members.cache.get(mentionedddMembere222b.id).displayName}** 🔪`)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter("Suzushi", bot.user.avatarURL())
            return message.channel.send(em)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}