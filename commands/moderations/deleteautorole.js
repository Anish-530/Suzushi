const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'deleteautorole',
    category: 'moderations',
    description: 'delete the autorole of a server',
    aliases: ['dlr', 'dar'],
    usage: 'su deleteautorole',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
        let preauto = db.get(`autorole_${message.guild.id}`)
        if(preauto === null) {
            const predel = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no Autorole set yet. To set an autorole, use \`su autorole <role name or mention a role>\``)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter('Suzushi', bot.user.avatarURL())
            return message.channel.send(predel)
        }
        db.delete(`autorole_${message.guild.id}`)
        const wasset = new Discord.MessageEmbed()
        .setTitle(`Autorole`)
        .setDescription(`<:good:776121655528783964> Autorole for **${message.guild.name}**, was successfully deleted.`)
        .setColor('#2f3136')
        .setTimestamp(new Date())
        .setFooter('Suzushi', bot.user.avatarURL())
        return message.channel.send(wasset)
    }
}