const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'warnings',
    category: 'moderations',
    description: 'get the warnings of a user',
    aliases: ['warns'],
    usage: 'su warnings <mention a user>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const member = message.guild.member(mentionedddMember11);
            if(!member) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whos warnings you are checking.\n\nExample :
                \`\`\`fix
                su warnings <mention a user>
                        OR
                su warnings <ID of a user>\`\`\``)
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
            else if(member){
                let warnings = db.get(`warning_${message.guild.id}_${member.id}`)
                let reasons = db.get(`warnings.reason_${message.guild.id}_${member.id}`)
                
                if(warnings === null) warnings = 0;
                if(reasons !== undefined){
                    let warnembed = new Discord.MessageEmbed()
                    warnembed.setAuthor(`${member.user.tag} - (${member.user.id}) has ${warnings} warning(s)`, member.user.displayAvatarURL({ dynamic: true, format: 'png' }))
                    warnembed.setDescription(`${reasons}`)
                    warnembed.setFooter('Suzushi', bot.user.avatarURL())
                    warnembed.setTimestamp(new Date())
                    warnembed.setColor('#2f3136')
                    return message.channel.send(warnembed)
                }
                else if(reasons === undefined) {
                    let error = new Discord.MessageEmbed()
                    .setTitle(`<:notgood:776121645709525002> ${member.user.tag} has no warnings yet. If you want to warn them, use \`su warn <mention a user or use user ID> <provide a reason>\``)
                    .setColor('#2f3136')
                    return message.channel.send(error)
                }
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}