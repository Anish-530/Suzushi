const Discord = require('discord.js');
const {MessageEmbed , splitMessage} = require('discord.js');
module.exports={
    name: 'dump',
    category: 'guild',
    description: 'Dump the members, of a specific role',
    aliases: ['dp'],
    usage: 'su dump <role name>',
    run: async(bot, message, args)=>{
        if (!message.member.hasPermission(['MANAGE_MESSAGES', 'MANAGE_ROLES'])) return message.reply('You don\'t have the permissions to use this command.\nYou need \`MANAGE_MESSAGES , MANAGE_ROLES\` permissions, to use this command.');
        try{
        const role = message.guild.roles.cache.find(
            (role) => role.name.toLowerCase() === args.join(' ') || role.id === args.join(' ')
        );
        if(!args.join(' ')) {
            const error = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to provide me at least, the name or the ID of the role.\n\nExample :
            \`\`\`fix
            su dump <role name>
                    OR
            su dump <role ID>\`\`\``)
            return message.channel.send(error);
        }
        if (!role)
        return message.channel.send(`I am unable find any role by the name, \`${args.join(' ')}\``);
        const waiting = await message.channel.send(`Getting Users <a:discloading:759683718142623744>`)
        const ListEmbed = new Discord.MessageEmbed()
        .setTitle(`Users with the role \`${role.name}\` - \`${role.id}\``)
        .setColor(0x2f3136)
        .setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png' }))
        .setDescription(role.members.map((m) => m.user.tag+` - \`${m.user.id}\``).join(`\n`))
        .setFooter("Suzushi", bot.user.avatarURL())
        .setTimestamp(new Date())
        console.log(ListEmbed.length)
        //ask dylan about this more
        const splitDescription = splitMessage(ListEmbed.description, {
            maxLength: 2048,
            char: "\n",
            prepend: "",
            append: ""
        });

        splitDescription.forEach(async (m) => {
            ListEmbed.setDescription(m);
            waiting.edit("\t",ListEmbed);
        }); 
        }catch(err){
            message.channel.send(`Oops! Looks like there\'s an error : \`${err.message}\``)
        }
    }
}
