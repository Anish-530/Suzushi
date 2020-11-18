const Discord = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'welcomeCard',
    category: 'guild',
    description: 'welcome',
    aliases: [],
    usage: '',
    run: async(bot, Discord, member)=>{
        let chx = db.fetch(`welchannel_${member.guild.id}`);
        const channel = member.guild.channels.cache.get(chx);
        if(!channel) {
            return;
        }
        try{
                const de = await loadImage('./WelcomeCard.jpg');
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
                ctx.fillStyle = '#fffff';
                var size1 = 40;
                var size2 = 37;
                var size3 = 30;
                do{
                    ctx.font = `${size1 -= 8}px Arial`;
                } while(ctx.measureText(member.guild.name).width > canvas.width - 225);
                ctx.fillText(`Welcome To ${member.guild.name}`, 210, 60);
                do{
                    ctx.font = `${size2 -= 8}px Arial`;
                } while(ctx.measureText(member.user.tag).width > canvas.width - 225);
                ctx.fillText(`${member.user.tag}`, 212, 125);
                do{
                    ctx.font = `${size3 -= 8}px Arial`;
                } while(ctx.measureText(member.user.tag).width > canvas.width - 225);
                ctx.fillText(`Member #${member.guild.memberCount}`,212, 190)
                ctx.beginPath();
                ctx.arc(110, 127, 75, 0, Math.PI *2);
                ctx.closePath();
                ctx.clip();        
                ctx.drawImage(avatar, 35, 52, 150, 150);
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.jpg`);
                const embed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setImage(`attachment://Welcome.jpg`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter(`Suzushi`, bot.user.displayAvatarURL())
                channel.send(embed); 
        } catch(err){
            console.log(err);
        }
    }
}