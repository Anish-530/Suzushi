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
    name: 'sleep',
    category: 'interaction',
    description: 'sleep next to someone',
    aliases: [],
    usage: 'su sleep [mention someone]',
    run: async(bot, message, args)=>{
        const mentionedddMembere222bbb = message.mentions.users.first()
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*>_<*`)
                  
                    }
                }
        const shoott = await message.channel.send("\`Sleeping...\`")
        if(message.author === mentionedddMembere222bbb) {
            Tenor.Search.Random("anime sleep", "1").then(Resultsrbb => {
                Resultsrbb.forEach(Postrbb => {
                    var mediaxrbb = Postrbb.media[0];
                    console.log(mediaxrbb.gif);
                    var gifrbb = mediaxrbb.gif
                    console.log(gifrbb)
                    let scbb = new Discord.MessageEmbed()
                    
                    scbb.setColor(0x2f3136)
                    scbb.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** sleeps alone`)
                    scbb.setImage(gifrbb.url)
                    scbb.setTimestamp(new Date())
                    scbb.setFooter("Suzushi", bot.user.avatarURL())
                    return shoott.edit("\t", scbb)
                });
            }).catch(console.error);
        }
        else if (mentionedddMembere222bbb) {
            Tenor.Search.Random("anime sleep", "1").then(Resultsrbb => {
                Resultsrbb.forEach(Postrbb => {
                    var mediaxrbb = Postrbb.media[0];
                    console.log(mediaxrbb.gif);
                    var gifrbb = mediaxrbb.gif
                    console.log(gifrbb)
                    let scbb = new Discord.MessageEmbed()
                 
                    scbb.setColor(0x2f3136)
                    scbb.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** sleeps next to **${message.guild.members.cache.get(mentionedddMembere222bbb.id).displayName}** x_x`)
                    scbb.setImage(gifrbb.url)
                    scbb.setTimestamp(new Date())
                    scbb.setFooter("Suzushi", bot.user.avatarURL())
                    return shoott.edit("\t", scbb)
                });
            })
        }
        else if (!mentionedddMembere222bbb) {
            Tenor.Search.Random("anime sleep", "1").then(Resultsrbb => {
                Resultsrbb.forEach(Postrbb => {
                    var mediaxrbb = Postrbb.media[0];
                    console.log(mediaxrbb.gif);
                    var gifrbb = mediaxrbb.gif
                    console.log(gifrbb)
                    let scbb = new Discord.MessageEmbed()
                    
                    scbb.setColor(0x2f3136)
                    scbb.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** sleeps alone`)
                    scbb.setImage(gifrbb.url)
                    scbb.setTimestamp(new Date())
                    scbb.setFooter("Suzushi", bot.user.avatarURL())
                    return shoott.edit("\t", scbb)
                });
            }).catch(console.error);
        }
    }
}
