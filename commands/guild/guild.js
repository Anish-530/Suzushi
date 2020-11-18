const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
module.exports={
    name: 'guild',
    category: 'guild',
    description: 'Get all the information about a guild.',
    aliases: ['serverinfo', 'server', 'guildinfo', 'gi', 'si'],
    usage: 'su guild',
    run: async(bot, message, args)=>{
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
        
        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
		};
		const categoryChannels = message.guild.channels.cache.filter(channel => channel.type === "category")
		const tc = message.guild.channels.cache.filter(channel => channel.type === "text")
		const vc = message.guild.channels.cache.filter(channel => channel.type === "voice")
		const embed = new Discord.MessageEmbed()
		embed.setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png' }))
		embed.setTitle(message.guild.name)
		embed.setColor(0x2f3136)
		embed.addFields(
			{
				name: '<:owner:776903401002106943> Owner',
				value: `${message.guild.owner.user.tag}`,
				inline: true
			},
			{
				name: '🗺️ Region',
				value: `${regions[message.guild.region]}`,
				inline: true
			},
			{
				name: '<:tickYes:776903405108330526> Verification Level',
				value: `${verificationLevels[message.guild.verificationLevel]}`,
				inline: true
			},
			{
				name: '✨ Explicit Filter',
				value: `${filterLevels[message.guild.explicitContentFilter]}`,
				inline: true
			},
			{
				name: '<:down:776904115112116255> Channel Categories',
				value: `${categoryChannels.size}`,
				inline: true
			},
			{
				name: '<:channel:776903409621401600> Text Channels',
				value: `${tc.size}`,
				inline: true
			},
			{
				name: '🔈 Voice Channels',
				value: `${vc.size}`,
				inline: true
			},
			{
				name: '<:boost:776903422410096640> Boost Tier',
				value: `${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				inline: true
			},
			{
				name: '👥 Members',
				value: `${message.guild.members.cache.size}`,
				inline: true
			},
			{
				name: '<:good:776121655528783964> Roles',
				value: `${message.guild.roles.cache.size}`,
				inline: true
			},
		)
		embed.setImage(message.guild.banner)
		embed.setFooter(`ID: ${message.guild.id} | Server creation Date: ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`)
		message.channel.send(embed)
	}
}