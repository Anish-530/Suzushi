const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'afk',
    category: 'users',
    description: 'Want to be AFK? You can use Suzushi.',
    aliases: [],
    usage: 'su afk <reason>',
    run: async(bot, message, args)=>{
        try{
        let reason = args.join(" ");
        if(reason.toLowerCase().includes(`https://`)) {
            return message.reply(`You cannot have links in your reason ||Ads 101||`)
        }
        if(reason.toLowerCase().includes(`discord.gg`)) {
            return message.reply(`You cannot have links in your reason ||Ads 101||`)
        }
        let afkcheck = db.fetch(`afk_${message.guild.id}_${message.author.id}`);
        if(!args[0]) {
            reason = "AFK";
        }
        if(afkcheck == null){
        await db.set(`afk_${message.guild.id}_${message.author.id}`, {
           tag: message.author.username,
           reason: reason,
       })
       message.channel.send(`I have set your AFK, with reason: ${reason}`).then(m => m.delete({timeout: 5000}))
    }else{
       return;
    }
}catch(err){
    console.log(err)
}
    }
}
