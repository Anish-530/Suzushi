const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const db = require('quick.db');
module.exports={
    name: 'remind',
    category: 'users',
    description: 'Want me to remind you something, after the time you provide me? Yes, you absolutely can',
    aliases: ['timer',],
    usage: 'su remind <time> <message>',
    run: async(bot, message, args)=>{
        try{
            let clocks = ["🕐",
            "🕙",
            "🕥",
            "🕚",
            "🕦",
            "🕛",
            "🕧",
            "🕜",
            "🕑",
            "🕝",
            "🕒",
            "🕞",
            "🕓",
            "🕟",
            "🕔",
            "🕠",
            "🕕",
            "🕡",
            "🕖",
            "🕢",
            "🕗",
            "🕣",
            "🕘",
            "🕤"]
            let random_clocks = clocks[Math.floor(Math.random() * clocks.length)]
            let time = args[0]
            let reason = args.slice(1).join(' ')
            if(!time || !reason) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least provide me the time and a reason, for the remainder.\n\nExample :
                \`\`\`fix
su remind <time> <reason>\`\`\``)
                return message.channel.send(error);
            }
            db.set(`remind_${message.author.id}`, Date.now() + ms(time))
            const timeset = new Discord.MessageEmbed()
            .setTitle(`<:good:776121655528783964> Got it! I will remind you in **${time}**`)
            .setColor(0x2f3136)
            message.channel.send(timeset);
            const interval = setInterval(function() {
                if(Date.now() > db.fetch(`remind_${message.author.id}`)) {
                    db.delete(`remind_${message.author.id}`)
                    const timeup = new Discord.MessageEmbed()
                    .setTitle(`${random_clocks} Reminder\'s up!!`)
                    .setColor(0x2f3136)
                    .setDescription(`Reason: ${reason}`)
                    message.reply(timeup);
                    clearInterval(interval)
                }
            }, 1000)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}