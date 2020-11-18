const Discord = require('discord.js');
const moment = require('moment')
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'userinfo',
    category: 'info',
    description: 'Display the info of an user',
    timeout: 10000,
    aliases: ['ui'],
    usage: 'su userinfo [mention someone]',
    run: async(bot, message, args)=>{
        try{
        const flags = {
            DISCORD_EMPLOYEE: '<:DiscordStaff:760775337788702781> Discord Employee',
            DISCORD_PARTNER: '<:discordpartner:760781001907109918> Discord Partner',
            BUGHUNTER_LEVEL_1: '<:BugHunter:760775337847029800> Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: '<:BugHunterLvl2:760775337478717450> Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: '<:hypesquadevents:760775336752840734> HypeSquad Events',
            HOUSE_BRAVERY: '<:HouseofBravery:760781001462513684> House of Bravery',
            HOUSE_BRILLIANCE: '<:HouseofBrilliance:760781001449537537> House of Brilliance',
            HOUSE_BALANCE: '<:HouseofBalance:760784351469240320> House of Balance',
            EARLY_SUPPORTER: '<:EarlySupporter:760775336925069323> Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: '<:verifiedBot:760775117063716874> Verified Bot',
            VERIFIED_DEVELOPER: '<:developer:760775172599840828> Verified Bot Developer',
        };
        const keyperms = {
            ADMINISTRATER: 'Administrater',
            MANAGE_SERVER: 'Manage Server',
            MANAGE_ROLES: 'Manage Roles',
            MANAGE_CHANNELS: 'Manage Channels',
            KICK_MEMBERS: 'Kick Members',
            BAN_MEMBERS: 'Ban Members',
            MANAGE_NICKNAMES: 'Manage Nicknames',
            MANAGE_EMOJIS: 'Manage Emojis',
            MANAGE_WEBHOOKS: 'Manage Webhooks',
            MANAGE_MESSAGES: 'Manage Messages',
            MOVE_MEMBERS: 'Move Members',
            MUTE_MEMBERS: 'Mute Members',
            DEAFEN_MEMBERS: 'Deafen Members',
        };
        
        const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        const member = message.guild.member(mentionedddMember11);
        var guildID = bot.guilds.cache.get(message.guild.id).id;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags.toArray();
        const userperms = member.permissions.toArray();
        trimString = (roles, max) => ((roles.length > max) ? `${roles.slice(0, max - 3)}...` : roles);
        const statuser = member.user.presence.status;
        
        const embed = new MessageEmbed()
            embed.setThumbnail(bot.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 }))
            if(statuser === "offline"){
                embed.setColor(0x2f3136)
            }
            else if(statuser === "online"){
                embed.setColor('#18ed18')
            }
            else if(statuser === "dnd"){
                embed.setColor('#ed1f11')
            }
            else if(statuser === "idle"){
                embed.setColor('#e8e810')
            }
            if(statuser === "offline") {
            embed.addField('User', [
                `**❯ Username:** ${member.user.username}`,
                `**❯ Tag:** #${member.user.discriminator}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                `**❯ Avatar:** [Link to ${member.user.username}'s avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Account Creation Detail:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**❯ Status:** <a:Weboff:733764404587397150> ${statuser}`,
                `**❯ Game:** ${member.presence.activities ? member.presence.activities : 'Not playing a game right now'}`,
                `\u200b`
            ])
        }
        else if(statuser === "online") {
            embed.addField('User', [
                `**❯ Username:** ${member.user.username}`,
                `**❯ Tag:** #${member.user.discriminator}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                `**❯ Avatar:** [Link to ${member.user.username}'s avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Account Creation Detail:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**❯ Status:** <a:Issuefixed:733764280536662026> ${statuser}`,
                `**❯ Game:** ${member.presence.activities ? member.presence.activities : 'Not playing a game right now'}`,
                `\u200b`
            ])
        }
        else if(statuser === "dnd") {
            embed.addField('User', [
                `**❯ Username:** ${member.user.username}`,
                `**❯ Tag:** #${member.user.discriminator}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                `**❯ Avatar:** [Link to ${member.user.username}'s avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Account Creation Detail:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**❯ Status:** <a:Issue:733764473000689745> ${statuser}`,
                `**❯ Game:** ${member.presence.activities ? member.presence.activities : 'Not playing a game right now'}`,
                `\u200b`
            ])
        }
        else if(statuser === "idle") {
            embed.addField('User', [
                `**❯ Username:** ${member.user.username}`,
                `**❯ Tag:** #${member.user.discriminator}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                `**❯ Avatar:** [Link to ${member.user.username}'s avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Account Creation Detail:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**❯ Status:** <a:Fixing:748633521454841987> ${statuser}`,
                `**❯ Game:** ${member.presence.activities ? member.presence.activities : 'Not playing a game right now'}`,
                `\u200b`
            ])
        }
            embed.addField('Member', [
                `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**❯ Roles [${roles.length}]:** ${roles.length < 4 ? roles.join(', ') : roles.length > 4 ? trimString(roles, 8) : trimString(roles, 8)}`,
                `\u200b`
            ]);
            embed.addField(`Key Permissions [${userperms.length}]`,[
                `${userperms.length < 6 ? userperms.join(', ') : userperms.length > 11 ? trimString(userperms, 20) : trimString(userperms, 20)}`,
            ])
            embed.setFooter("Suzushi", bot.user.avatarURL())
            embed.setTimestamp(new Date())
        return message.channel.send(embed);
        }catch(err){
            console.log(err);
            message.channel.send(`Oops, looks like an error occured : \`${err.message}\``)
        }
    }
}