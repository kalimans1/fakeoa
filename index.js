const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Web server (Render için)
app.get('/', (req, res) => {
    res.send('Fake OAuth Bot is running!');
});

app.listen(port, () => {
    console.log(`Web server running on port ${port}`);
});

// Discord Bot
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// OAuth sayısı
const oauthCount = 7284;

client.on('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
});

// Tarih formatı
function getFormattedDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('tr', { month: 'long' });
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('tr', { hour: '2-digit', minute: '2-digit' });
    return `${day} ${month} ${year} ${time}`;
}

function getDateOnly() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('tr', { hour: '2-digit', minute: '2-digit' });
    return `${day}.${month}.${year} ${time}`;
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // !join <sunucu_id> komutu
    if (message.content.startsWith('!join')) {
        const args = message.content.split(' ');
        const guildId = args[1];
        
        if (!guildId) {
            return message.channel.send('❌ Kullanım: `!join <sunucu_id>`');
        }
        
        try {
            const guild = await client.guilds.fetch(guildId);
            
            if (!guild) {
                return message.channel.send('❌ Sunucu bulunamadı! Bot o sunucuda olmalı.');
            }
            
            const serverName = guild.name;
            const memberCount = guild.memberCount;
            
            const total = 7284;
            const desired = 7284;
            const success = 1;
            const error = 0;
            const expired = 0;
            const limitServer = 0;
            
            const output = `# staff-chat

${getFormattedDate()}

---

**${serverName}**  
**${serverName.toUpperCase().slice(0, 3)}**  
${getDateOnly()}  

- ✅ Progress Finished  
  - Members on this server: ${memberCount}  

- Details of this join →  

- Guild : ${guildId}  

- Total : ${total}  
- Desired : ${desired}  
- Success : ${success}  
- Already on server :  

- Error : ${error}  
- Expired : ${expired}  
- Limit Server : ${limitServer}  

---

${oauthCount}  

---

Developed by oa2.dev 🐍`;

            await message.channel.send(output);
            
            const oauthMsg = `\`\`\`
Ouathes count

Total: ${oauthCount}
\`\`\``;
            await message.channel.send(oauthMsg);
            
        } catch (error) {
            console.log(error);
            await message.channel.send('❌ Sunucu bulunamadı! Bot o sunucuda olmalı veya ID yanlış.');
        }
    }
    
    // !oauths komutu
    if (message.content === '!oauths') {
        const oauthMsg = `\`\`\`
Ouathes count

Total: ${oauthCount}
\`\`\``;
        await message.channel.send(oauthMsg);
    }
});

client.login(process.env.TOKEN);
