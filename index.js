//Discord Client
const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

//Importing Rest & api-types
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

//Loading Config
const config = require('./config.json')
console.log('Config Loaded')
var owners = config.owners

//Ready Event
client.on('ready', async () => {
	console.log(`${client.user.tag} is Ready!`)

	client.user.setPresence({
		status: "online",
		activities: [{
			name: config.status,
			type: "LISTENING",
		}]
	})
	
	//Registering Slash
	if (config.enable_slash) {
		const rest = new REST({ version: '9' }).setToken(config.token)

		const commands = [{
			name: 'create',
			description: 'Antworten mit Hilfe zum Einbetten!'
		}]
		
		try {
			console.log('Started refreshing application (/) commands.')
			
			await rest.put(
				Routes.applicationCommands(client.user.id),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands.')
		}
		catch (error) {
			console.error(error)
		}
	}
})

/**
 * @author Abdul$5464 <https://github.com/Abdul1810/>
 */

client.on("interactionCreate", async (interaction) => {
	var VerifizierenEmbed = 
	{
		author: { name: config.embed_content.title, icon_url: client.user.displayAvatarURL({ size: 2048, dynamic: false, format:"png"}) },
		timestamp: new Date(),
		color: `0x${config.embed_content.color}`,
		thumbnail: { url: config.thumbnail ? config.thumbnail_url : client.user.displayAvatarURL({ size: 2048, format: "png", dynamic: false}) },
		description: `\u200b\n1️⃣ ${config.embed_content.question_1}\n\u200b\n2️⃣ ${config.embed_content.question_2}\n\u200b\n3️⃣ ${config.embed_content.question_3}\n\u200b\n4️⃣ ${config.embed_content.question_4}\n\u200b\n5️⃣ ${config.embed_content.question_5}\n\u200b\n> **Mich verifizieren**\nWenn Deine Frage nicht in der obigen Liste enthalten ist.(Weitere Unterstützung)\n\u200b\n`,
		footer:{
			text: interaction.guild.name
		}
	}
	let button1 = new MessageButton()
		.setStyle("SECONDARY")
		.setEmoji("1️⃣")
		.setCustomId("Du bist neu auf Discord?")

	let button2 = new MessageButton()
		.setEmoji("2️⃣")
		.setStyle("SECONDARY")
		.setCustomId("Warum sind hier so viele Bots?")
		
	let button3 = new MessageButton()
		.setEmoji("3️⃣")
		.setStyle("SECONDARY")
		.setCustomId("Flackernde Emojis oder Icons?")
	
	let button4 = new MessageButton()
		.setEmoji("4️⃣")
		.setStyle("SECONDARY")
		.setCustomId("Wieso werde ich makiert?")

	//If You Don't Need 5th Button Remove The 4 Lines Below and Remove Line 67 
	let button5 = new MessageButton()
		.setEmoji("5️⃣")
		.setStyle("SECONDARY")
		.setCustomId("Namen und Accounts")

	let button6 = new MessageButton()
		.setLabel("Mich verifizieren")
		.setStyle("SUCCESS")
		//.setEmoji("🤷🏻‍♂️")
		.setCustomId("Verifizieren")
	
	let buttonRow1 = new MessageActionRow()
		.addComponents([button1, button2, button3, button4, button5])
	
	let buttonRow2 = new MessageActionRow()
		.addComponents([button6])
	
	if (interaction.isCommand()) {
		if (!owners.includes(interaction.user.id)) {
			await interaction.reply({ content: "You aren\'t Authorized To use This Command!", ephemeral: true })
		}

		await interaction.reply({ embeds: [VerifizierenEmbed], components: [buttonRow1, buttonRow2] })
	}
	else if (interaction.isButton()) {
		let responseembed = 
		{
			author:{ name: config.title, icon_url: config.thumbnail ? config.thumbnail_url : client.user.displayAvatarURL({ size: 2048, format: "png", dynamic: false}) },
			color: `0x${config.embed_content.color}`,
			description: null,
			timestamp: new Date(),
			footer:{
				text: interaction.guild.name
			}
		}
		const logchannel = interaction.guild.channels.cache.get(config.log_channel_id)
		if (interaction.customId === "Du bist neu auf Discord?") {
			responseembed.description = `\u200b\n**${config.responses.response_1}**\n\u200b\n`
			logchannel.send(`> **${interaction.user.username + "#" + interaction.user.discriminator}**(${interaction.user.id}) Used ${interaction.customId}\nTimeStamp: ${new Date()}`)
			// let invitecutie = new MessageButton()
			//     .setLabel("Invite Link")
			//     .setStyle("url")
			//     .setURL("Link")
			// let buttonRow = new MessageActionRow()
			// 	.addComponent(invitecutie)
			//!If You Want Button in the Response remove // from the the Above 6 lines
			return interaction.reply({ embeds: [responseembed], ephemeral: true })//If you want to send link button add ,component: buttonRow after the ephermeral: true declaration
		}
		if (interaction.customId === "Warum sind hier so viele Bots?") {
			responseembed.description = `**${config.responses.response_2}**\n\u200b\n`
			logchannel.send(`> **${interaction.user.username + "#" + interaction.user.discriminator}**(${interaction.user.id}) Used ${interaction.customId}\nTimeStamp: ${new Date()}`)
			return interaction.reply({ embeds: [responseembed], ephemeral: true })
		}
		if (interaction.customId === "Flackernde Emojis oder Icons?") {
			responseembed.description = `**${config.responses.response_3}**`
			logchannel.send(`> **${interaction.user.username + "#" + interaction.user.discriminator}**(${interaction.user.id}) Used ${interaction.customId}\nTimeStamp: ${new Date()}`)
			return interaction.reply({ embeds: [responseembed], ephemeral: true })
		}
		if (interaction.customId === "Wieso werde ich makiert?") {
			responseembed.description = `**${config.responses.response_4}**`
			logchannel.send(`> **${interaction.user.username + "#" + interaction.user.discriminator}**(${interaction.user.id}) Used ${interaction.customId}\nTimeStamp: ${new Date()}`)
			return interaction.reply({ embeds: [responseembed], ephemeral: true })
		}
		if (interaction.customId === "Namen und Accounts") {
			responseembed.description = `**${config.responses.response_5}**`
			logchannel.send(`> **${interaction.user.username + "#" + interaction.user.discriminator}**(${interaction.user.id}) Used ${interaction.customId}\nTimeStamp: ${new Date()}`)
			return interaction.reply({ embeds: [responseembed], ephemeral: true })
		}
		if (interaction.customId === "Verifizieren") {
			responseembed.description = `Geh nach <#${config.assistance_channel_id}> hat sich verifiziert.`
			interaction.guild.members.cache.get(interaction.user.id).roles.add(config.assistance_role_id)
			interaction.guild.channels.cache.get(config.assistance_channel_id).send(`<@${interaction.user.id}> Danke für die Verifizierung.`)
			logchannel.send(`> **${interaction.user.username + "#" + interaction.user.discriminator}**(${interaction.user.id}) verwendet ${interaction.customId}\nTimeStamp: ${new Date()}`)
			return interaction.reply({ embeds: [responseembed], ephemeral: true })
		}
	}
})

//Message Event only Listen to owners so make sure to fill the owner array in config
client.on("messageCreate", async (msg) => {
	if (msg.author.bot) return
	if (msg.channel.type === "dm") return
	if (!owners.includes(msg.author.id)) return
	if (msg.content !== `${config.prefix}create`) return
	if (msg.content = `${config.prefix}create`) {
		await msg.delete().catch(() => {})
		let button1 = new MessageButton()
			.setStyle("SECONDARY")
			.setEmoji("1️⃣")
			.setCustomId("Du bist neu auf Discord?")

		let button2 = new MessageButton()
			.setEmoji("2️⃣")
			.setStyle("SECONDARY")
			.setCustomId("Warum sind hier so viele Bots?")
			
		let button3 = new MessageButton()
			.setEmoji("3️⃣")
			.setStyle("SECONDARY")
			.setCustomId("Flackernde Emojis oder Icons?")
		
		let button4 = new MessageButton()
			.setEmoji("4️⃣")
			.setStyle("SECONDARY")
			.setCustomId("Wieso werde ich makiert?")

		//If You Don't Need 5th Button Remove The 4 Lines Below and Remove Line 67 
		let button5 = new MessageButton()
			.setEmoji("5️⃣")
			.setStyle("SECONDARY")
			.setCustomId("Namen und Accounts")

		let button6 = new MessageButton()
			.setLabel("Mich verifizieren")
			.setStyle("SUCCESS")
			//.setEmoji("🤷🏻‍♂️")
			.setCustomId("Verifizieren")
		
		let buttonRow1 = new MessageActionRow()
			.addComponents([button1, button2, button3, button4, button5])
		
		let buttonRow2 = new MessageActionRow()
			.addComponents([button6])
		
		const Verifizierenembed = {
			author: { name: config.embed_content.title, icon_url: client.user.displayAvatarURL({ size: 2048, dynamic: false, format:"png"}) },
			timestamp: new Date(),
			color: `0x${config.embed_content.color}`,
			thumbnail: { url: config.thumbnail ? config.thumbnail_url : client.user.displayAvatarURL({ size: 2048, format: "png", dynamic: false}) },
			description: `\u200b\n1️⃣ ${config.embed_content.question_1}\n\u200b\n2️⃣ ${config.embed_content.question_2}\n\u200b\n3️⃣ ${config.embed_content.question_3}\n\u200b\n4️⃣ ${config.embed_content.question_4}\n\u200b\n5️⃣ ${config.embed_content.question_5}\n\u200b\n> **Mich verifizieren**\nWenn Deine Frage nicht in der obigen Liste enthalten ist.(Weitere Unterstützung)\n\u200b\n`,
			footer:{
				text: msg.guild.name
			}
		}
		return msg.channel.send({ embeds: [Verifizierenembed], components: [buttonRow1, buttonRow2] })
	} else return
})

client.login(config.token).catch(() => console.log('Invalid Token.Make Sure To Fill config.json'))
