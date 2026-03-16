const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Rastgele sayı üretici
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rastgele sunucu ismi üretici
function randomServerName() {
    const prefixes = ['TR', 'EU', 'US', 'DE', 'FR', 'NL', 'SE', 'NO', 'FI', 'DK', 'PL', 'CZ', 'HU', 'RO', 'BG', 'GR', 'RS', 'HR', 'SI', 'SK', 'LT', 'LV', 'EE', 'BY', 'UA', 'MD', 'GE', 'AM', 'AZ', 'KZ', 'UZ', 'TM', 'KG', 'TJ', 'MN'];
    const suffixes = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    const names = ['game', 'fun', 'chat', 'zone', 'world', 'hub', 'city', 'town', 'village', 'land', 'island', 'planet', 'star', 'moon', 'sun', 'cloud', 'rain', 'snow', 'wind', 'fire', 'water', 'earth', 'air', 'light', 'dark', 'night', 'day', 'time', 'space', 'void', 'abyss', 'heaven', 'hell', 'paradise', 'garden', 'forest', 'mountain', 'ocean', 'sea', 'river', 'lake', 'pond', 'desert', 'jungle', 'savanna', 'tundra', 'taiga', 'swamp', 'cave', 'mine'];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return (prefix + name + suffix).toLowerCase();
}

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} olarak giriş yapıldı!`);
    console.log(`📋 Komutlar: !help, !progress, !oauths, !progress <sunucu-ismi>`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // !help komutu
    if (message.content === '!help') {
        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('📚 Komut Listesi')
            .setDescription('Aşağıdaki komutları kullanabilirsin:')
            .addFields(
                { name: '`!help`', value: 'Bu mesajı gösterir.', inline: false },
                { name: '`!progress`', value: 'Rastgele sunucu istatistikleri gösterir (üye sayısı sabit: 7284).', inline: false },
                { name: '`!progress <isim>`', value: 'Belirttiğin isimde sunucu istatistikleri gösterir.', inline: false },
                { name: '`!oauths`', value: 'OAuth sayılarını gösterir.', inline: false }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }

    // !progress komutu (rastgele sunucu ismi)
    if (message.content === '!progress') {
        const serverName = randomServerName();
        
        // Rastgele istatistikler üret (üye sayısı sabit: 7284)
        const total = randomInt(1000, 20000);
        const desired = total; // Desired genelde total ile aynı
        const success = randomInt(100, Math.floor(total * 0.3)); // %30'a kadar success
        const alreadyOnServer = randomInt(0, 5000);
        const error = randomInt(0, 50);
        const expired = randomInt(500, 8000);
        const limitServer = randomInt(100, 3000);
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📊 Progress Finished')
            .addFields(
                { name: 'Members on this server', value: '7284', inline: false },
                { name: 'Guild', value: serverName, inline: true },
                { name: 'Total', value: total.toString(), inline: true },
                { name: 'Desired', value: desired.toString(), inline: true },
                { name: 'Success', value: success.toString(), inline: true },
                { name: 'Already on server', value: alreadyOnServer.toString(), inline: true },
                { name: 'Error', value: error.toString(), inline: true },
                { name: 'Expired', value: expired.toString(), inline: true },
                { name: 'Limit Server', value: limitServer.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
    
    // !progress <isim> komutu (kullanıcının yazdığı sunucu ismi)
    if (message.content.startsWith('!progress ')) {
        const args = message.content.split(' ');
        args.shift(); // !progress kısmını at
        const serverName = args.join('-'); // Boşlukları tire ile birleştir
        
        // Rastgele istatistikler üret (üye sayısı sabit: 7284)
        const total = randomInt(1000, 20000);
        const desired = total;
        const success = randomInt(100, Math.floor(total * 0.3));
        const alreadyOnServer = randomInt(0, 5000);
        const error = randomInt(0, 50);
        const expired = randomInt(500, 8000);
        const limitServer = randomInt(100, 3000);
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📊 Progress Finished')
            .addFields(
                { name: 'Members on this server', value: '7284', inline: false },
                { name: 'Guild', value: serverName, inline: true },
                { name: 'Total', value: total.toString(), inline: true },
                { name: 'Desired', value: desired.toString(), inline: true },
                { name: 'Success', value: success.toString(), inline: true },
                { name: 'Already on server', value: alreadyOnServer.toString(), inline: true },
                { name: 'Error', value: error.toString(), inline: true },
                { name: 'Expired', value: expired.toString(), inline: true },
                { name: 'Limit Server', value: limitServer.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }

    // !oauths komutu
    if (message.content === '!oauths') {
        const embed = new EmbedBuilder()
            .setColor(0xFF5733)
            .setTitle('🔑 OAuth Counts')
            .addFields(
                { name: 'Total OAuths', value: '7284', inline: true },
                { name: 'Today', value: randomInt(50, 500).toString(), inline: true },
                { name: 'This Week', value: randomInt(500, 3000).toString(), inline: true },
                { name: 'This Month', value: randomInt(2000, 8000).toString(), inline: true },
                { name: 'Unique Users', value: randomInt(3000, 15000).toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
});

// Express ile basit bir web sunucusu (Render'ın sağlık kontrolü için)
app.get('/', (req, res) => {
    res.send('Bot is running! Komutlar: !help, !progress, !oauths');
});

app.listen(port, () => {
    console.log(`🌐 Web server port ${port} üzerinde çalışıyor.`);
});

// Token'ı environment variable'dan al
client.login(process.env.TOKEN);
