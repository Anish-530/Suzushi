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
    name: 'handhold',
    category: 'interaction',
    description: 'hold someone\'s hand',
    aliases: ['hold'],
    usage: 'su handhold <mention someone>',
    run: async(bot, message, args)=>{
        const mentionedddMember111 = message.mentions.users.first()
                //changed
                if (message.mentions.members.first() !== undefined) {

                    if (message.mentions.members.first().id === bot.user.id) {
                  
                     return message.channel.send(`*🥴*`)
                  
                    }
                }
        if (!mentionedddMember111) return message.channel.send("Who's hand are you trying to hold?")
        if (mentionedddMember111.id === message.author.id) return message.channel.send("There\'s no one to hold your hands? :(")
        const slapp = await message.channel.send("\`Hand-Holding...\`")
        Tenor.Search.Random("anime handholding", "1").then(Results111 => {
            Results111.forEach(Post111 => {
                var mediax111 = Post111.media[0];
                console.log(mediax111.gif);
                var gif111 = mediax111.gif
                console.log(gif111)
                let ki11 = new Discord.MessageEmbed()
                
                ki11.setColor(0x2f3136)
                ki11.setDescription(`**${message.guild.members.cache.get(message.author.id).displayName}** holds **${message.guild.members.cache.get(mentionedddMember111.id).displayName}\'s** hand 🥰`)
                ki11.setImage(gif111.url)
                ki11.setTimestamp(new Date())
                ki11.setFooter("Suzushi", bot.user.avatarURL())
                return slapp.edit("\t", ki11)
            });
        }).catch(console.error); 
        }
    }