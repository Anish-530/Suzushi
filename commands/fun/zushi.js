const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'zushi',
    category: 'fun',
    description: 'check how many zushi(s) you have',
    aliases: ['zs'],
    usage: 'su zushi',
    run: async(bot, message, args)=>{
        try{
            const randomreps = [
                'wait what?!',
                'hmmm',
                'interesting',
                'whatever',
                'huh?',
                'what the :frowning:'
            ]
            let filter = (m) => m.author.id === message.author.id;
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
            const member = message.guild.member(mentionedddMember11);
            const statuser = member.user.presence.status;
            if(member.user.bot){
                message.channel.send('Do you even think, bots can collect daily?')
                await message.channel.awaitMessages(filter, { max: 1, time: 5000, errors: ['time'] })
                .then(async collected => {
                    if(collected.first().content.toLowerCase() === 'yes' || collected.first().content.toLowerCase() === 'hmm' || collected.first().content.toLowerCase() === 'ok') {
                        return message.channel.send(randomreps[Math.floor(Math.random() * randomreps.length)])
                    } else {
                        return;
                    }
                })
            }
            else if(member.user) {
                let money = db.fetch(`money_${message.guild.id}_${member.id}`)
                let limit = '300';
                if(money >= 13) limit = '500';
                if(money === null) money = 0
                const embed = new Discord.MessageEmbed()
                embed.setColor('#2f3136')
                if(statuser === "offline"){
                    embed.setTitle(`<:Offline:777091424671760385> ${member.user.tag}'s Zushi`)
                }
                else if(statuser === "online"){
                    embed.setTitle(`<:good:776121655528783964> ${member.user.tag}'s Zushi`)
                }
                else if(statuser === "dnd"){
                    embed.setTitle(`<:notgood:776121645709525002> ${member.user.tag}'s Zushi`)
                }
                else if(statuser === "idle"){
                    embed.setTitle(`<:statusIdle:733765872275161219> ${member.user.tag}'s Zushi`)
                }
                embed.setDescription(`${money}/${limit} zushis`)
                return message.channel.send(embed)
            }
            
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}