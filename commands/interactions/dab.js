const Discord = require('discord.js');
const Tenor = require("tenorjs").client({
    "Key": "JLH9C6HHQDVR", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "basic", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'dab',
    category: 'interaction',
    description: 'Dab dab muscle up!',
    aliases: [],
    usage: 'su dab [mention someone]',
    run: async(bot, message, args)=>{
        const mentionedddMembere222 = message.mentions.users.first()
        if (message.mentions.members.first() !== undefined) {
            if (message.mentions.members.first().id === bot.user.id) return message.channel.send("*Dabs back!*") 
        }
        const screammm = await message.channel.send("\`Dabbing....\`")
        let sc = new Discord.MessageEmbed()
        if (mentionedddMembere222 === message.author) {
            Tenor.Search.Random("anime dab", "1").then(Resultsr => {
                Resultsr.forEach(Postr => {
                    var mediaxr = Postr.media[0];
                    console.log(mediaxr.gif);
                    var gifr = mediaxr.gif
                    console.log(gifr)
                    
                    sc.setColor(0x2f3136)
                    sc.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** dabs 😼`)
                    sc.setImage(gifr.url)
                    sc.setTimestamp(new Date())
                    sc.setFooter("Suzushi", bot.user.avatarURL())
                    return screammm.edit("\t", sc)
                })
            })
        }
        if (mentionedddMembere222) {
            Tenor.Search.Random("anime dab", "1").then(Resultsr => {
                Resultsr.forEach(Postr => {
                    var mediaxr = Postr.media[0];
                    var gifr = mediaxr.gif
            
                    sc.setColor(0x2f3136)
                    sc.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** dabs at **${message.guild.members.cache.get(mentionedddMembere222.id).displayName}** 😼`)
                    sc.setImage(gifr.url)
                    sc.setTimestamp(new Date())
                    sc.setFooter("Suzushi", bot.user.avatarURL())
                    return screammm.edit("\t", sc)
                });
            })
        }
        else if (!mentionedddMembere222) {
            Tenor.Search.Random("anime dab", "1").then(Resultsr => {
                Resultsr.forEach(Postr => {
                    var mediaxr = Postr.media[0];

                    var gifr = mediaxr.gif
              
                
                    sc.setColor(0x2f3136)
                    sc.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** dabs 😼`)
                    sc.setImage(gifr.url)
                    sc.setTimestamp(new Date())
                    sc.setFooter("Suzushi", bot.user.avatarURL())
                    return screammm.edit("\t", sc)
                });
            }).catch(console.error);
        }
    }
}