const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'deletebanlogs',
    category: 'moderations',
    description: 'Delete the ban logs for your server',
    aliases: ['dbanl'],
    usage: 'su deletebanlogs',
    run: async(bot, message, args)=>{
        try{
            if (!message.member.hasPermission(['MANAGE_GUILD'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`MANAGE_GUILD\` permission, to use this command.');
            let ban_logs = db.get(`banlogchannel_${message.guild.id}`)
            let ban_logs_count = db.get(`banlogcount_${message.guild.id}`)
            if(ban_logs === null) {
                const predel = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no ban log channel set yet. To set ban log channel, use \`su banlogs <mention a channel>\``)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter('Suzushi', bot.user.avatarURL())
                return message.channel.send(predel)
            }
            else if(ban_logs !== null) {
                db.delete(`banlogchannel_${message.guild.id}`)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Ban Logs`)
                .setDescription(`<:good:776121655528783964> Ban Logs channel for **${message.guild.name}**, was successfully deleted.`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter('Suzushi', bot.user.avatarURL())
                return message.channel.send(wasset)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Looks like some error occured!!')
        }
    }
}
