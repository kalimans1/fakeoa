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

// OAuth sayaçları (SABİT - resimdeki gibi dursun)
const totalOAuths = 7284;
const todayOAuths = 124;
const weekOAuths = 892;
const monthOAuths = 3456;
const uniqueUsers = 5231;

// Sunucu sayaçları (her !progress komutunda artacak - CANLI KATILIM GİBİ)
let serverMembers = 7284; // Üye sayısı
let serverTotal = 4672;
let serverDesired = 4672;
let serverSuccess = 654;
let serverAlready = 0;
let serverError = 0;
let serverExpired = 2061;
let serverLimit = 589;

// Son kullanılan sunucu ismi
let lastServerName = "iba4otko";

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
    console.log(`📊 Başlangıç değerleri: Members=${serverMembers}, Total=${serverTotal}`);
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
                { name: '`!progress`', value: 'Sunucu istatistiklerini gösterir (her kullanımda +1 artar - canlı katılım gibi).', inline: false },
                { name: '`!progress <isim>`', value: 'Belirttiğin isimde sunucu istatistikleri gösterir.', inline: false },
                { name: '`!oauths`', value: 'OAuth sayılarını gösterir (sabit).', inline: false }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }

    // !progress komutu (rastgele sunucu ismi)
    if (message.content === '!progress') {
        // Sayıları 1 artır (SADECE PROGRESS)
        serverMembers += 1;
        serverTotal += 1;
        serverDesired += 1;
        serverSuccess += 1;
        serverAlready += 1;
        serverError += 1;
        serverExpired += 1;
        serverLimit += 1;
        
        // Rastgele sunucu ismi üret
        lastServerName = randomServerName();
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📊 Progress Finished')
            .addFields(
                { name: 'Members on this server', value: serverMembers.toString(), inline: false },
                { name: 'Guild', value: lastServerName, inline: true },
                { name: 'Total', value: serverTotal.toString(), inline: true },
                { name: 'Desired', value: serverDesired.toString(), inline: true },
                { name: 'Success', value: serverSuccess.toString(), inline: true },
                { name: 'Already on server', value: serverAlready.toString(), inline: true },
                { name: 'Error', value: serverError.toString(), inline: true },
                { name: 'Expired', value: serverExpired.toString(), inline: true },
                { name: 'Limit Server', value: serverLimit.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
        console.log(`📈 !progress kullanıldı: ${lastServerName} - Members: ${serverMembers} (+1 arttı)`);
    }
    
    // !progress <isim> komutu (kullanıcının yazdığı sunucu ismi)
    if (message.content.startsWith('!progress ')) {
        // Sayıları 1 artır (SADECE PROGRESS)
        serverMembers += 1;
        serverTotal += 1;
        serverDesired += 1;
        serverSuccess += 1;
        serverAlready += 1;
        serverError += 1;
        serverExpired += 1;
        serverLimit += 1;
        
        const args = message.content.split(' ');
        args.shift(); // !progress kısmını at
        const serverName = args.join('-'); // Boşlukları tire ile birleştir
        lastServerName = serverName;
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📊 Progress Finished')
            .addFields(
                { name: 'Members on this server', value: serverMembers.toString(), inline: false },
                { name: 'Guild', value: serverName, inline: true },
                { name: 'Total', value: serverTotal.toString(), inline: true },
                { name: 'Desired', value: serverDesired.toString(), inline: true },
                { name: 'Success', value: serverSuccess.toString(), inline: true },
                { name: 'Already on server', value: serverAlready.toString(), inline: true },
                { name: 'Error', value: serverError.toString(), inline: true },
                { name: 'Expired', value: serverExpired.toString(), inline: true },
                { name: 'Limit Server', value: serverLimit.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
        console.log(`📈 !progress ${serverName} kullanıldı - Members: ${serverMembers} (+1 arttı)`);
    }

    // !oauths komutu (SABİT - artış YOK)
    if (message.content === '!oauths') {
        const embed = new EmbedBuilder()
            .setColor(0xFF5733)
            .setTitle('🔑 OAuth Counts')
            .addFields(
                { name: 'Total OAuths', value: totalOAuths.toString(), inline: true },
                { name: 'Today', value: todayOAuths.toString(), inline: true },
                { name: 'This Week', value: weekOAuths.toString(), inline: true },
                { name: 'This Month', value: monthOAuths.toString(), inline: true },
                { name: 'Unique Users', value: uniqueUsers.toString(), inline: true }
            )
            .setFooter({ text: 'Developed by oa2.dev 🐍' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
        console.log(`🔑 !oauths kullanıldı - Total: ${totalOAuths} (sabit)`);
    }
});

// Express ile basit bir web sunucusu (Render'ın sağlık kontrolü için)
app.get('/', (req, res) => {
    res.send(`Bot is running! Komutlar: !help, !progress, !oauths<br>Progress Members: ${serverMembers} (canlı artıyor) | OAuths: ${totalOAuths} (sabit)`);
});

app.listen(port, () => {
    console.log(`🌐 Web server port ${port} üzerinde çalışıyor.`);
});

// Token'ı environment variable'dan al
client.login(process.env.TOKEN);
