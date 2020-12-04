const Discord = require('discord.js');
const Tenor = require("tenorjs").client({
    "Key": "JLH9C6HHQDVR", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'cry',
    category: 'interaction',
    description: 'cry for yourself or cry for someone',
    aliases: ['sad'],
    usage: 'su cry [mention someone]',
    run: async(bot, message, args)=>{
        const mentionedddMembere222b = message.mentions.users.first()
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*pats ${message.author} TwT*`)
                  
                    }
                }
        const cryy = await message.channel.send("\`Crying...\`")
        let scb = new Discord.MessageEmbed()
        if (mentionedddMembere222b === message.author) {
            Tenor.Search.Random("anime cry", "1").then(Resultsrb => {
                Resultsrb.forEach(Postrb => {
                    var mediaxrb = Postrb.media[0];
                    console.log(mediaxrb.gif);
                    var gifrb = mediaxrb.gif
                    console.log(gifrb)
                    
                    scb.setColor(0x2f3136)
                    scb.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** cries 😭`)
                    scb.setImage(gifrb.url)
                    scb.setTimestamp(new Date())
                    scb.setFooter("Suzushi", bot.user.avatarURL())
                    return cryy.edit("\t", scb)
                })
            })
        }
        else if (mentionedddMembere222b) {
            Tenor.Search.Random("anime cry", "1").then(Resultsrb => {
                Resultsrb.forEach(Postrb => {
                    var mediaxrb = Postrb.media[0];
                    console.log(mediaxrb.gif);
                    var gifrb = mediaxrb.gif
                    console.log(gifrb)
                    
                    scb.setColor(0x2f3136)
                    scb.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** cries for **${message.guild.members.cache.get(mentionedddMembere222b.id).displayName}** 😭`)
                    scb.setImage(gifrb.url)
                    scb.setTimestamp(new Date())
                    scb.setFooter("Suzushi", bot.user.avatarURL())
                    return cryy.edit("\t", scb)
                });
            })
        }
        else if (!mentionedddMembere222b) {
            Tenor.Search.Random("anime cry", "1").then(Resultsrb => {
                Resultsrb.forEach(Postrb => {
                    var mediaxrb = Postrb.media[0];
                    console.log(mediaxrb.gif);
                    var gifrb = mediaxrb.gif
                    console.log(gifrb)
                    
                    scb.setColor(0x2f3136)
                    scb.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** cries 😭`)
                    scb.setImage(gifrb.url)
                    scb.setTimestamp(new Date())
                    scb.setFooter("Suzushi", bot.user.avatarURL())
                    return cryy.edit("\t", scb)
                });
            }).catch(console.error);
        }
    }
}
