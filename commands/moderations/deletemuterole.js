const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'deletemuterole',
    category: 'moderations',
    description: 'delete the mute role of a server',
    aliases: ['dmr'],
    usage: 'su deletemuterole',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
        let preauto = db.get(`botmuterole_${message.guild.id}`)
        if(preauto === null) {
            const predel = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no muterole set yet. To set an muterole, use \`su muterole <role name or mention a role>\``)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter('Suzushi', bot.user.avatarURL())
            return message.channel.send(predel)
        }
        db.delete(`botmuterole_${message.guild.id}`)
        const wasset = new Discord.MessageEmbed()
        .setTitle(`Mutorole`)
        .setDescription(`<:good:776121655528783964> Mutorole for **${message.guild.name}**, was successfully deleted.`)
        .setColor('#2f3136')
        .setTimestamp(new Date())
        .setFooter('Suzushi', bot.user.avatarURL())
        return message.channel.send(wasset)
    }
}