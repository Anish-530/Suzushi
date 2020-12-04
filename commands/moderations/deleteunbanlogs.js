const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'deleteunbanlogs',
    category: 'moderations',
    description: 'Delete the unban logs for your server',
    aliases: ['udl'],
    usage: 'su deleteunbanlogs',
    run: async(bot, message, args)=>{
        try{
            if (!message.member.hasPermission(['MANAGE_GUILD'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`MANAGE_GUILD\` permission, to use this command.');
            let ban_logs = db.get(`unbanlogchannel_${message.guild.id}`)
            if(ban_logs === null) {
                const predel = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no Unban log channel set yet. To set Unban log channel, use \`su unbanlogs <mention a channel>\``)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter('Suzushi', bot.user.avatarURL())
                return message.channel.send(predel)
            }
            else if(ban_logs !== null) {
                db.delete(`unbanlogchannel_${message.guild.id}`)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Unban Logs`)
                .setDescription(`<:good:776121655528783964> Unban Logs channel for **${message.guild.name}**, was successfully deleted.`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter('Suzushi', bot.user.avatarURL())
                return message.channel.send(wasset)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}