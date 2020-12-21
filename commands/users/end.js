const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'end',
    category: 'users',
    description: 'Close a ticket',
    aliases: ['close'],
    usage: 'su end',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            if (!message.channel.name.includes('ticket-')) return message.channel.send('This is not a ticket channel.');
            await message.channel.send('This ticket will be deleted in \`10 seconds\`')
            setTimeout(async () => {
                await message.channel.delete();
            }, 10000);
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}