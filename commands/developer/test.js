const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'test',
    category: '',
    description: '',
    aliases: ['', '', '', ''],
    usage: 'su ',
    run: async(bot, message, args)=>{
        try{
            let reason = args.slice(0).join(' ')
            let join =+ [reason];
            console.log(join)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}