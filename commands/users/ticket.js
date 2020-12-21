const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'ticket',
    category: 'users',
    description: 'create a ticket in a server',
    aliases: ['tc'],
    usage: 'su ticket',
    run: async(bot, message, args)=>{
        try{
            let tickets = db.get(`ticket_${message.guild.id}`)
            if(tickets === null) {
                const predel = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Tickets can\'t be created as they are not turned on for ${message.guild.name} . To switch it on, use \`su toggletickets <on>\``)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter('Suzushi', bot.user.avatarURL())
                return message.channel.send(predel)
            }
            else if(tickets !== null){
                if(message.guild.channels.cache.find(ch => ch.name === `ticket-${message.author.tag}`)) return message.channel.send('You already have a ticket open.')
                const Channel = await message.guild.channels.create(`ticket-${message.author.tag}`, {
                    type: `text`,
                    permissionOverwrites: [
                        {
                            id: message.author.id,
                            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, 'READ_MESSAGE_HISTORY']
                        },
                        {
                            id: message.guild.id,
                            deny: [`VIEW_CHANNEL`]
                        }
                    ]
                })
                    await Channel.send(`${message.author}` , new Discord.MessageEmbed()
                    .setTitle('Ticket Created Successfully!')
                    .setDescription(`Please wait for the staff team to respond. You have to at least wait for \`2-3 minutes\`. Remember if you opened the ticket for no reason. There can be a mute for you for solid \`4\` hours or maybe a \`kick\` or \`ban\` too. Be as much descriptive you can be, so that staff team can get deep into the issue and help you.`)
                    .setColor('#2f3136'))
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}