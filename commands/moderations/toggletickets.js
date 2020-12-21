const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'toggletickets',
    category: 'moderations',
    description: 'Switch on or off, tickets for a server',
    aliases: ['tk'],
    usage: 'su toggletickets <on || off>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let tickets = db.get(`ticket_${message.guild.id}`)
            if(!args[0]) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least choose an option from on and off only.\n\nExample :
                \`\`\`fix
su warn <on>
OR
su warn <off>\`\`\``)
                return message.channel.send(error);
            }
            if(args[0] === 'on'){
                if(tickets === null) {
                    db.set(`ticket_${message.guild.id}`, 1)
                    const wasset = new Discord.MessageEmbed()
                    .setTitle(`Tickets usuage`)
                    .setDescription(`<:good:776121655528783964> Members can now create tickets in **${message.guild.name}**, by \`su ticket\`.`)
                    .setColor('#2f3136')
                    .setTimestamp(new Date())
                    .setFooter('Suzushi', bot.user.avatarURL())
                    return message.channel.send(wasset)
                }
                else if(tickets !== null) {
                    const already = new Discord.MessageEmbed()
                    .setTitle(`<:good:776121655528783964> Tickets for ${message.guild.name} are already switched on. To switch it off, use \`su toggletickets <off>\``)
                    .setColor('#2f3136')
                    .setTimestamp(new Date())
                    .setFooter('Suzushi', bot.user.avatarURL())
                    return message.channel.send(already)
                }
            }
            else if(args[0] === 'off'){
                if(tickets === null) {
                    const predel = new Discord.MessageEmbed()
                    .setTitle(`<:notgood:776121645709525002> Tickets can\'t be created since they are already switched off for ${message.guild.name} . To switch it on, use \`su toggletickets <on>\``)
                    .setColor('#2f3136')
                    .setTimestamp(new Date())
                    .setFooter('Suzushi', bot.user.avatarURL())
                    return message.channel.send(predel)
                }
                else if(tickets !== null) {
                    db.delete(`ticket_${message.guild.id}`)
                    const off = new Discord.MessageEmbed()
                    .setTitle(`<:notgood:776121645709525002> Ticket creations for **${message.guild.name}**, are now turned off successfully.`)
                    .setColor(0x2f3136)
                    return message.channel.send(off);
                }
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}