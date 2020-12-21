const Discord = require('discord.js');
const {MessageEmbed, MessageAttachment} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'banner',
    category: 'guild',
    description: 'Sends the banner you provided to a specific channel.',
    aliases: [],
    usage: 'su banner',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let questionMessage;
            let collected;
            let messageFilter = (m) => m.author.id === message.author.id;
            let arg = args.slice(0).join(' ');
            if(!arg) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whom you are warning.\n\nExample :
                \`\`\`fix
su banner <link of the image>\`\`\``)
                return message.channel.send(error);
            }
            if(!arg.includes('https') || !arg.includes('http')) return message.channel.send('That doesn\'t seem like a valid URL')
            
            else {
                message.delete();
                async function verifyChannel() {
                    return new Promise(async (resolve, reject) => {
                        collected = await message.channel.awaitMessages(
                            messageFilter,
                            { max: 1, time: 600000 },
                        );
                        if (collected.size === 0) reject(`Timeout`);
                        else if (collected.first().mentions.channels.size === 0) {
                            if (
                                collected.first().content.toLowerCase() === 'cancel'
                            ) {
                                reject(`Exiting`);
                            } else {
                                let error = await message.channel.send('Please mention a channel, to send the banner. You can type \`cancel\`, if you want to cancel the setup.');
                                error.delete({ timeout: 5000 });
                                resolve(verifyChannel());
                            }
                        } else {
                            resolve(collected.first().mentions.channels.first());
                        }
                    });
                }
                questionMessage = await message.channel.send('Which channel do you want to send the banner to? You can type \`cancel\`, if you want to cancel the setup.');
                try {
                    let chan = message.mentions.channels.first();
                    chan = await verifyChannel();
                    const wasset1 = new Discord.MessageEmbed()
                    .setDescription(`<:good:776121655528783964> Banner was succesfully sent to ${chan}`)
                    .setColor('#2f3136')
                    .setTimestamp(new Date())
                    .setFooter('Suzushi', bot.user.avatarURL())
                    let image_em = new Discord.MessageEmbed()
                    image_em.setImage(arg)
                    image_em.setColor('#2f3136')
                    await chan.send(image_em)
                    await message.channel.send(wasset1)
                } catch (e) {
                    if (e === `Exiting`) {
                        return message.channel.send(`Successfully cancelled`).then(message => message.delete({ timeout: 10000 }));
                    } else if (e === `Timeout`) {
                        await message.channel.send(`Setup has timed out. Please run the command again.`,);
                    }
                }
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}