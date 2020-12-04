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
    name: 'wag',
    category: 'interaction',
    description: 'wag your tail, wya~',
    aliases: ['tail'],
    usage: 'su wag',
    run: async(bot, message, args)=>{
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*bites tail OwO hehehe*`)
                  
                    }
                }
        const wagg = await message.channel.send("\`Wagging...\`")
        Tenor.Search.Random("anime wagging tail", "1").then(Results1r => {
            Results1r.forEach(Post1q => {
                var mediax1q = Post1q.media[0];
                console.log(mediax1q.gif);
                var gif1q = mediax1q.gif
                console.log(gif1q)
                let kik = new Discord.MessageEmbed()
            
                kik.setColor(0x2f3136)
                kik.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** wags their tail! ✨`)
                kik.setImage(gif1q.url)
                kik.setTimestamp(new Date())
                kik.setFooter("Suzushi", bot.user.avatarURL())
                return wagg.edit("\t", kik)
            });
        }).catch(console.error);
    }
}
