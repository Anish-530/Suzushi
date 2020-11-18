const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'divorce',
    category: 'fun',
    description: 'divorce a user',
    aliases: ['di'],
    usage: 'su divorce <mention a user>',
    run: async(bot, message, args)=>{
        try{
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
            const member = message.guild.member(mentionedddMember11);
            if(member.user.bot) {
                return message.channel.send(`Bots do not have spouses`);
            }
            db.delete(`spouses_${message.guild.id}_${member.id}`)
            db.delete(`spouses_${message.guild.id}_${message.author.id}`)
            db.delete(`spouses.marriedto_${message.guild.id}_${message.author.id}`, [
                member.user.tag
            ])
            db.delete(`spouses.marriedto_${member.id}`, [
                message.author.tag
            ])
                let marryem = new Discord.MessageEmbed()
                .setTitle('Successful')
                marryem.setFooter('Suzushi', bot.user.avatarURL())
                marryem.setTimestamp(new Date())
                marryem.setColor('#2f3136')
                return message.channel.send(marryem)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}