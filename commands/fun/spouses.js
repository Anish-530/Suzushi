const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'spouses',
    category: 'fun',
    description: 'get the spouses of a user or yourself',
    aliases: ['spu'],
    usage: 'su spouses <mention a user>',
    run: async(bot, message, args)=>{
        try{
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
            const member = message.guild.member(mentionedddMember11);
            if(member.user.bot) {
                return message.channel.send(`Bots do not have spouses`);
            }
            let spouses = db.get(`spouses_${message.guild.id}_${member.id}`)
            let marriedto = db.get(`spouses.marriedto_${message.guild.id}_${member.id}`)
                let marryem = new Discord.MessageEmbed()
                marryem.setAuthor(`Spouse(s) of ${member.user.tag} - (${member.user.id})). Has ${spouses} spouse(s)`, member.user.displayAvatarURL({ dynamic: true, format: 'png' }))
                marryem.setDescription(`${marriedto}`)
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