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
    name: 'hug',
    category: 'interaction',
    description: 'Hug an user virtually',
    aliases: [],
    usage: 'su hug <mention someone>',
    run: async(bot, message, args)=>{
        //changed
        const memberrt = message.mentions.users.first()
        if (message.mentions.members.first() !== undefined) {

            if (message.mentions.members.first().id === bot.user.id) {
          
             return message.channel.send(`*Hugs ${message.author} back!!* 💖`)
          
            }
        }
        const huggg = await message.channel.send("\`Hugging....\`")
        if (!memberrt || memberrt === message.author) {
            let sad = ["https://media.giphy.com/media/FB5EOw0CaaQM0/giphy.gif", "https://s-media-cache-ak0.pinimg.com/originals/73/b1/3b/73b13bcd2590cd93ca1ca9bbc7f917be.gif"]
            let msad = sad[Math.floor(Math.random() * sad.length)]
            let sembed = new Discord.MessageEmbed()
            sembed.setImage(msad)
            sembed.setTitle("I really feel sad to see you alone **" + `${message.guild.members.cache.get(message.author.id).displayName}` + "**!😭")
            sembed.setColor(0x2f3136)
            sembed.setTimestamp(new Date())
            sembed.setFooter("Suzushi", bot.user.avatarURL())
            return huggg.edit("\t", sembed)
        }
        else if (memberrt) {
            Tenor.Search.Random("anime hugs", "1").then(Results => {
                Results.forEach(Post => {
                    var mediax = Post.media[0];
                    var gif = mediax.gif
                    let eh = new Discord.MessageEmbed()
                    eh.setColor(0x2f3136)
                    eh.setDescription(`Guess what? **${message.guild.members.cache.get(message.author.id).displayName}** hugs you **${message.guild.members.cache.get(memberrt.id).displayName}** 😊`)
                    eh.setImage(gif.url)
                    eh.setTimestamp(new Date())
                    eh.setFooter("Suzushi", bot.user.avatarURL())
                    return huggg.edit("\t", eh)
                });
            }).catch(console.error)
        }
    }
}