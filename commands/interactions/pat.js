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
    name: 'pat',
    category: 'interaction',
    description: 'pat yourself or pat someone',
    aliases: [],
    usage: 'su pat [mention someone]',
    run: async(bot, message, args)=>{
                        //changed
                        if (message.mentions.members.first() !== undefined) {

                            if (message.mentions.members.first().id === bot.user.id) {
                          
                             return message.channel.send(`*n-n-n-ny-nya-nyaaaaa >v<*`)
                          
                            }
                        }
        const patt = await message.channel.send("\`Patting...\`")
        let mentionedddMembere222ba = message.mentions.users.first()
        let scba = new Discord.MessageEmbed()
        if(message.author === mentionedddMembere222ba) {
            Tenor.Search.Random("anime pat", "1").then(Resultsrbs => {
                Resultsrbs.forEach(Postrbs => {
                    var mediaxrbs = Postrbs.media[0];
                    console.log(mediaxrbs.gif);
                    var gifrbs = mediaxrbs.gif
                    console.log(gifrbs)
                    let nscba = new Discord.MessageEmbed()
                
                    nscba.setColor(0x2f3136)
                    nscba.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** pat themselves 🥺`)
                    nscba.setImage(gifrbs.url)
                    nscba.setTimestamp(new Date())
                    nscba.setFooter("Suzushi", bot.user.avatarURL())
                    return patt.edit("\t", nscba)
                });
            })
        }
        else if (mentionedddMembere222ba) {
            Tenor.Search.Random("anime pat", "1").then(Resultsrba => {
                Resultsrba.forEach(Postrba => {
                    var mediaxrba = Postrba.media[0];
                    console.log(mediaxrba.gif);
                    var gifrba = mediaxrba.gif
                    console.log(gifrba)
                    
                    scba.setColor(0x2f3136)
                    scba.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** pats **${message.guild.members.cache.get(mentionedddMembere222ba.id).displayName}** 🤩`)
                    scba.setImage(gifrba.url)
                    scba.setTimestamp(new Date())
                    scba.setFooter("Suzushi", bot.user.avatarURL())
                    return patt.edit("\t", scba)
                });
            })
        }
        else if (!mentionedddMembere222ba) {
            Tenor.Search.Random("anime pat", "1").then(Resultsrbs => {
                Resultsrbs.forEach(Postrbs => {
                    var mediaxrbs = Postrbs.media[0];
                    console.log(mediaxrbs.gif);
                    var gifrbs = mediaxrbs.gif
                    console.log(gifrbs)
                    let nscba = new Discord.MessageEmbed()
              
                    nscba.setColor(0x2f3136)
                    nscba.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** pat themselves 🥺`)
                    nscba.setImage(gifrbs.url)
                    nscba.setTimestamp(new Date())
                    nscba.setFooter("Suzushi", bot.user.avatarURL())
                    return patt.edit("\t", nscba)
                });
            }).catch(console.error);
        }
    }
}
