const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'config',
    category: 'guild',
    description: 'Check all the settings of Suzushi, for your guild',
    aliases: ['settings'],
    usage: 'su config',
    run: async(bot, message, args)=>{
        try{
            let autorole = db.get(`autorole_${message.guild.id}`)
            let servrole;
            if(servrole === undefined){
                servrole = 'No role specified yet, for Autorole.'
            } 
            else if(servrole !== undefined){
                servrole = message.guild.roles.cache.get(autorole);
            }
            let welcome = db.get(`welchannel_${message.guild.id}`)
            let servchannel;
            let warns;
            let dmwarns = db.get(`dmwarns_${message.guild.id}`)
            if(dmwarns === 1) warns = 'switched on'
            else if(dmwarns === null) warns = 'switched off'
            if(welcome === null) servchannel = 'No welcome channel set yet, for welcome messages.'
            else if(welcome !== null) servchannel = message.guild.channels.cache.get(welcome)
            let confi = new Discord.MessageEmbed()
            .setTitle(`Configuration settings of ${message.guild.name}`, message.guild.iconURL())
            .setDescription(`**Welcome Channel**: ${servchannel}\n**Autorole**: ${servrole}\n**DM user on warn**: ${warns}`)
            .setColor(`#2f3136`)
            .setFooter('Suzushi', bot.user.avatarURL())
            .setTimestamp(new Date())
            message.channel.send(confi)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}