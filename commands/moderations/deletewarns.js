const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'deletewarns',
    category: 'moderations',
    description: 'deletewarns of an entire server',
    aliases: ['delwarns','resetwarns'],
    usage: 'su deletewarns',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
        try{
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const member = message.guild.member(mentionedddMember11);
            if(!member) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
                su deletewarns <mention a user>
                        OR
                su deletewarns <ID of a user>\`\`\``)
                return message.channel.send(error);
            }
            if(member.user.bot) {
                return message.channel.send(`Bots do not have warnings`);
            }
            if(member.id === message.author.id) {
                return message.channel.send('You can\'t use this command on yourself');
            }
            if(member.id === message.guild.ownerID) {
                return message.channel.send('You cannot use this command on the guild owner')
            }
            let warnings = db.get(`warning_${message.guild.id}_${member.id}`)
            if(warnings === null) {
                const nowarn = new Discord.MessageEmbed()
                .setTitle(`<:statusIdle:733765872275161219> ${member.user.tag} don\'t have any warnings yet. If you want to warn them, use \`su warn <mention a user or use user ID> <provide a reason>\``)
                .setColor('#2f3136')
                return message.channel.send(nowarn);
            }
            const error = new Discord.MessageEmbed()
            if(warnings > 1){
                error.setTitle(`<:good:776121655528783964> ${warnings} warnings of ${member.user.tag}, were successfully deleted`)
            }
            else if(warnings === 1) {
                error.setTitle(`<:good:776121655528783964> ${warnings} warning of ${member.user.tag}, was successfully deleted`)
            }
            error.setColor(0x2f3136)
            error.setTimestamp(new Date())
            error.setFooter('Suzushi', bot.user.avatarURL())
            await message.channel.send(error);
            db.delete(`warnings.reason_${message.guild.id}_${member.id}`)
            db.delete(`warning_${message.guild.id}_${member.id}`)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}