const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const wait = require('../../timeout.json')
module.exports={
    name: 'addzushi',
    category: 'fun',
    description: 'Add zushi to a user\'s balance, Remember this command is not to cheat',
    aliases: ['addzs'],
    usage: 'su addzushi <mention a user or user ID> <amount of zushi you want to add>',
    run: async(bot, message, args)=>{
        if(message.author.id !== "671355502399193128") return;
        let amount = args.slice(1).join(' ')
        const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        const member = message.guild.member(mentionedddMember11);
        try{
            if(!member || !amount) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whos zushis you are resetting.\n\nExample :
                \`\`\`fix
su addzushi <mention a user> <amount>
OR
su addzushi <ID of a user> <amount>\`\`\``)
                return message.channel.send(error);
            }
             else if(member && amount) {
                let coll = new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle(`<:good:776121655528783964> Successfully added ${amount} zushi(s) to ${member.user.tag}'s zushi balance`)
                message.channel.send(coll)
                db.add(`money_${message.guild.id}_${member.id}`, amount)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}