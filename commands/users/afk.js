const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'afk',
    category: 'users',
    description: 'Want to be AFK? You can use Suzushi.',
    aliases: [],
    usage: 'su afk <reason>',
    run: async(bot, message, args)=>{
        const status = new db.table("AFKs");
        let afk = await status.fetch(message.author.id);
        const embed = new Discord.MessageEmbed().setColor('#2f3136')
        if(!afk) {
            embed.setDescription(`**${message.author.tag}** is now AFK.\nReason : ${args.join(' ') ? args.join(' ') : "AFK"}`)
            status.set(message.author.id, args.join(" ") || `AFK`);
        } else {
            embed.setDescription(`You are no longer AFK`);
            status.delete(message.author.id);
        }
        message.channel.send(embed)
    }
}
