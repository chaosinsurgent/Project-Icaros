const Discord = require('discord.js');
module.exports = {
    name: "announce",
    description: "New announcement command",
    run: async (client, message, args) => {
        
        console.log("Oli I hate you so much \n- Mateo")

        const sending1 = new Discord.MessageEmbed()
        .setTitle("Sending . . .")
        .setColor('ffbb17')

    var sent = new Discord.MessageEmbed()
        .setTitle("Success!")
        .setDescription('Your announcement has been published successfully.')
        .setColor('4cb913')
        async function Sending(){
            var sending = await message.channel.send(sending1)
            sending.edit(sent)
            setTimeout(async () => {await sending.delete();}, 6000);
            message.delete();
        }

        //VARIABLE DEFINITION
        var MSG = message.content.split(" ").slice(3).join(" ")
        var short = new Discord.MessageEmbed()
        .setTitle('Your announcement is too short to be announced.')
        .setFooter('Make sure your your announcement is longer than 10 characters!')
        .setColor('c70808')
        if (MSG.length < 10) return message.channel.send(short).then(message.delete())
        if (!MSG) return message.channel.send("You did not specified anything to announce.").then(message.delete())
        const chnl = message.mentions.channels.first();
        var nochnl = new Discord.MessageEmbed()
        .setTitle('You did not specified the channel you want the announcement in.')
        .setFooter('Pleas specify the channel right after the command. "A!announce #channel"')
        .setColor('c70808')
        if (!chnl) return message.channel.send(nochnl).then(message.delete())
        let thing = args[1]
        let ping = thing.toLowerCase()
        

        //ANNOUNCEMENT
        const embed = new Discord.MessageEmbed()
            .setTitle(`**Announcement by **${message.member.displayName}:`)
            .setAuthor(".|SCPF|. Special Containment Procedures Foundation", message.guild.iconURL(), 'https://www.roblox.com/groups/5137119/Special-Containment-Procedures-Foundation-SCPF#!/about')
            .setDescription(`${MSG}`)
            .setColor('34cfeb')
            .setTimestamp()
            .setFooter("Alexandra.AIC | Developed by: O5-6", 'https://cdn.discordapp.com/attachments/667913030629195786/728325820715892736/Alexandra.png')

        const areusure = new Discord.MessageEmbed()
            .setTitle("Are you sure you want to send this announcement?")
            .setDescription(`${MSG} \n __Using the **${ping.toUpperCase()}** ping in ${chnl}?__`)
            .setColor('ffbb17')
            .setThumbnail('https://cdn.discordapp.com/attachments/730670936088641559/761689831561625630/alex_sad.png')
            .setFooter('Use the "❌" and "✅" to confirm or deny.')

        const noping = new Discord.MessageEmbed()
            .setTitle("You did not specify the ping to utilize!")
            .setFooter("A!announce #channel `<here/all/null>`")
            .setColor('c70808')

        var send = await message.channel.send(areusure)
        await send.react('❌')
        await send.react('✅')

        var filterAccept = (reaction, user) => reaction.emoji.name === ':white_check_mark:' && user.id === message.author.id;
        var filterDeny = (reaction, user) => reaction.emoji.name === ':x:' && user.id === message.author.id;
        
        var acceptCollector = message.createReactionCollector(filterAccept, {time: 15000});
        var denyCollector = message.createReactionCollector(filterDeny, {time: 15000});

        if(!ping) return message.channel.send(noping) && message.delete()

        async function SHIT(){
            switch(ping.toLowerCase()) {
                case 'here':
                    ping = '@here'
                    Sending()
                    chnl.send(ping).then(m => m.delete())
                    chnl.send(embed)
                    message.delete() && send.delete()
                break;
                case 'everyone' || 'all':
                    ping = '@everyone'
                    Sending()
                    chnl.send(ping).then(m => m.delete())
                    chnl.send(embed)
                    message.delete() && send.delete()
                break;
                case 'null':
                    Sending()
                    send.edit(areusure.setDescription(`${MSG} \n __Using **no ping** in ${chnl}?__`))
                    chnl.send(embed)
            }
        }
        
        acceptCollector.on('collect', (reaction, user) => {
            console.log("Shit bruh alright");
            SHIT();
            send.delete();
        });
        
        denyCollector.on('collect', (reaction, user) => {
            console.log("Get Nae Nae'd bitch")
            message.delete()
            send.delete()
            message.channel.send("Action Halted") 
        });
    }
}
