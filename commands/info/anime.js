const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const Kitsu = require('kitsu.js')
const kitsu = new Kitsu();
module.exports={
    name: 'anime',
    category: 'info',
    description: 'Search for any anime',
    aliases: [],
    usage: 'su anime <anime name>',
    run: async(bot, message, args)=>{
        try{
            var search = args.slice(0).join(' ')
            if(!search) {
                const error1 = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least provide me the name of an anime.\n\nExample :
                \`\`\`fix
su anime <anime name>\`\`\``)
                return message.channel.send(error1);
            }
            else if(search) {
                let delay = await message.channel.send('\`Fetching Anime info...\`')
                kitsu.searchAnime(search.toLowerCase()).then(async result => {
                    if(result.length === 0) {
                        let em = new Discord.MessageEmbed()
                        .setTitle(`<:notgood:776121645709525002> Looks like, that\'s not an anime name. Please double check the spelling`)
                        .setColor(0x2f3136)
                        delay.edit('\t',em)
                    }
                    let anime = result[0]
                    const embed = new Discord.MessageEmbed()
                    embed.setColor('#2f3136')
                    embed.setAuthor(`${anime.titles.english ? anime.titles.english : search.toLowerCase()} | ${anime.showType}`, anime.posterImage.original)
                    embed.setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                    embed.addField('Information <:Information:780367381540765731>', `**Japanese Title:** ${anime.titles.romaji}\n**Age Rating:** ${anime.ageRating}\n**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                    embed.addField(`Stats 🔆`, `**Avg Rating:** ${anime.averageRating}\n**Rank By Rating:** ${anime.ratingRank}\n**Rank by popularity:** ${anime.popularityRank}`, true)
                    embed.addField(`Status <:good:776121655528783964>`, `**Episode Count:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n`, true)
                    embed.setThumbnail(anime.posterImage.original, 100, 200)
                    return delay.edit("\t",embed)
                })
            }
        }catch(err){
            console.log(err);
            let em1 = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like, that\'s not an anime name. Please double check the spelling`)
            .setColor(0x2f3136)
            message.channel.send(em1)
        }
    }
}