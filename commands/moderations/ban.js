const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'ban',
    category: 'moderation',
    description: 'Ban an user',
    aliases: [],
    usage: 'su ban <mention the user you want to ban>',
    run: async(bot, message, args)=>{
        if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`BAN_MEMBERS\` permission, to use this command.');
        if(!message.member.guild.me.hasPermission(['BAN_MEMBERS'])) return message.reply("I don\'t have the permission to \`BAN_MEMBERS\`.\nPlease provide me the following permission to use this command")  
        const userb = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        var guildID = bot.guilds.cache.get(message.guild.id).id;
        if (!userb) {
            const error = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to at least mention, or provide me the ID of the member, you want to ban.\n\nExample :
            \`\`\`fix
            su ban <mention an user>
                    OR
            su ban <the ID of an user>\`\`\``)
            return message.channel.send(error);
        }
        if(userb.id === message.author.id) return message.reply('Uh! You can\'t ban yourself, you know? :/', {
            allowedMentions: {
              parse: []
            }
          });
        else if (userb) {
            const memberb = message.guild.member(userb);
            let bareason = args.slice(1).join(" ")
            if(!bareason) bareason = "No reason was provided"
            if (memberb) {
                let uban = new Discord.MessageEmbed()
                uban.setAuthor("Ban command used by " + message.guild.members.cache.get(message.author.id).displayName, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                uban.setDescription(`\`\`\`js\n${bot.guilds.resolve(guildID).members.resolve(userb).tag} was successfully banned from ${message.guild.name} 🤕.\n\nReason for banning ${bot.guilds.resolve(guildID).members.resolve(userb).tag} : ${bareason}\n\nUser ID of ${bot.guilds.resolve(guildID).members.resolve(userb).tag} --> [ ${bot.guilds.resolve(guildID).members.resolve(userb).id} ]\`\`\``)
                uban.setColor(0xf94343)
                uban.setTimestamp(new Date())
                uban.setFooter("Suzushi", bot.user.avatarURL())
                await message.channel.send(uban);
                await message.react('👍');
                await bot.guilds.resolve(guildID).members.resolve(userb).ban({reason: bareason}).then(async () => {
                }).catch(err => {
                    message.channel.send('Seems like, I was unable to ban that user. You can try again later')
                    message.react('👎');
                    console.log(err);
                });

            } else {
                message.reply("The user isn\'t in this server").then(message => message.delete({ timeout: 5000 }));
            }
        } else {
            message.reply('That user is not in the server :( ').then(message => message.delete({ timeout: 5000 }));
        }
    }
}
