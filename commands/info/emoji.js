const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'emoji',
    category: 'info',
    description: 'Want an emoji? Don\'t worry, just enter the name of it, and Suzushi will find it out for you.',
    aliases: ['em'],
    usage: 'su emoji <emoji ID>',
    run: async(bot, message, args)=>{
        //improve this, by fetching the id of the emoji and checking for, if it is a gif or png
        try{
            let ID = args.slice(0).join(' ')
            if(isNaN(ID)) {
                return message.channel.send('Please provide me the ID of the emoji')
            }
            if(ID) {
                return message.channel.send(`https://cdn.discordapp.com/emojis/${ID}.gif?v=1`)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}