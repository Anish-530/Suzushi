const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'dmwarns',
    category: 'moderations',
    description: 'Don\'t want Suzushi to dm warns? Turn this off, else turn it on, if you want Suzushi to dm warns',
    aliases: ['dr'],
    usage: 'su dmwarns <on || off>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let dmwarns = db.get(`dmwarns_${message.guild.id}`)
            let messageFilter = (m) => m.author.id === message.author.id;
            let choice = args.slice(0).join(' ')
            if(!choice) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
su dmwarns <on>
OR
su dmwarns <off>\`\`\``)
                return message.channel.send(error);
            }
            else if(choice) {
                if(choice.toLowerCase() === 'on') {
                    let sure_em = new Discord.MessageEmbed()
                    sure_em.setTitle('By doing this you agree that the members of your server will get DMed by the bot, whenever you warn a member only. Type \`yes\` to continue, else type \`cancel\` to cancel the operation.')
                    sure_em.setImage('https://i.imgur.com/FPgGBvZ.png')
                    sure_em.setColor('#2f3136')
                    sure_em.setFooter('Suzushi', bot.user.avatarURL())
                    sure_em.setTimestamp(new Date())
                    message.channel.send(sure_em)
                    message.channel.awaitMessages(messageFilter, { max: 1, time: 100000, errors: ['time'] })
                    .then(collected => {
                        let collect = collected.first().content;
                        if(collect.toLowerCase() === 'yes') {
                            db.set(`dmwarns_${message.guild.id}`, 1)
                            const on = new Discord.MessageEmbed()
                            .setTitle(`<:good:776121655528783964> DM warns for **${message.guild.name}**, are now turned on successfully.`)
                            .setColor(0x2f3136)
                            return message.channel.send(on);
                        }
                        else if(collect.toLowerCase() === 'cancel') {
                            return message.channel.send('Operation was cancelled');
                        }
                        else {
                            return message.channel.send('You didn\'t choose the right option.');
                        }
                    }).catch(err => message.channel.send('Looks like the time expired. You can run this command again to continue.'))
                }
                else if(choice.toLowerCase() === 'off') {
                    db.delete(`dmwarns_${message.guild.id}`)
                    const off = new Discord.MessageEmbed()
                    .setTitle(`<:notgood:776121645709525002> DM warns for **${message.guild.name}**, are now turned off successfully.`)
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