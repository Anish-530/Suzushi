const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const warnlogs = require('../moderations/warnlogs');
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
            let welcome = db.get(`welchannel_${message.guild.id}`)
            let servchannel;
            let warns;
            let dmwarns = db.get(`dmwarns_${message.guild.id}`)
            let goodbye = db.get(`goodchannel_${message.guild.id}`);
            let goodchannel;
            let banlogs;
            let ban = db.get(`banlogchannel_${message.guild.id}`);
            let unbanlogs;
            let unban = db.fetch(`unbanlogchannel_${message.guild.id}`);
            let mutelogs;
            let mute = db.get(`mulogschannel_${message.guild.id}`);
            let muterole = db.get(`botmuterole_${message.guild.id}`)
            let muted;
            let log_count = db.get(`banlogcount_${message.guild.id}`)
            let logger;
            let nuked_channel = db.get(`nuked_${message.guild.id}`)
            let nuked
            let extra_log = db.get(`extralogchannel_${message.guild.id}`)
            let extra;
            let warn_log = db.get(`warnlogchannel_${message.guild.id}`)
            let warn;
            if(dmwarns === 1) warns = 'switched on <:good:776121655528783964>'
            else if(dmwarns === null) warns = 'switched off <:notgood:776121645709525002>'
            if(welcome === null) servchannel = 'No welcome channel set yet, for welcome messages.'
            else if(welcome !== null) servchannel = message.guild.channels.cache.get(welcome)
            if(goodbye === null) goodchannel = 'No goodbye channel set yet, for goodbye messages.'
            else if(goodbye !== null) goodchannel = message.guild.channels.cache.get(goodbye);
            if(ban === null) banlogs = 'No channel for ban logs set yet.'
            else if(ban !== null) banlogs = message.guild.channels.cache.get(ban);
            if(unban === null) unbanlogs = 'No channel for unban logs set yet.'
            else if(unban !== null) unbanlogs = message.guild.channels.cache.get(unban);
            if(mutelogs === null) banlogs = 'No channel for mute, unmute and tempmute logs set yet.'
            else if(mutelogs !== null) mutelogs = message.guild.channels.cache.get(mute);
            if(muterole === null) muted = 'No role for mute has been set yet.'
            else if(muterole !== null) muted = message.guild.roles.cache.get(muterole);
            if(autorole === null) servrole = 'No role for auto role has been set yet.'
            else if(autorole !== null) servrole = message.guild.roles.cache.get(autorole);
            if(log_count === null) logger = 'No cases yet.'
            else if(log_count !== null) logger = `Case #${log_count}`
            if(nuked_channel === null) nuked = 'No recent channel nuked.'
            else if(nuked_channel !== null) nuked = nuked_channel;
            if(extra_log === null) extra = 'No channel for extra log set yet.'
            else if(extra_log !== null) extra = message.guild.channels.cache.get(extra_log);
            if(warn_log === null) warn = 'No channel for warn log set yet.'
            else if(warn_log !== null) warn = message.guild.channels.cache.get(warn_log);
            let confi = new Discord.MessageEmbed()
            .setTitle(`Configuration settings of ${message.guild.name}`, message.guild.iconURL())
            .setDescription(`**Welcome Channel:** ${servchannel}\n**Goodbye Channel:** ${goodchannel}\n**Autorole:** ${servrole}\n**DM user on warn:** ${warns}\n**Ban logs channel:** ${banlogs}\n**Unban logs channel:** ${unbanlogs}\n**Mute logs channel:** ${mutelogs}\n**Muterole:** ${muted}\n**Number of cases:** ${logger}\n**Recent nuked channel:** #${nuked}\n**Extra logs channel:** ${extra}\n**Warn logs channel:** ${warn}`)
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