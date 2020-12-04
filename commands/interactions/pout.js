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
    name: 'pout',
    category: 'interaction',
    description: 'pout',
    aliases: [],
    usage: 'su pout',
    run: async(bot, message, args)=>{
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*:O*`)
                  
                    }
                }
        const wagg = await message.channel.send("\`Pouting...\`")
        Tenor.Search.Random("anime pout", "1").then(Results1r => {
            Results1r.forEach(Post1q => {
                var mediax1q = Post1q.media[0];
                console.log(mediax1q.gif);
                var gif1q = mediax1q.gif
                console.log(gif1q)
                let kik = new Discord.MessageEmbed()
            
                kik.setColor(0x2f3136)
                kik.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** pouts 🤫`)
                kik.setImage(gif1q.url)
                kik.setTimestamp(new Date())
                kik.setFooter("Suzushi", bot.user.avatarURL())
                return wagg.edit("\t", kik)
            });
        }).catch(console.error);
    }
}
