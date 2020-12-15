const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'unlock',
    category: 'moderations',
    description: 'Unlock a specific channel',
    aliases: [],
    usage: 'su unlock',
    run: async(bot, message, args)=>{
        try{
        if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        if(!message.member.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        let chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let reason = args.slice(1).join(' ')
        if(!reason) reason = 'No reason specified.'
        let extralogs = db.get(`extralogchannel_${message.guild.id}`)
        let extralogs_chan = message.guild.channels.cache.get(extralogs)
        let unlocked = new Discord.MessageEmbed()
        unlocked.setTitle(`<:good:776121655528783964> Channel unlocked successfully`)
        unlocked.setColor('#2f3136')
        if(!chan) {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES : true });
            message.channel.send(unlocked)
        }
        else if(chan) {
            chan.updateOverwrite(chan.guild.roles.everyone, { SEND_MESSAGES : true });
            chan.send(unlocked)
            message.react('👍')
        }
        if(extralogs != null) {
            db.get(`banlogcount_${message.guild.id}`)
            let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
            let ban_log = new Discord.MessageEmbed()
            ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            ban_log.setDescription(`**Channel:** ${extralogs_chan} - (${extralogs_chan.id})\n**Action:** Channel Unlock\n**Reason:** ${reason}`)
            ban_log.setColor(0xf94343)
            ban_log.setTimestamp(new Date())
            ban_log.setFooter(`Case #${ban_log_count}`)
            extralogs_chan.send(ban_log)
        }
        else if(extralogs === null) {
            return;
        }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}