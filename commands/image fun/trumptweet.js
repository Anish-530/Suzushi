const Discord = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'trumptweet',
    category: 'image fun',
    description: 'yes it\'s a trump tweet',
    aliases: ['tt', 'trump', 'stupid'],
    usage: 'su trumptweet <text>',
    run: async(bot, message, args)=>{
        try {
            //fix this 
            const fake = await loadImage('./trump_tweet.jpg');
            const canvas = createCanvas(fake.width, fake.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(fake, 0, 0);
            ctx.fillStyle = '#00000';
            var size1 = 37;
            var name = args.slice(0);
            if(!args.slice(0).join(' ')) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least provide some text.\n\nExample :
                \`\`\`fix
su trumptweet <text>\`\`\``)
                return message.channel.send(error);
            }
            do{
                ctx.font = `${size1 -= 5}px sans-serif`;
            } while(ctx.measureText(name).width > name.width - 225);
            let tweet = ctx.measureText(name).length
            if(tweet > 13){
                name.join('\n')
            }
            ctx.fillText(`${name}`, 40, 200);

            const fakenit = new Discord.MessageAttachment(canvas.toBuffer(), 'nani.jpg');
            message.channel.send(fakenit)
        } catch(err) {
                console.log(err);
                return message.channel.send(`Sorry, ${message.author} I was unable to generate a fake nitro`);
        }
    }
}
