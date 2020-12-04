const { gifVersion } = require('canvas');
const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'membercount',
    category: 'info',
    description: 'Want to check how many members are there, total in your server? Well, Suzushi can help.',
    aliases: ['members'],
    usage: 'su membercount',
    run: async(bot, message, args)=>{
        try{
            let guild_members = message.guild.memberCount
            let em = new Discord.MessageEmbed()
            .setAuthor(`Total Members of ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setTitle(`${guild_members}`)
            .setColor(0x2f3136)
            message.channel.send(em)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}