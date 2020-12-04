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
    name: 'carry',
    category: 'interaction',
    description: 'carry someone',
    aliases: ['pick', 'up'],
    usage: 'su carry [mention someone]',
    run: async(bot, message, args)=>{
                        //changed
                        if (message.mentions.members.first() !== undefined) {

                            if (message.mentions.members.first().id === bot.user.id) {
                          
                             return message.channel.send(`*Tackles ${message.author} >w<*`)
                          
                            }
                        }
        const pcik = await message.channel.send("\`Carrying...\`")
        const memberrtx = message.mentions.users.first()
        if (!memberrtx|| memberrtx === message.author) {
            let sadx = ["https://media.giphy.com/media/FB5EOw0CaaQM0/giphy.gif", "https://s-media-cache-ak0.pinimg.com/originals/73/b1/3b/73b13bcd2590cd93ca1ca9bbc7f917be.gif"]
            let msadx = sadx[Math.floor(Math.random() * sadx.length)]
            let sembedx = new Discord.MessageEmbed()
            sembedx.setImage(msadx)
            sembedx.setTitle("I really feel sad to see you alone **" + `${message.guild.members.cache.get(message.author.id).displayName}` + "**!😭")
            sembedx.setColor(0x2f3136)
            sembedx.setTimestamp(new Date())
            sembedx.setFooter("Suzushi", bot.user.avatarURL())
            return pcik.edit(`\t`, sembedx)
        }
        else if (memberrtx) {
            Tenor.Search.Random("anime carrying", "1").then(Resultsx => {
                Resultsx.forEach(Postx => {
                    var mediaxx = Postx.media[0];
                    console.log(mediaxx.gif);
                    var gifx = mediaxx.gif
                    console.log(gifx)
                    let ehx = new Discord.MessageEmbed()
                    
                    ehx.setColor(0x2f3136)
                    ehx.setDescription(`Well, **${message.guild.members.cache.get(message.author.id).displayName}** picks you up **${message.guild.members.cache.get(memberrtx.id).displayName}** 😊`)
                    ehx.setImage(gifx.url)
                    ehx.setTimestamp(new Date())
                    ehx.setFooter("Suzushi", bot.user.avatarURL())
                    return pcik.edit(`\t`, ehx)
                });
            }).catch(console.error);
        }
    }
}