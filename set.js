const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU9IUE15ckQyMHVzU0NpQmsvdktiVXRCWTJPL2c4RnBnYnA3c1ZHTXVFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2Y1eXdTWERML0xWemhWUEczVGt6dHd4aWc3OFUrdHBLSXBmb1hZUnFHRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRzNEdXpxNXYrK1FLaVVLNTJGMGVOZUdaMVpZTjZDY1dzNkxvSVgrS2tvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQWhLQ1c2MytHSytodkYzQ3ZqakRuTFN6ZlA0c1BEWVFqTzhFb25DaEdFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFPd0NyTEdjTi9UckE2V2tLUVZxelpRQTlVeG1XVmxnTWJ3RnM0czFoV0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBhVEpDSGo3VWc4THNqVzFuTHVNamZrNHVSbEt5bDFsY2YwbjhUUkZOUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVBXMCtKQW5JQVNxb3hSSytmTnUzYUlVSVJoVWZoR1hmdXo4MVFRVVNFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFovUVMyMVpuemxPaHBqcGtHNnNCUDRTSzc2TGE1U1lNb3JLWS9MMHd4VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpVUUZnV2J3dEpuZ0tRWEVFNkVEYWpjNURLZExZWi9VM1pLMXN6Uk1SeVgvMkVjSGVobmxkejgydm81Uld4VG5lQjZoREZRc3JCRjlNTkdWU3dtZWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTAsImFkdlNlY3JldEtleSI6IlY3T3E3ajRLb01lVFl0VVhlZTc5b2hnL2RHazBEKzc5dXlOYVhvdWs4dGM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc3NTA4ODM3MTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTRDNzRGQkVDMDUxQjU2MzhBRjg1RkJCQjY0NDJEQzMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzAyMzU2MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjc3NTA4ODM3MTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEVENzhCNEIyRDBCMzIxNzdFOEM4QUVFMzNFQTJBNUUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzAyMzU2MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiTm93dHpxOFpUbGFEVnJxWnJWejBuQSIsInBob25lSWQiOiIzMmI2ZmQxNS0wODZmLTRkZWEtOWFhNS05MWQzN2ViNTdkYjEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmgyazRFbFA0L2VIUWVOdisvM1hhSW5YelJVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQwNFlaZjZWWUo2b0xSek5lL1VNYlRlYTVYZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJZUVFINjYxNiIsIm1lIjp7ImlkIjoiMjc3NTA4ODM3MTI6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTVURPIEFERCBNRSBZUCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTitJaWZrQ0VMaVR3YmNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicVFEOFl5U0NVU2ZuOFVRR0NZZlR1TVBhRFJmV2x1M1VRZXBaRTVTNkpCVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZDdidDhzNTZNS2ZUL1IyT0o4TWpGclhyeEZ4Zm1Na3JhM0dVaVJmQ1ZPTEljdzIrZUpvUjFDS21mSldBNUd2ZUpOTVA3bnNPTTNLV2UwRWVDYVkyQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IlRhdlFnYVIxTlZaZkVtTFllb1NpVnc3MVYyUGNJZDhmUElqSENDNExQd1cyMlMxVVliVkhVUUQ1QzV3eUVKQ0Vib2hIRlBndGZPdG5USXg2VlRjQWd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3NTA4ODM3MTI6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJha0EvR01rZ2xFbjUvRkVCZ21IMDdqRDJnMFgxcGJ0MUVIcVdST1V1aVFWIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3MDIzNTU4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1WeCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "THOMAS SHELBY",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 243896216263",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
