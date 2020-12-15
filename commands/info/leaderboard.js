const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'leaderboard',
    category: 'info',
    description: 'Who has more zushis? Check now!',
    aliases: ['lb'],
    usage: 'su leaderboard [Page Number]',
    run: async(bot, message, args)=>{
        try{
            let data = db.get(`money_${message.guild.id}_${message.author.id}`)
            if(!data) return message.channel.send('Looks like an error occured')
            var limit = 15;
            let lastpage = Math.ceil(Object.keys(data).length / limit)
            let page = parseInt(args[0])
            if(!page) page = 1;
            if(page > lastpage) return message.channel.send(`Sorry, there is no page **${page}**`)
            let fp = limit * (page - 1);
            let pagelimit = 15 * page;
            let list = Object.entries(data).sort((a, b) => b[1].amount - a[1].amount).slice(fp, pagelimit);
            let arr = [];
            for(var i in list) {
                arr.push(`**${i * 1 + 1 + fp}.** ${message.guild.members.cache.get(list[i][0]) ? message.guild.members.cache.get(list[i][0]).user.tag : "Unknown User"} - amount: **${list[i][1].amount}**`)
            }
            let em = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(`${message.guild.name} Zushi Leaderboard`, message.guild.iconURL({ size: 2048, dynamic: true }))
            .setDescription(arr.join("\n"))
            .setFooter(`Suzushi | Page: ${page} / ${lastpage}`, bot.user.avatarURL())
            return message.channel.send(em)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}