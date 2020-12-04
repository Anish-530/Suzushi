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
    name: 'kiss',
    category: 'interaction',
    description: 'Kiss an user virtually',
    aliases: [],
    usage: 'su kiss <mention someone>',
    run: async(bot, message, args)=>{
        const mentionedddMember11 = message.mentions.users.first() || message.author;
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*Kisses back ${message.author} UwU*`)
                  
                    }
                }
        if (mentionedddMember11.id === message.author.id) return message.channel.send("Never seen someone kissing themselves 👀")
        if(!args[0]) return message.reply('Seems like you love yourself very much 👀')
        const kisss = await message.channel.send("\`Kissing....\`")
        Tenor.Search.Random("anime kiss", "1").then(Results1 => {
            Results1.forEach(Post1 => {
                var mediax1 = Post1.media[0];
                var gif1 = mediax1.gif
                let ki = new Discord.MessageEmbed()
                ki.setColor(0x2f3136)
                ki.setDescription(`Ahh! **${message.guild.members.cache.get(message.author.id).displayName}** kisses you **${message.guild.members.cache.get(mentionedddMember11.id).displayName}** 😊`)
                ki.setImage(gif1.url)
                ki.setTimestamp(new Date())
                ki.setFooter("Suzushi", bot.user.avatarURL())
                return kisss.edit("\t", ki)
            });
        }).catch(console.error);
    }
}