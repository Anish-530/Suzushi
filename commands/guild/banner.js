const Discord = require('discord.js');
const {MessageEmbed, MessageAttachment} = require('discord.js');
const db = require('quick.db');
const request = require('node-superfetch')
const { loadImage, createCanvas } = require('canvas')
module.exports={
    name: 'banner',
    category: 'guild',
    description: 'Sends the banner you provided to a specific channel.',
    aliases: [],
    usage: 'su banner',
    run: async(bot, message, args)=>{
        try{
            let messageFilter = (m) => m.author.id === message.author.id;
            let em = new Discord.MessageEmbed()
            .setTitle('Please send a link for the banner. Type \`cancel\` to cancel the operation')
            .setColor('#2f3136')
            message.channel.send(em)
            message.channel.awaitMessages(messageFilter, { max: 1, time: 100000, errors: ['time'] })
            .then(async collected1 => {
                let con = collected1.first().content;
                await collected1.first().delete();
                let questionMessage;
                let collected;
                let messageFilter = (m) => m.author.id === message.author.id;
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
                                    let error = await message.channel.send('Please mention a channel, for the welcome messages. You can type \`cancel\`, if you want to cancel the setup.');
                                    error.delete({ timeout: 5000 });
                                    resolve(verifyChannel());
                                }
                            } else {
                                resolve(collected.first().mentions.channels.first());
                            }
                        });
                    }
                    questionMessage = await message.channel.send('Which channel do you want to set for welcome messages? You can type \`cancel\`, if you want to cancel the setup.');
                    try {
                        let chan = message.mentions.channels.first();
                        chan = await verifyChannel();
                        let con_em = new Discord.MessageEmbed()
                        .setImage(con)
                        .setColor('#2f3136')
                        chan.send(con_em)
                    } catch (e) {
                        if (e === `Exiting`) {
                            return message.channel.send(`Successfully cancelled the setting of channel for welcome messages`).then(message => message.delete({ timeout: 10000 }));
                        } else if (e === `Timeout`) {
                            await message.channel.send(`Welcome messages setup has timed out. Please run the command again.`,);
                        }
                    }
            })
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}