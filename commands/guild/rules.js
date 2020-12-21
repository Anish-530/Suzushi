const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'rules',
    category: 'guild',
    description: 'Set your guild rules, in a nice little embed',
    aliases: ['rs'],
    usage: 'su rules',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let question;
            let messageFilter = (m) => m.author.id === message.author.id;
            question = message.channel.send('What do you want the title of the embed to be?. Type \`skip\` if you don\'t want a title') 
            message.channel.awaitMessages(messageFilter, { max: 1, time: 10000000, errors: ['time'] })
            .then(async collected => {
                let title = collected.first().content;
                if(title === 'skip') title = ' ';
                await message.channel.send('Now, let\'s go for the embed\'s description. Type something so that it can be the description. Type \`skip\` if you don\'t want a description')
                message.channel.awaitMessages(messageFilter, { max: 1, time: 10000000, errors: ['time'] })
                .then(async collected1 => {
                    let desc = collected1.first().content;
                    if(desc === 'skip') desc = ' ';
                    await message.channel.send('Everything is almost ready! just pick up a good nice color. Please only type hex color codes. Ex : \`#ffffff\`. Type \`skip\` if you don\'t want a color')
                    message.channel.awaitMessages(messageFilter, { max: 1, time: 10000000, errors: ['time'] })
                    .then(async collected2 => {
                        let color = collected2.first().content;
                        if(color === 'skip') color = '#2f3136'
                        await message.channel.send('We are almost there, just needs a footer for the embed. Type \`skip\` if you don\'t want a footer.')
                        message.channel.awaitMessages(messageFilter, { max: 1, time: 10000000, errors: ['time'] })
                        .then(async collected3 => {
                            let footer = collected3.first().content;
                            if(footer === 'skip') footer = ' '
                            let rules = new Discord.MessageEmbed()
                            rules.setTitle(title)
                            rules.setDescription(desc)
                            rules.setColor(`${color}`)
                            rules.setFooter(footer)
                            
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
                                            let error = await message.channel.send('Please mention a channel, to send the rules. You can type \`cancel\`, if you want to cancel the setup.');
                                            error.delete({ timeout: 5000 });
                                            resolve(verifyChannel());
                                        }
                                    } else {
                                        resolve(collected.first().mentions.channels.first());
                                    }
                                });
                            }
                            questionMessage = await message.channel.send('Which channel do you want to send the rules to? You can type \`cancel\`, if you want to cancel the setup.');
                            try {
                                let chan = message.mentions.channels.first();
                                chan = await verifyChannel();
                                const wasset1 = new Discord.MessageEmbed()
                                .setDescription(`<:good:776121655528783964> Rules were succesfully sent to ${chan}`)
                                .setColor('#2f3136')
                                .setTimestamp(new Date())
                                .setFooter('Suzushi', bot.user.avatarURL())
                                await chan.send(rules)
                                await message.channel.send(wasset1)
                            } catch (e) {
                                if (e === `Exiting`) {
                                    return message.channel.send(`Successfully cancelled`).then(message => message.delete({ timeout: 10000 }));
                                } else if (e === `Timeout`) {
                                    await message.channel.send(`Setup has timed out. Please run the command again.`,);
                                }
                            }

                        }).catch(err => message.channel.send(`Oops! looks like the time ran out. \`${err.message}\``))
                    }).catch(err => message.channel.send(`Oops! looks like the time ran out. \`${err.message}\``))
                }).catch(err => message.channel.send(`Oops! looks like the time ran out. \`${err.message}\``))
            }).catch(err => message.channel.send(`Oops! looks like the time ran out. \`${err.message}\``))
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}