const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const wait = require('../../timeout.json')
const ms = require('parse-ms')
module.exports={
    name: 'check',
    category: 'games',
    description: 'Check, when you can claim your daily zushi again',
    aliases: [],
    usage: 'su check',
    run: async(bot, message, args)=>{
        try{
            let daily = await db.fetch(`daily_${message.guild.id}_${message.author.id}`)
            if(daily !== null && wait.timeout - (Date.now() - daily) > 0){
            let time = ms(wait.timeout - (Date.now() - daily))
            let te = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setTitle(`<a:DND:733764473000689745> You can claim your daily zushi again in ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`)
            return message.channel.send(te)
            } else {
                let coll = new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle(`<a:Online:733764280536662026> Yay! You can claim your daily zushi now. Use \`su daily\` to claim it.`)
                message.channel.send(coll)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}
