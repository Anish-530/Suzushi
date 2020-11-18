const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const wait = require('../../timeout.json')
module.exports={
    name: 'daily',
    category: 'fun',
    description: 'collect zushi daily, for more perks',
    aliases: ['daily'],
    usage: 'su daily',
    run: async(bot, message, args)=>{
        let amount = 1
        try{
            let daily = await db.fetch(`daily_${message.guild.id}_${message.author.id}`)
            if(daily !== null && wait.timeout - (Date.now() - daily) > 0){
                let time = ms(wait.timeout - (Date.now() - daily))
                let te = new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle(`<:notgood:776121645709525002> You already have claimed your daily zushi, for today.\nComeback again in ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds.\nYou can use \`su check\` to check, when you can claim your daily zushi again`)
                return message.channel.send(te)
            } else {
                let coll = new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle(`<:good:776121655528783964> Congratulations, you have collcted ${amount} zushi.`)
                message.channel.send(coll)
                db.add(`money_${message.guild.id}_${message.author.id}`, amount)
                db.set(`daily_${message.guild.id}_${message.author.id}`, Date.now())
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}