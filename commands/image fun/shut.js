const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'shut',
    category: 'image fun',
    description: 'shut a user',
    aliases: [],
    usage: 'su shut [mention someone]',
    run: async(bot, message, args)=>{
        //add ok hand, adjust the avatar's position a bit
        try{
        const author = message.mentions.users.first() || message.author;
        const authorURL = author.displayAvatarURL({ format: 'png', size: 256 });
        const base = await loadImage('./shut.jpg');
        const ok_hand = await loadImage('./ok_hand.png')
        const authorAvatarData = await request.get(authorURL);
        const authorAvatar = await loadImage(authorAvatarData.body);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        ctx.rotate(0.7);
        ctx.drawImage(authorAvatar, 430, -240, 400, 400);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'nani.jpg');
        message.channel.send(attachment)
        }catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);    
        }
    }
}