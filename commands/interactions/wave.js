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
    name: 'wave',
    category: 'interaction',
    description: 'wave at someone',
    aliases: [],
    usage: 'su wave [mention someone]',
    run: async(bot, message, args)=>{
        let mentionedddMembere222baq = message.mentions.users.first()
        let scbaq = new Discord.MessageEmbed()
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*Waves back 👋*`)
                  
                    }
                }
                const pokee = await message.channel.send("\`Waving...\`")
        if(message.author === mentionedddMembere222baq) {
            Tenor.Search.Random("anime waving", "1").then(Resultsrbsq => {
                Resultsrbsq.forEach(Postrbsq => {
                    var mediaxrbsq = Postrbsq.media[0];
                    console.log(mediaxrbsq.gif);
                    var gifrbsq = mediaxrbsq.gif
                    console.log(gifrbsq)
                    let nscbaq = new Discord.MessageEmbed()
                
                    nscbaq.setColor(0x2f3136)
                    nscbaq.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** waves 👋`)
                    nscbaq.setImage(gifrbsq.url)
                    nscbaq.setTimestamp(new Date())
                    nscbaq.setFooter("Suzushi", bot.user.avatarURL())
                    return pokee.edit("\t", nscbaq)
                });
            })
        }
        else if (mentionedddMembere222baq) {
            Tenor.Search.Random("anime waving", "1").then(Resultsrbaq => {
                Resultsrbaq.forEach(Postrbaq => {
                    var mediaxrbaq = Postrbaq.media[0];
                    console.log(mediaxrbaq.gif);
                    var gifrbaq = mediaxrbaq.gif
                    console.log(gifrbaq)
            
                    scbaq.setColor(0x2f3136)
                    scbaq.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** waved at **${message.guild.members.cache.get(mentionedddMembere222baq.id).displayName}** 👋`)
                    scbaq.setImage(gifrbaq.url)
                    scbaq.setTimestamp(new Date())
                    scbaq.setFooter("Suzushi", bot.user.avatarURL())
                    return pokee.edit("\t", scbaq)
                });
            })
        }
        else if (!mentionedddMembere222baq) {
            Tenor.Search.Random("anime waving", "1").then(Resultsrbsq => {
                Resultsrbsq.forEach(Postrbsq => {
                    var mediaxrbsq = Postrbsq.media[0];
                    console.log(mediaxrbsq.gif);
                    var gifrbsq = mediaxrbsq.gif
                    console.log(gifrbsq)
                    let nscbaq = new Discord.MessageEmbed()
              
                    nscbaq.setColor(0x2f3136)
                    nscbaq.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** waves 👋`)
                    nscbaq.setImage(gifrbsq.url)
                    nscbaq.setTimestamp(new Date())
                    nscbaq.setFooter("Suzushi", bot.user.avatarURL())
                    return pokee.edit("\t", nscbaq)
                });
            }).catch(console.error);
        }
    }
}
