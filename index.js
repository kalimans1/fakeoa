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

// Progress sabit değerleri
const DESIRED = 4676;
const TOTAL = DESIRED;
const SUCCESS = 1;
const ALREADY = 0;
const ERROR = 0;
const EXPIRED = 0;
const LIMIT = 0;

// OAuth gerçekçi değerler
const TOTAL_OAUTHS = 4676;      // Toplam OAuth
const TODAY_OAUTHS = 180;        // Bugün katılan
const WEEK_OAUTHS = 1240;        // Bu hafta katılan
const MONTH_OAUTHS = 3456;       // Bu ay katılan
const UNIQUE_USERS = 4231;       // Tekil kullanıcı

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
    console.log(`📊 Progress: Desired: ${DESIRED}, Success: ${SUCCESS}`);
    console.log(`📊 OAuths: Total: ${TOTAL_OAUTHS}, Today: ${TODAY_OAUTHS}, Week: ${WEEK_OAUTHS}`);
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
                { name: '`!progress`', value: 'Sunucu istatistiklerini gösterir (Desired: 4676, Success: 1, diğerleri 0).', inline: false },
                { name: '`!progress <isim>`', value: 'Belirttiğin isimde sunucu istatistikleri gösterir.', inline: false },
                { name: '`!oauths`', value: 'OAuth sayılarını gösterir (Total: 4676, Today: 180, Week: 1240, Month: 3456, Unique: 4231).', inline: false }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }

    // !progress komutu (rastgele sunucu ismi)
    if (message.content === '!progress') {
        // Rastgele sunucu ismi üret
        const serverName = randomServerName();
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📊 Members pulling')  // <-- Değişti
            .addFields(
                { name: 'Guild', value: serverName, inline: true },
                { name: 'Total', value: TOTAL.toString(), inline: true },
                { name: 'Desired', value: DESIRED.toString(), inline: true },
                { name: 'Success', value: SUCCESS.toString(), inline: true },
                { name: 'Already on server', value: ALREADY.toString(), inline: true },
                { name: 'Error', value: ERROR.toString(), inline: true },
                { name: 'Expired', value: EXPIRED.toString(), inline: true },
                { name: 'Limit Server', value: LIMIT.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
        console.log(`📈 !progress kullanıldı: ${serverName}`);
    }
    
    // !progress <isim> komutu (kullanıcının yazdığı sunucu ismi)
    if (message.content.startsWith('!progress ')) {
        const args = message.content.split(' ');
        args.shift(); // !progress kısmını at
        const serverName = args.join('-'); // Boşlukları tire ile birleştir
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📊 Members pulling')  // <-- Değişti
            .addFields(
                { name: 'Guild', value: serverName, inline: true },
                { name: 'Total', value: TOTAL.toString(), inline: true },
                { name: 'Desired', value: DESIRED.toString(), inline: true },
                { name: 'Success', value: SUCCESS.toString(), inline: true },
                { name: 'Already on server', value: ALREADY.toString(), inline: true },
                { name: 'Error', value: ERROR.toString(), inline: true },
                { name: 'Expired', value: EXPIRED.toString(), inline: true },
                { name: 'Limit Server', value: LIMIT.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
        console.log(`📈 !progress ${serverName} kullanıldı`);
    }

    // !oauths komutu (gerçekçi değerler)
    if (message.content === '!oauths') {
        const embed = new EmbedBuilder()
            .setColor(0xFF5733)
            .setTitle('🔑 OAuth Counts')
            .addFields(
                { name: 'Total OAuths', value: TOTAL_OAUTHS.toString(), inline: true },
                { name: 'Today', value: TODAY_OAUTHS.toString(), inline: true },
                { name: 'This Week', value: WEEK_OAUTHS.toString(), inline: true },
                { name: 'This Month', value: MONTH_OAUTHS.toString(), inline: true },
                { name: 'Unique Users', value: UNIQUE_USERS.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
        console.log(`🔑 !oauths kullanıldı - Today: ${TODAY_OAUTHS}`);
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
