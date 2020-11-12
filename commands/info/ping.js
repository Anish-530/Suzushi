const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'ping',
    category: 'info',
    description: 'Check the ping of Suzushi',
    aliases: ['p','botping'],
    usage: 'su ping',
    run: async(bot, message, args)=>{
        try {
            const m = await message.channel.send("Getting Information <a:discloading:759683718142623744>")
            const pingg = m.createdTimestamp - message.createdTimestamp;
            const pi = new Discord.MessageEmbed()
            if(pingg >= 0 && pingg < 300) {
            pi.setColor(`#a1ee33`)
            pi.setDescription(`<:good:776121655528783964> I feel fresh and active today :)\n\tMy Ping is \`${pingg}ms\` `)
            return m.edit(`\t`, pi);
            }
            else if(pingg > 300 && pingg <= 500) {
            pi.setColor('#f5bd1f')
            pi.setDescription(`<:somewhatgood:776121650025726015> I somewhat feel good today :|\n\tMy Ping is \`${pingg}ms\``)
            return m.edit(`\t`, pi);
            }
            else if(pingg > 500 && pingg <= 10000) {
            pi.setColor(`#f94343`)
            pi.setDescription(`<:notgood:776121645709525002> I don\'t feel good today :(\n\tMy Ping is \`${pingg}ms\` `)
            return m.edit(`\t`, pi);
            }

        }catch(err){
            return m.edit("\t",'Oops! Looks like something went wrong, You can try again Later.')
        }
    }
}