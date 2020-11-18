const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'autorole',
    category: 'guild',
    description: 'set the autorole, which gets assigned to new members, when they join',
    aliases: ['ar'],
    usage: 'su autorole <role name or mention the role>',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
        if(!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_ROLES\` permission to use this command")
        try{
        const role = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === args.join(' ').toLowerCase() || role.id === args.join(' ')
        ) || message.mentions.roles.first();
        if(!args[0]){
            const error = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to provide me at least, the name or mention the role.\n\nExample :
            \`\`\`fix
      su autorole <role name>
              OR
      su autorole <mention the role>\`\`\``)
            return message.channel.send(error);
        }
        else if(args[0]){
            db.set(`autorole_${message.guild.id}`, role.id)
            const wasset = new Discord.MessageEmbed()
            .setTitle(`Autorole`)
            .setDescription(`<:good:776121655528783964> Autorole for **${message.guild.name}**, is now set as ${role}`)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter('Suzushi', bot.user.avatarURL())
            message.channel.send(wasset)
           }
        }catch(err){
            const error = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to provide me at least, the name or mention the role.\n\nExample :
            \`\`\`fix
      su autorole <role name>
              OR
      su autorole <mention the role>\`\`\``)
            return message.channel.send(error);
        }
    }
}