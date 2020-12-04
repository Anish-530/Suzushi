const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'resetlogcount',
    category: 'moderations',
    description: 'Reset the mod log counts',
    aliases: ['rlc', 'resetlogscount'],
    usage: 'su ',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let preguild = db.get(`banlogcount_${message.guild.id}`)
            let messageFilter = (m) => m.author.id === message.author.id;
            if(preguild === null) {
                const predel = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no mod log channels set yet. There are 3 mod log commands \`su banlogs <mention a channel>\`, \`su mutelogs <mention a channel>\` and \`su unbanlogs <mention a channel>\``)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter('Suzushi', bot.user.avatarURL())
                return message.channel.send(predel)
            }
            else if(preguild !== null){
                let sure = new Discord.MessageEmbed()
                sure.setTitle('Are you sure you want to proceed? This is reset all the logs count and you can\'t retrive them back. Type \`yes\` to continue, else type \`cancel\` to cancel the deletation process.')
                sure.setImage('https://i.imgur.com/uPFWU3v.png')
                sure.setTimestamp(new Date())
                sure.setFooter('Suzushi', bot.user.avatarURL())
                sure.setColor(0x2f3136)
                await message.channel.send(sure)
                message.channel.awaitMessages(messageFilter, { max: 1, time: 10000, errors: ['time'] })
                .then(collected => {
                    let collect = collected.first().content;
                    if(collect.toLowerCase() === 'yes'){
                        db.delete(`banlogcount_${message.guild.id}`)
                        const wasset = new Discord.MessageEmbed()
                        .setTitle(`Mod logs count`)
                        .setDescription(`<:good:776121655528783964> Mod logs count for **${message.guild.name}**, was successfully reset!`)
                        .setColor('#2f3136')
                        .setTimestamp(new Date())
                        .setFooter('Suzushi', bot.user.avatarURL())
                        return message.channel.send(wasset)
                    }
                    else if(collect.toLowerCase() === 'cancel') {
                        return message.channel.send('Cancelled the operation')
                    }
                    else{
                        return message.channel.send('You didn\'t choose the correct option')
                    }
                })
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}