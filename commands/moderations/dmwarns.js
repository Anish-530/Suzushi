const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'dmwarns',
    category: 'moderations',
    description: 'Don\'t want Suzushi to dm warns? Turn this off, else turn it on, if you want Suzushi to dm warns',
    aliases: ['dr'],
    usage: 'su dmwarns <on || off>',
    run: async(bot, message, args)=>{
        try{
            db.get(`dmwarns_${message.guild.id}`)
            let choice = args.slice(0).join(' ')
            if(!choice) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
                su dmwarns <on>
                        OR
                su dmwarns <off>\`\`\``)
                return message.channel.send(error);
            }
            else if(choice) {
                if(choice.toLowerCase() === 'on') {
                    db.set(`dmwarns_${message.guild.id}`, 1)
                    const on = new Discord.MessageEmbed()
                    .setTitle(`<:good:776121655528783964> DM warns for **${message.guild.name}**, are now turned on successfully.`)
                    .setColor(0x2f3136)
                    return message.channel.send(on);
                }
                else if(choice.toLowerCase() === 'off') {
                    db.delete(`dmwarns_${message.guild.id}`)
                    const off = new Discord.MessageEmbed()
                    .setTitle(`<:notgood:776121645709525002> DM warns for **${message.guild.name}**, are now turned off successfully.`)
                    .setColor(0x2f3136)
                    return message.channel.send(off);
                }
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}