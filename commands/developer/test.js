const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'help',
    category: 'info',
    description: 'get a list of all the commands or get details of a specific command',
    aliases: [],
    usage: 'su help [a specific command]',
    run: async(bot, message, args)=>{
        if(!args[0]) {
        let help = new Discord.MessageEmbed()
        .setTitle('For more information about a command, or how to use it. Use \`hey help [command name]\`.')
        .setAuthor('We are aware that some of the commands may not work, or do possibly crash. However this will be fixed real soon. Thank you.')
        .addFields(
            {
                name: '😂 | FUN',
                value: `\`\`\`hey 8ball, hey bold,\nhey clap, hey epic,\nhey flip, hey hey,\nhey isimp, hey megay,\nhey meme, hey mesimp,\nhey owofy, hey pog,\nhey sayd(say delete), hey say,\nhey search, hey spoil,\nhey table, hey uwufy\`\`\``
            },
            {
                name: '🎮 | GAMES',
                value: `\`\`\`hey coindecide\nhey diceroll\nhey rps\nhey td\`\`\``
            },
            {
                name: '✨ | GUILD',
                value: `\`\`\`hey emojis\nhey finduser\nhey invite\nhey nick\`\`\``
            },
            {
                name: '⛰ | IMAGE FUN',
                value: `\`\`\`hey bad, hey butterfly\nhey delete, hey fakenitro\nhey nani, hey rip\nhey simp\`\`\``
            },
            {
                name: '🤖 | INFO',
                value: `\`\`\`hey botinvite, hey dmhelp\nhey help, hey info\nhey ping, hey stats\nhey supportserver, hey time\nhey uptime, hey userinfo\`\`\``
            },
            {
                name: '🤝 | INTERACTION',
                value: `\`\`\`hey angry, hey baka, hey blush, hey carry, hey cry, hey confused, hey dab, hey drink, hey explode, hey greet, hey handhold, hey highfive, hey hug, hey kiss, hey laugh, hey lick, hey nom, hey pat, hey poke, hey pout, hey punch, hey scream, hey shoot, hey slap, hey sniff, hey stare, hey tickle, hey wag\`\`\``
            },
            {
                name: '🎲 | MISCELLANEOUS',
                value: `\`\`\`hey avatar\nhey editsnipe\nhey snipe\`\`\``
            },
            {
                name: '⚙ | MODERATION',
                value: `\`\`\`hey ban\nhey clear\nhey createchannel\nhey deletechannel\nhey kick\nhey unban\`\`\``
            }
        )
        .setDescription(`You can vote for me [here](https://top.gg/bot/722729985512833076/vote) | [Support Server](https://discord.gg/9VS3HU5)`)
        .setColor('#2f3136')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        await message.channel.send(help)
        }else {
            return getCMD(bot, message, args[0]);
        }


    function getCMD(bot, message, input) {
    const embed = new Discord.MessageEmbed()

    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info).setFooter('This means that the command you entered was either not found\nor there was mistakes while writing the command\'s name, you can recheck your spelling')).then(message => message.delete({ timeout: 10000 }));
    }
    if (cmd.category) info += `**Category**: ${cmd.category}`;
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if(cmd.timeout) info += `\n**Cooldown**: ${cmd.timeout}s`
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional, Note : If no aliases are provided, then that command has no aliases, i.e. no shortcut.`);
    }

    return message.channel.send(embed.setColor(0x2f3136).setDescription(info));
}
    }
}