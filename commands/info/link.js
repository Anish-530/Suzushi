const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const request = require('node-superfetch')
const db = require('quick.db');
module.exports={
    name: 'link',
    category: 'info',
    description: 'Get the link of any image',
    aliases: [],
    usage: 'su link <image>',
    run: async(bot, message, args)=>{
        try{
            let attach = args[0]
            //message.channel.send(`\`${attach.proxyURL}\``)
            //message.channel.send(`\`${attach.url}\``)
            let em = new Discord.MessageEmbed()
            em.setImage(attach.url)
            em.setColor('#2f3136')
            message.channel.send(em)
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}