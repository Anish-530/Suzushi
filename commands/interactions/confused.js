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
    name: 'confused',
    category: 'interaction',
    description: 'Are you confused?',
    aliases: [],
    usage: 'su confused',
    run: async(bot, message, args)=>{
        const mentionedddMember11 = message.mentions.users.first() || message.author;
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*Confused confusion noises*`)
                  
                    }
                }
        const kisss = await message.channel.send("\`Confused....\`")
        Tenor.Search.Random("anime confused", "1").then(Results1 => {
            Results1.forEach(Post1 => {
                var mediax1 = Post1.media[0];
                var gif1 = mediax1.gif
                let ki = new Discord.MessageEmbed()
                ki.setColor(0x2f3136)
                ki.setDescription(`Looks like **${message.guild.members.cache.get(message.author.id).displayName}** is confused 😕`)
                ki.setImage(gif1.url)
                ki.setTimestamp(new Date())
                ki.setFooter("Suzushi", bot.user.avatarURL())
                return kisss.edit("\t", ki)
            });
        }).catch(console.error);
    }
}