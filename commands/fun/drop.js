/*const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'drop',
    category: 'fun',
    description: 'claim drops for rewards',
    aliases: [],
    usage: 'su drop',
    run: async(bot, Discord)=>{
        let ch = db.fetch(`dropchannel_${member.guild.id}`);
        const chan = member.guild.channels.cache.get(ch);
        if(!chan) {
            const dele = new Discord.MessageEmbed()
            .setTitle(`Welcome Channel`)
            .setDescription(`Looks like, the drop channel for **${member.guild.name}**, is not yet set. To set it, you can simply, do,
            \`\`\`fix
            su dropchan <mention a channel>\`\`\``)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter('Suzushi', bot.user.avatarURL())
            return member.channel.send(dele)
        }
        else if(chan) {
            var claim = ['Gold drop', 'Silver drop', 'Bronze drop']
            setInterval(function() {
            var fact = Math.floor(Math.random() * claim.length)
            chan.send(claim[fact])
            }, 1000)
        }
    }
}*/