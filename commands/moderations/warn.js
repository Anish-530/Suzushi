const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const { now } = require('moment');
const db = require('quick.db');
module.exports={
    name: 'warn',
    category: 'moderations',
    description: 'warn a user, if they don\'t follow your rules.',
    aliases: [],
    usage: 'su warn <mention a user or provide their user ID> <provide a reason>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let filter = (m) => m.author.id === message.author.id;
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const member = message.guild.member(mentionedddMember11);
            let dmwarn = db.get(`dmwarns_${message.guild.id}`);
            console.log(dmwarn)
            var reason = args.slice(1).join(' ')
            if(!member) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
su warn <mention a user> <provide a reason>
OR
su warn <ID of a user> <provide a reason>\`\`\``)
                return message.channel.send(error);
            }
            if(member.user.bot){
                return message.channel.send('You cannot warn Bots')
            }
            if(member.id === message.author.id){
                return message.channel.send('You cannot warn yourself')
            }
            if(member.id === message.guild.ownerID) {
                return message.channel.send('You cannot use this command on the guild owner')
            }
            if(!reason){
                const error1 = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
                su warn <mention a user> <provide a reason>
                        OR
                su warn <ID of a user> <provide a reason>\`\`\``)
                return message.channel.send(error1);
            }
            let warnings = db.get(`warning_${message.guild.id}_${member.id}`)
            if(reason){
                db.push(`warnings.reason_${message.guild.id}_${member.id}`,[
                    `\nModerator ${message.author.tag}`,
                    `on \`${new Date().toLocaleString()}\``,
                    `for reason: **${reason}**`
                ])
                if(warnings === null ) {
                        db.set(`warning_${message.guild.id}_${member.id}`, 1)
                        const warnedd = new Discord.MessageEmbed()
                        .setTitle(`<:notgood:776121645709525002> ${member.user.tag} were warned successfully. Use \`su warnings (mention them)\` to check their warnings.`)
                        .setColor(0x2f3136)
                        .setDescription(`Reason: ${reason}`)
                        .setTimestamp(new Date())
                        .setFooter('Suzushi', bot.user.avatarURL())
                        message.channel.send(warnedd);
                } else if(warnings !== null) {
                        db.add(`warning_${message.guild.id}_${member.id}`, 1)
                        const warnedbb = new Discord.MessageEmbed()
                        .setTitle(`<:notgood:776121645709525002> ${member.user.tag} were warned successfully. Use \`su warnings (mention them)\` to check their warnings.`)
                        .setColor(0x2f3136)
                        .setDescription(`Reason: ${reason}`)
                        .setTimestamp(new Date())
                        .setFooter('Suzushi', bot.user.avatarURL())
                        message.channel.send(warnedbb);
                }
            }
            if(dmwarn === 1) {
                member.send(`You were warned in, **${message.guild.name}** by **${message.author.tag}** for reason: ${reason}, at ${new Date().toLocaleString()}`)
            }
            else if(dmwarn === null) {
                return;
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}