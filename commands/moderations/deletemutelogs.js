const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'deletemutelogs',
    category: 'moderations',
    description: 'Delete the mute logs for your server',
    aliases: ['dmutel', 'dml'],
    usage: 'su deletemutelogs',
    run: async(bot, message, args)=>{
        try{
            if (!message.member.hasPermission(['MANAGE_GUILD'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`MANAGE_GUILD\` permission, to use this command.');
            let ban_logs = db.get(`mulogschannel_${message.guild.id}`)
            if(ban_logs === null) {
                const predel = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no mute, unmute and temp-mute logs channel set yet. To set mute, unmute and temp-mute log channel, use \`su muteogs <mention a channel>\``)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter('Suzushi', bot.user.avatarURL())
                return message.channel.send(predel)
            }
            else if(ban_logs !== null) {
                db.delete(`mulogschannel_${message.guild.id}`)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Mute, unmute and temp-mute logs`)
                .setDescription(`<:good:776121655528783964> Mute, unmute and temp-mute logs channel for **${message.guild.name}**, was successfully deleted.`)
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