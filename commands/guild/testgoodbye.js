const Discord = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'testgoodbye',
    category: 'guild',
    description: 'test the amazing goodbye canvas',
    aliases: ['tgc'],
    usage: 'su testgoodbye [mention someone]',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        let ch = db.fetch(`goodchannel_${message.guild.id}`);
        const chan = message.guild.channels.cache.get(ch);
        if(!chan) {
            const dele = new Discord.MessageEmbed()
            .setTitle(`Goodbye Channel`)
            .setDescription(`Looks like, the goodbye channel for **${message.guild.name}**, is not yet set. To set it, you can simply, do,
            \`\`\`fix
su setgoodbye <mention a channel>\`\`\``)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter('Suzushi', bot.user.avatarURL())
            return message.channel.send(dele)
        }
        try{
                const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
                const member = message.guild.member(mentionedddMember11);
                const de = await loadImage('./GoodbyeCard.jpeg');
                const dnd = await loadImage('./dnd.png')
                const idle = await loadImage('./idle.png')
                const offline = await loadImage('./offline.png')
                const online = await loadImage('./online.png')
                const statuser = member.user.presence.status;
                const canvas = createCanvas(de.width, de.height);
                const avatar = await loadImage(member.user.displayAvatarURL({format: "png"}));
                const ctx = canvas.getContext('2d');
                ctx.strokeStyle = '#74037b';
                ctx.strokeRect(10, 10, canvas.width, canvas.height);
                ctx.drawImage(de, 0, 0);
                if(statuser === 'dnd'){
                    ctx.drawImage(dnd, 138, 163, 74, 74);
                }
                else if(statuser === 'offline'){
                    ctx.drawImage(offline, 138, 163, 74, 74);
                }
                else if(statuser === 'online'){
                    ctx.drawImage(online, 138, 163, 74, 74);
                }
                else if(statuser === 'idle'){
                    ctx.drawImage(idle, 138, 163, 74, 74);
                }
                ctx.fillStyle = '#ffffff';
                var size1 = 40;
                var size2 = 37;
                var size3 = 30;
                do{
                    ctx.font = `${size1 -= 8}px Arial`;
                } while(ctx.measureText(message.guild.name).width > canvas.width - 225);
                ctx.fillText(`Leaving from ${message.guild.name}`, 210, 60);
                do{
                    ctx.font = `${size2 -= 8}px Arial`;
                } while(ctx.measureText(member.user.tag).width > canvas.width - 225);
                ctx.fillText(`Goodbye ${member.user.tag}`, 212, 125);
                do{
                    ctx.font = `${size3 -= 8}px Arial`;
                } while(ctx.measureText(message.guild.memberCount).width > canvas.width - 225);
                ctx.fillText(`Member #${message.guild.memberCount}`,212, 190)
                ctx.beginPath();
                ctx.arc(110, 127, 75, 0, Math.PI *2);
                ctx.closePath();
                ctx.clip();        
                ctx.drawImage(avatar, 35, 52, 150, 150);
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `Goodbye.jpg`);
                const embed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setImage(`attachment://Goodbye.jpg`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter(`Suzushi`, bot.user.displayAvatarURL())
                await chan.send(embed);
                await message.react('👍')
        } catch(err){
            console.log(err);
        }
    }
}