const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'resetzushis',
    category: 'moderations',
    description: 'Reset the zushis of a user',
    aliases: ['rz'],
    usage: 'su resetzushis <mention the user or use their user ID>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let filter = (m) => m.author.id === message.author.id;
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const member = message.guild.member(mentionedddMember11);
            if(!member) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whos zushis you are resetting.\n\nExample :
                \`\`\`fix
su resetzushis <mention a user>
OR
su resetzushis <ID of a user>\`\`\``)
                return message.channel.send(error);
            }
            else if(member.user.bot){
                return message.channel.send('Bots don\'t have zushis')
            }
            else if(member) {
                let money = db.get(`money_${message.guild.id}_${member.id}`)
                let daily = db.get(`daily_${message.guild.id}_${member.id}`)
                let te = new Discord.MessageEmbed()
                if(money !== null){
                te.setColor('#2f3136')
                te.setTitle(`<:notgood:776121645709525002> This will reset the all the zushis, of the user, that they have collected so far and with hard work, waiting a day for it to collect, etc.`)
                te.setImage('https://i.imgur.com/7w5h2rg.png')
                te.setDescription('Are you sure you want to continue? Type \`yes\` to continue, else type \`no\` to cancel. You have 30 seconds to choose.')
                message.channel.send(te)
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {                    
                        if(collected.first().content.toLowerCase() === 'yes') {
                        db.delete(`money_${message.guild.id}_${member.id}`)
                        db.delete(`daily_${message.guild.id}_${member.id}`)
                        let tett = new Discord.MessageEmbed()
                        .setColor('#2f3136')
                        .setTitle(`<:good:776121655528783964> Zushis for ${member.user.tag}, were successfully reset.`)
                        return message.channel.send(tett)
                    }
                    else if(collected.first().content.toLowerCase() === 'no'){
                        let tettc = new Discord.MessageEmbed()
                        .setColor('#2f3136')
                        .setTitle(`<:Offline:777091424671760385> You cancelled the current operation`)
                        return message.channel.send(tettc)
                    }else {
                        return message.channel.send('You chose the wrong option. Please run the command again.')
                    }
                }).catch(err => {
                    console.log(err);
                    return message.channel.send('You didn\'t choose anything on time. Please run the command again')
                })
                }
                if(money === null) {
                    let teta = new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`<:statusIdle:733765872275161219> ${member.user.tag}, have no zushis to be cleared`)
                    return message.channel.send(teta)
                }
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}