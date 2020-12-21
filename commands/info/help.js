const Discord = require('discord.js');
const reactionPages = async (message, author, options, page, retries) => {
    const restartLoop = async () => { await reactionPages(message, author, options, page, retries); }
    const filter = (reaction, user) => {
        if (options.allowOtherUserReactions) {
            return Object.values(options.emojis).includes(reaction.emoji.name);
        } else {
            return Object.values(options.emojis).includes(reaction.emoji.name) && user.id === author.id;
        }
    }
    
    const collectorOptions = {
        max: 1,
        time: (options.timeLimit * 1000),
        errors: ['time']
    }
    
    message.awaitReactions(filter, collectorOptions)
        .then(async (collected) => {
            const reaction = collected.first();
const minPage = 0;
const maxPage = (options.pages.length - 1);


if (reaction.emoji.name === options.emojis.firstPage) {
    // head back to the first page
if (page === minPage) return restartLoop();

page = minPage;
message = await message.edit(options.pages[minPage]);
return restartLoop();
}

if (reaction.emoji.name === options.emojis.previousPage) {
    // move to the previous page
if (page === minPage) return restartLoop();

page--;
message = await message.edit(options.pages[page]);
return restartLoop();
}

if (reaction.emoji.name === options.emojis.stop) {
    // stop listening
return true;
}

if (reaction.emoji.name === options.emojis.delete) {
    // delete the message (also stops listening)
await message.delete();
const helpd = new Discord.MessageEmbed()
helpd.setThumbnail('https://i.imgur.com/JmFQNiz.gif')
helpd.setColor(0x2f3136)
helpd.setTitle('> Help command deleted!')
helpd.setDescription('> This message gets deleted after 10 seconds')
await message.channel.send(helpd).then(message => message.delete({ timeout: 10000 }));
return true;   
}

if (reaction.emoji.name === options.emojis.nextPage) {
    // move to the next page
if (page === maxPage) return restartLoop();

page++;
message = await message.edit(options.pages[page]);
return restartLoop();
}

if (reaction.emoji.name === options.emojis.lastPage) {
   // head forward to the last page
page = maxPage;
message = await message.edit(options.pages[maxPage]);
return restartLoop();      
}

        }).catch(async (error) => {
                if (retries >= options.maximumRetries) {
                    return true;
                } else {
                    retries++;
                    return restartLoop();
                }
        });
}
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'help',
    category: 'info',
    description: 'get a list of all the commands or get details of a specific command',
    aliases: [],
    usage: 'su help [a specific command]',
    //work on the help command
    run: async(bot, message, args)=>{
        try{
        if(!args[0]) {
        const emojis = {
            firstPage: '⏮',
            previousPage: '◀',
            delete: '🗑',
            nextPage: '▶',
            lastPage: '⏭'
        }
  
        const pages = [
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`su help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '😂 | FUN',
                            value: '\`su check\`\n\`su daily\`\n\`owo\`\n\`uwu\`\n\`zushi\`\n'
                        }
                    ]
                }
            },
            /*{
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`hey help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '🎮 | GAMES',
                            value: `\`hey coindecide\`\n\`hey diceroll\`\n\`hey rps\`\n\`hey td\``
                        }
                    ]
                }
            },*/
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`su help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '✨ | GUILD',
                            value: `\`su banner\`\n\`su config\`\n\`su dump\`\n\`su guild\`\n\`su roleinfo\`\n\`su rules\`\n\`su testgoodbye\`\n\`su testwelcome\`\n`
                        }
                    ]
                }
            },
            /*{
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`su help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '⛰ | IMAGE FUN',
                            value: `\`hey bad\`\n\`hey butterfly\`\n\`hey delete\`\n\`hey fakenitro\`\n\`hey nani\`\n\`hey rip\`\n\`hey simp\`\n`
                        }
                    ]
                }
            },*/
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`su help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '🤖 | INFO',
                            value: `\`su anime\`\n\`su avatar\`\n\`su help\`\n\`su membercount\`\n\`su ping\`\n\`su userinfo\`\n`
                        }
                    ]
                }
            },
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`su help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '🤝 | INTERACTION',
                            value: `\`su angry\`\n\`su annoyed\`\n\`su baka\`\n\`su blush\`\n\`su carry\`\n\`su cry\`\n\`su confused\`\n\`su dab\`\n\`su dance\`\n\`su drink\`\n\`su explode\`\n\`su greet\`\n\`su handhold\`\n\`su highfive\`\n\`su hug\`\n\`su kill\`\n\`su kiss\`\n\`su laugh\`\n\`su lick\`\n\`su nom\`\n\`su pat\`\n\`su poke\`\n\`su pout\`\n\`su punch\`\n\`su scream\`\n\`su shoot\`\n\`su slap\`\n\`su sleep\`\n\`su sniff\`\n\`su stare\`\n\`su think\`\n\`su tickle\`\n\`su wag\`\n\`su wave\`\n`
                        }
                    ]
                }
            },
            /*{
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`hey help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '🎲 | MISCELLANEOUS',
                            value: `\`hey avatar [Command Updated]\`\n\`hey editsnipe\`\n\`hey snipe\``
                        }
                    ]
                }
            },*/
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`su help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '⚙ | MODERATION',
                            value: `\`su addrole\`\n\`su autorole\`\n\`su ban\`\n\`su banlogs\`\n\`su deleteautorole\`\n\`su deletebanlogs\`\n\`su deleteextralogs\`\n\`su deletegoodbye\`\n\`su deletemutelogs\`\n\`su deletemuterole\`\n\`su deleteunbanlogs\`\n\`su deletewarnlogs\`\n\`su su deletewarns\`\n\`su deletewelcome\`\n\`su dmwarns\`\n\`su extralogs\`\n\`su fetchbans\`\n\`su lock\`\n\`su mute\`\n\`su mutelogs\`\n\`su muterole\`\n\`su nuke\`\n\`su purge\`\n\`su removerole\`\n\`su resetlogcount\`\n\`su setgoodbye\`\n\`su setwelcome\`\n\`su softban\`\n\`su tempmute\`\n\`su toggletickets\`\n\`su unban\`\n\`su unbanlogs\`\n\`su unlock\`\n\`su unmute\`\n\`su warn\`\n\`su warnings\`\n\`su warnlogs\`\n`
                        }
                    ]
                }
            },
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`su help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '👥 | USERS',
                            value: `\`su afk\`\n\`su end\`\n\`su remind\`\n\`su ticket\`\n`
                        }
                    ]
                }
            },
        ]
  
        const defaultPage = 0;
        
        const timeLimit = 150000;
        
        const maximumRetries = 3;
        
        const allowOtherUserReactions = false;
        let currentPage = 0;
        let currentRetries = 0;
  
          const msg = await message.channel.send(pages[defaultPage]);
  
          await msg.react(emojis.firstPage);
          await msg.react(emojis.previousPage);
          await msg.react(emojis.delete);
          await msg.react(emojis.nextPage);
          await msg.react(emojis.lastPage);
  
          const options = {
            emojis,
            pages,
            timeLimit,
            maximumRetries,
            allowOtherUserReactions
          }
          await reactionPages(msg, message.author, options, currentPage, currentRetries);
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
    }catch(err){
        return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
      }
}
}
