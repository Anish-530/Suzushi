const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'remind',
    category: 'users',
    description: 'Want me to remind you something, after the time you provide me? Yes, you absolutely can',
    aliases: ['', '', '', ''],
    usage: 'su remind <time> <message>',
    run: async(bot, message, args)=>{
        try{
            
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}