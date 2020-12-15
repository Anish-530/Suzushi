const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'fetchbans',
    category: 'moderations',
    description: 'Fetches the number of bans of a guild',
    aliases: ['fb','bans'],
    usage: 'su fetchbans',
    run: async(bot, message, args)=>{
        try{
            const banList = await message.guild.fetchBans();
            let em = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Total number banned members of ${message.guild.name}: \`${banList.size}\``)
            .setColor('#2f3136')
            message.channel.send(em)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}