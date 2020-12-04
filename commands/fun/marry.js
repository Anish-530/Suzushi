const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'marry',
    category: 'fun',
    description: 'marry a user OwO',
    aliases: [],
    usage: 'su marry <a user>',
    run: async(bot, message, args)=>{
        try{
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const member = message.guild.member(mentionedddMember11);
            let filter = (m) => m.member === member;
            /*db.get(`spouses.marriedto_${message.guild.id}_${message.author.id}`,[
                member.user.tag
            ])
            let already = db.has(`spouses.marriedto_${message.guild.id}_${message.author.id}`, [
                member.user.tag
            ])
            if(already) {
                return message.channel.send('You are already married to that user')
            }*/

                if(!member) {
                    const error = new Discord.MessageEmbed()
                    .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                    .setColor(0x2f3136)
                    .setDescription(`You have to at least mention or provide the id of the user, whom you want to marry.\n\nExample :
                    \`\`\`fix
su marry <mention a user>
OR
su marry <ID of a user>\`\`\``)
                    return message.channel.send(error);
                }
                if(member.user.bot){
                    return message.channel.send('You cannot marry Bots')
                }
                if(member.id === message.author.id){
                    return message.channel.send('You cannot marry yourself')
                }
                else if (member) {
                            db.add(`spouses_${message.guild.id}_${member.id}`, 1)
                            db.add(`spouses_${message.guild.id}_${message.author.id}`, 1)
                            db.push(`spouses.marriedto_${message.guild.id}_${message.author.id}`, [
                                member.user.tag
                            ])
                            db.push(`spouses.marriedto_${message.guild.id}_${member.id}`, [
                                message.author.tag
                            ])
                            await message.reply(`Yay!! ${member.user.username} accepted your proposal, and now they are with you.`)
                }
    
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}