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
    name: 'baka',
    category: 'interaction',
    description: 'call someone baka',
    aliases: ['fool'],
    usage: 'su baka <mention someone>',
    run: async(bot, message, args)=>{
        const mentionedddMember1113 = message.mentions.users.first() || message.author;
        if (!mentionedddMember1113) { return message.channel.send(`**${message.author.username}** calls themselves baka! `); }
        if (mentionedddMember1113 === message.author) { return message.channel.send(`**${message.author.username}** calls themselves baka! `) }
        //changed
        if (message.mentions.members.first() !== undefined) {

            if (message.mentions.members.first().id === bot.user.id) {
          
             return message.channel.send(`*B-b-b-baka >~< ${message.author}*`)
          
            }
        }
        const bakaa = await message.channel.send("\`Baka...\`")
        Tenor.Search.Random("anime angry baka", "1").then(Results1113 => {
            Results1113.forEach(Post1113 => {
                var mediax1113 = Post1113.media[0];
                console.log(mediax1113.gif);
                var gif1113 = mediax1113.gif
                console.log(gif1113)
                let ki113 = new Discord.MessageEmbed()
                
                ki113.setColor(0x2f3136)
                ki113.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** calls **${message.guild.members.cache.get(mentionedddMember1113.author.id).displayName}** a baka 👀`)
                ki113.setImage(gif1113.url)
                ki113.setTimestamp(new Date())
                ki113.setFooter("Suzushi", bot.user.avatarURL())
                return bakaa.edit("\t", ki113)
            });
        }).catch(console.error);  
    }
}
