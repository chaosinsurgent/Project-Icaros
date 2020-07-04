const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'shows ping!',
    run: async (client, message, args) => {
        const msg = await message.channel.send("@here").then(m => m.delete());
        const embed = new Discord.MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`Ping is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}MS\nAPI ping is ${Math.round(bot.ws.ping)}MS`)
        .setColor('34cfeb')
        msg.edit(embed)
        message.delete()
    }
}