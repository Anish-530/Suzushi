const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
module.exports={
    name: 'tempmute',
    category: 'moderations',
    description: 'Temporarily mute someone, and Suzushi will automatically unmute them after the time you had provided expires.',
    aliases: ['tm'],
    usage: 'su tempmute <mention the user> <provide a time> [reason]',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
            if(!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) return reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_ROLES\` permission to use this command")
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
            const member = message.guild.member(mentionedddMember11);
            let chx = db.get(`mulogschannel_${message.guild.id}`);
            const channel = message.guild.channels.cache.get(chx);
            const time = args[1]
            let reason = args.slice(2).join(' ')
            if(!reason) reason = "No reason specified";
            if(!member || !time) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide me the member\'s ID.\n\nExample :
                \`\`\`fix
su tempmute <mention the member> <time> [reason]
OR
su tempmute <provide the ID of the member> <time> [reason]\`\`\``)
                return message.channel.send(error);
            }
            else if(member && time){
                let mute = db.get(`botmuterole_${message.guild.id}`)
                let mrole = message.guild.roles.cache.get(mute);
                if(mute === null) {
                    let er = new Discord.MessageEmbed()
                    .setTitle('<:notgood:776121645709525002> Looks like muterole, for this server has not been set yet. To set it, use \`su muterole <mention a role>\`.')
                    .setColor('#2f3136')
                    message.channel.send(er)
                }
                else if(mute !== null) {
                    if(member.roles.cache.has(mrole.id)) return message.channel.send('That user is already muted.')
                    else if(!member.roles.cache.has(mrole.id)) {
                        member.roles.add(mrole)
                        let mute_em = new Discord.MessageEmbed()
                        mute_em.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                        mute_em.setDescription(`<:good:776121655528783964> **${member.user.tag}** were muted. Reason : ${reason}.\nTime : ${time}`)
                        mute_em.setColor(`#2f3136`)
                        mute_em.setTimestamp(new Date())
                        await message.channel.send(mute_em)
                        setTimeout(async function() {
                            member.roles.remove(mrole)
                            let unmute_em = new Discord.MessageEmbed()
                            unmute_em.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                            unmute_em.setDescription(`<:good:776121655528783964> **${member.user.tag}** were unmuted. Reason : ${reason}.`)
                            unmute_em.setColor(`#2f3136`)
                            unmute_em.setTimestamp(new Date())
                            await message.channel.send(unmute_em)
                            if(chx != null) {
                                db.get(`banlogcount_${message.guild.id}`)
                                let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
                                let ban_log = new Discord.MessageEmbed()
                                ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                                ban_log.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Action:** Unmute\n**Reason:** ${reason}`)
                                ban_log.setColor(0x2ac075)
                                ban_log.setTimestamp(new Date())
                                ban_log.setFooter(`Case #${ban_log_count}`)
                                channel.send(ban_log)
                                }
                                else if(chx === null) {
                                    return;
                                }
                        }, ms(time));
                        if(chx != null) {
                            db.get(`banlogcount_${message.guild.id}`)
                            let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
                            let ban_log = new Discord.MessageEmbed()
                            ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                            ban_log.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Action:** Temp-Mute\n**Reason:** ${reason}\n**Time:** ${time}`)
                            ban_log.setColor(0xe0d90b)
                            ban_log.setTimestamp(new Date())
                            ban_log.setFooter(`Case #${ban_log_count}`)
                            channel.send(ban_log)
                            }
                            else if(chx === null) {
                                return;
                            }
                    }
                }     
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}