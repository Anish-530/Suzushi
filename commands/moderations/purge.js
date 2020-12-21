const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'purge',
    category: 'moderations',
    description: 'Purge messages',
    aliases: ['clear', 'del'],
    usage: 'su purge <amount>',
    run: async(bot, message, args)=>{
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`BAN_MEMBERS\` permission, to use this command.');
        if(!message.member.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.reply("I don\'t have the permission to \`BAN_MEMBERS\`.\nPlease provide me the following permission to use this command") 
        //make this completely
        try{
        const user = message.mentions.users.first();
        // Parse Amount
        const amount = parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.reply('Must specify an amount to delete!');
        if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
        // Fetch 100 messages (will be filtered and lowered up to max amount requested)
        message.channel.messages.fetch({
        limit: 100,
        }).then((messages) => {
        if (user) {
        const filterBy = user ? user.id : bot.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        });
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}