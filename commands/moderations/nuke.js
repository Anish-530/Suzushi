const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'nuke',
    category: 'moderations',
    description: 'Let suzushi nuke a whole channel for you :)',
    aliases: [],
    usage: 'su nuke',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
            if(!message.member.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
            const nukeChannel = message.channel;
            if(!nukeChannel.deletable) {
                let mebed = new Discord.MessageEmbed()
                .setTitle('<:notgood:776121645709525002> Looks like this channel is not deleteable. So, I can\'t nuke this channel.')
                message.channel.send(mebed)
            }
            await nukeChannel.clone().catch(err => console.log(err))
            await nukeChannel.delete().catch(err => console.log(err))
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}