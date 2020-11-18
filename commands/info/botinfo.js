const Discord = require('discord.js');
const {MessageEmbed, version: djsversion} = require('discord.js');
const { version } = require('../../package.json')
const db = require('quick.db');
const os = require('os')
const ms = require('ms')
const { utc } = require('moment')
module.exports={
    name: 'botinfo',
    category: 'info',
    description: 'Want to know about Suzushi?',
    aliases: ['bot'],
    usage: 'su botinfo',
    run: async(bot, message, args)=>{        

        //fix and improve
        try{
            const core = os.cpus()[0];
            const embed = new MessageEmbed()
            
                .setThumbnail(bot.user.displayAvatarURL())
                .setColor(message.guild.me.displayHexColor || 'BLUE')
                .addField('General', [
                    `**❯ Client:** ${bot.user.tag} (${bot.user.id})`,
                    `**❯ Servers:** ${bot.guilds.cache.size.toLocaleString()} `,
                    `**❯ Users:** ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                    `**❯ Channels:** ${bot.channels.cache.size.toLocaleString()}`,
                    `**❯ Creation Date:** ${utc(bot.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                    `**❯ Node.js:** ${process.version}`,
                    `**❯ Version:** v${version}`,
                    `**❯ Discord.js:** v${djsversion}`,
                    '\u200b'
                ])
                .addField('System', [
                    `**❯ Platform:** ${process.platform}`,
                    `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                    `**❯ CPU:**`,
                    `\u3000 Cores: ${os.cpus().length}`,
                    `\u3000 Model: ${core.model}`,
                    `\u3000 Speed: ${core.speed}MHz`,
                    `**❯ Memory:**`,
                    `\u3000 Total: ${bot.utils.formatBytes(process.memoryUsage().heapTotal)}`,
                    `\u3000 Used: ${bot.utils.formatBytes(process.memoryUsage().heapUsed)}`
                ])
                .setTimestamp();
    
            message.channel.send(embed);
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }

    }
}

