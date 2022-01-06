const AlphaX = require('../events');
const { MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const Axios = require('axios');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const CON = require('../config');
const Language = require('../language');
let WType = CON.WORKTYPE == 'public' ? false : true
const Lang = Language.getString('details'); // Language Support
var ADMIN_USER = ''
var USER_USER = ''
var TR_USER = ''
var HI_USER = ''
var AZ_USER = ''
var SRI_USER = ''
var RU_USER = ''
var USA_USER = ''
var OTHER = ''
if (CON.LANG == 'SI') ADMIN_USER = '*│⏤͟͟͞͞★ පරිපාලක ගණන:*', USER_USER = '*│⏤͟͟͞͞★ සාමාජිකයින් ගණන:*', SRI_USER ='*ශ්‍රී ලංකා සාමාජික සංඛ්‍යාව:*', HI_USER = '*│⏤͟͟͞͞★ ඉන්දියානු සාමාජිකයින් ගණන:*', AZ_USER ='*අසර්බෙයිජාන් සාමාජික සංඛ්‍යාව:*', TR_USER = '*│⏤͟͟͞͞★ තුර්කි සාමාජික සංඛ්‍යාව:*', RU_USER ='*රුසියානු සාමාජික සංඛ්‍යාව:*', USA_USER ='*USA සාමාජික සංඛ්‍යාව:*', OTHER = '*│⏤͟͟͞͞★ අනෙකුත් සාමාජිකයින්:*'
if (CON.LANG == 'TR') ADMIN_USER = '*│⏤͟͟͞͞★ Admin Sayısı:*', USER_USER = '*│⏤͟͟͞͞★ Üye Sayısı:*', TR_USER = '*│⏤͟͟͞͞★ Türk Üye Sayısı:*', HI_USER = '*│⏤͟͟͞͞★ Hint Üye Sayısı:*', AZ_USER = '*│⏤͟͟͞͞★ Azeri Üye Sayısı:*', SRI_USER = '*│⏤͟͟͞͞★ Sri Lanka Üye Sayısı:*', RU_USER = '*│⏤͟͟͞͞★ Rus Üye Sayısı:*', USA_USER = '*│⏤͟͟͞͞★ ABD Üye Sayısı:*', OTHER = '*│⏤͟͟͞͞★ Diğer Üye Sayısı:*'
if (CON.LANG == 'EN') ADMIN_USER = '*│⏤͟͟͞͞★ Aᴅᴍɪɴ ᴄᴏᴜɴᴛ :*', USER_USER = '*│⏤͟͟͞͞★ Mᴇᴍʙᴇʀ Cᴏᴜɴᴛ:*', TR_USER = '*│⏤͟͟͞͞★ Tᴜʀᴋɪsʜ ᴍᴇᴍʙᴇʀ ᴄᴏᴜɴᴛ:*', HI_USER = '*│⏤͟͟͞͞★ Iɴᴅɪᴀɴ ᴍᴇᴍʙᴇʀ ᴄᴏᴜɴᴛ:*', AZ_USER = '*│⏤͟͟͞͞★ Aᴢᴇʀʙᴀʏᴊᴀɴ ᴍᴇᴍʙᴇʀ ᴄᴏᴜɴᴛ:*', SRI_USER = '*│⏤͟͟͞͞★ Sʀɪ Lᴀɴᴋᴀ ᴍᴇᴍʙᴇʀ ᴄᴏᴜɴᴛ:*', RU_USER = '*│⏤͟͟͞͞★ Rᴜssɪᴀɴ ᴍᴇᴍʙᴇʀ ᴄᴏᴜɴᴛ:*', USA_USER = '*│⏤͟͟͞͞★ USA ᴍᴇᴍʙᴇʀ ᴄᴏᴜɴᴛ:*', OTHER = '*│⏤͟͟͞͞★  Oᴛʜᴇʀ ᴍᴇᴍʙᴇʀ ᴄᴏᴜɴᴛ:*'
if (CON.LANG == 'AZ') ADMIN_USER = '*│⏤͟͟͞͞★ Admin sayı:*', USER_USER = '*│⏤͟͟͞͞★ Üzv sayı:*', TR_USER = '*│⏤͟͟͞͞★ Türk Üzv Sayısı:*', HI_USER = '*│⏤͟͟͞͞★ Hindistan üzv sayı:*', AZ_USER = '*│⏤͟͟͞͞★ Azərbaycan Üzv Sayısı:*', SRI_USER = '*│⏤͟͟͞͞★ Şri Lanka üzv sayı:*', RU_USER = '*│⏤͟͟͞͞★ Rusiya Üzv Sayısı:*', USA_USER = '*│⏤͟͟͞͞★ ABD Üzv sayı:*', OTHER = '*│⏤͟͟͞͞★ Digər üzv sayı:*'
if (CON.LANG == 'ES') ADMIN_USER = '*│⏤͟͟͞͞★ Recuento de administradores:*', USER_USER = '*│⏤͟͟͞͞★ Cuenta de miembro:*', TR_USER = '*│⏤͟͟͞͞★ Recuento de miembros turcos:*', HI_USER = '*│⏤͟͟͞͞★ Recuento de miembros indios:*', AZ_USER = '*│⏤͟͟͞͞★ Recuento de miembros de Azerbaiyán:*', SRI_USER = '*│⏤͟͟͞͞★ Recuento de miembros de Sri Lanka:*', RU_USER = '*│⏤͟͟͞͞★ Recuento de miembros rusos:*', USA_USER = '*│⏤͟͟͞͞★ Recuento de miembros de USA:*', OTHER = '*│⏤͟͟͞͞★ Otro recuento de miembros:*'
if (CON.LANG == 'PT') ADMIN_USER = '*│⏤͟͟͞͞★ Contagem de Admin:*', USER_USER = '*│⏤͟͟͞͞★ Contagem de membro:*', TR_USER = '*│⏤͟͟͞͞★ Contagem de membros turcos:*', HI_USER = '*│⏤͟͟͞͞★ Contagem de membros indianos:*', AZ_USER = '*│⏤͟͟͞͞★ Contagem de membros do Azerbaijão:*', SRI_USER = '*│⏤͟͟͞͞★ Contagem de membros do Sri Lanka:*', RU_USER = '*│⏤͟͟͞͞★ Contagem de membros russos:*', USA_USER = '*│⏤͟͟͞͞★ Contagem de membros dos USA:*', OTHER = '*│⏤͟͟͞͞★ Contagem de outros membros:*'
if (CON.LANG == 'RU') ADMIN_USER = '*│⏤͟͟͞͞★ Количество администраторов:*', USER_USER = '*│⏤͟͟͞͞★ Количество участников:*', TR_USER = '*│⏤͟͟͞͞★ Количество членов в Турции:*', HI_USER = '*│⏤͟͟͞͞★ Количество членов в Индии:*', AZ_USER = '*│⏤͟͟͞͞★ Количество участников из Азербайджана:*', SRI_USER = '*│⏤͟͟͞͞★ Количество членов из Шри-Ланки:*', RU_USER = '*│⏤͟͟͞͞★ Количество участников в России:*', USA_USER = '*│⏤͟͟͞͞★ Количество участников в США:*', OTHER = '*│⏤͟͟͞͞★ Количество других участников:*'
if (CON.LANG == 'HI') ADMIN_USER = '*│⏤͟͟͞͞★ व्यवस्थापक गणना:*', USER_USER = '*│⏤͟͟͞͞★ सदस्य गणना:*', TR_USER = '*│⏤͟͟͞͞★ तुर्की सदस्य संख्या:*', HI_USER = '*│⏤͟͟͞͞★ भारतीय सदस्य संख्या:*', AZ_USER = '*│⏤͟͟͞͞★ अज़रबैजान सदस्य संख्या:*', SRI_USER = '*│⏤͟͟͞͞★ श्रीलंका सदस्य संख्या:*', RU_USER = '*│⏤͟͟͞͞★ रूसी सदस्य संख्या:*', USA_USER = '*│⏤͟͟͞͞★ यूएसए सदस्य संख्या:*', OTHER = '*│⏤͟͟͞͞★ अन्य सदस्य संख्या:*'
if (CON.LANG == 'ID') ADMIN_USER = '*│⏤͟͟͞͞★ Jumlah Admin:*', USER_USER = '*│⏤͟͟͞͞★ Jumlah anggota:*', TR_USER = '*│⏤͟͟͞͞★ Jumlah Anggota Turki:*', HI_USER = '*│⏤͟͟͞͞★ Jumlah Anggota India:*', AZ_USER = '*│⏤͟͟͞͞★ Jumlah Anggota Azerbaijan:*', SRI_USER = '*│⏤͟͟͞͞★ Jumlah Anggota Sri Lanka:*', RU_USER = '*│⏤͟͟͞͞★ Jumlah Anggota Rusia:*', USA_USER = '*│⏤͟͟͞͞★ Jumlah Anggota USA:*', OTHER = '*│⏤͟͟͞͞★ Jumlah Anggota Lainnya:*'
if (CON.LANG == 'ML') ADMIN_USER = '*│⏤͟͟͞͞★ അഡ്‌മിൻ എണ്ണം:*', USER_USER = '*│⏤͟͟͞͞★ അംഗങ്ങളുടെ എണ്ണം:*', TR_USER = '*│⏤͟͟͞͞★ ടർക്കിഷ് അംഗങ്ങളുടെ എണ്ണം:*', HI_USER = '*│⏤͟͟͞͞★ ഇന്ത്യൻ അംഗങ്ങളുടെ എണ്ണം:*', AZ_USER = '*│⏤͟͟͞͞★ അസർബൈജാൻ അംഗങ്ങളുടെ എണ്ണം:*', SRI_USER = '*│⏤͟͟͞͞★ ശ്രീലങ്ക അംഗങ്ങളുടെ എണ്ണം:*', RU_USER = '*│⏤͟͟͞͞★ റഷ്യൻ അംഗങ്ങളുടെ എണ്ണം:*', USA_USER = '*│⏤͟͟͞͞★ യു‌എസ്‌എ അംഗങ്ങളുടെ എണ്ണം:*', OTHER = '*│⏤͟͟͞͞★ മറ്റ് അംഗങ്ങളുടെ എണ്ണം:*'

    AlphaX.addCommand({ pattern: 'details$', fromMe: WType, desc: Lang.PL_DESC }, async (message, match) => { 
        if (message.jid.includes('@g.us')) {
            var json = await message.client.groupMetadataMinimal(message.jid) 
            var code = await message.client.groupInviteCode(message.jid)
            var nwjson = await message.client.groupMetadata(message.jid) 
            let region = await message.client.groupMetadata(message.jid);
            let grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            var users1 = [];
            grup['participants'].map(async (uye) => {
                if (uye.isAdmin) {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
                users1.push(uye.id.replace('c.us', 's.whatsapp.net'));
            });
            var admin_count = ' ' + jids.length + '\n'
            var user_count = ' ' +  users1.length + '\n'
            var tr_user = [];
            var hi_user = [];
            var az_user = [];
            var sri_user = [];
            var ru_user = [];
            var usa_user = [];
            var other_user = [];
            region['participants'].map(async (reg) => {
                if (reg.jid.startsWith('90')) { tr_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('994')) { az_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('91')) { hi_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('94')) { sri_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('7')) { ru_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('1')) { usa_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } 
            });
            var trus = ' ' + tr_user.length + '\n'
            var hius = ' ' + hi_user.length + '\n'
            var azus = ' ' + az_user.length + '\n'
            var srius = ' ' + sri_user.length + '\n'
            var ruus = ' ' + ru_user.length + '\n'
            var usaus = ' ' + usa_user.length + '\n'
            var oth = user_count - trus - hius - azus - srius - ruus - usaus
            const user_count_msg = ADMIN_USER + admin_count + USER_USER + user_count + SRI_USER + srius + HI_USER + hius + AZ_USER + azus + TR_USER + trus + RU_USER + ruus + USA_USER + usaus + OTHER + ' ' + oth + '\n'
            const msg = `*│⏤͟͟͞͞★ Gʀᴏᴜᴘ ID:*\n│⏤͟͟͞͞★ ${json.id} \n` + Lang.SUB + `\n│⏤͟͟͞͞★ ${nwjson.subject} \n` + Lang.OWN + `\n│⏤͟͟͞͞★ ${json.owner} \n` + Lang.COD + `\n│⏤͟͟͞͞★ ${code} \n` + user_count_msg + Lang.DES + `\n${nwjson.desc}`
            var ppUrl = await message.client.getProfilePicture(message.jid) 
            const resim = await Axios.get(ppUrl, {responseType: 'arraybuffer'})
            await message.sendMessage(
                Buffer.from(resim.data), 
                MessageType.image, 
                {caption: msg }
            );
        }
        else {
            var status = await message.client.getStatus(message.jid) 
            var usppUrl = await message.client.getProfilePicture(message.jid) 
            var usexists = await message.client.isOnWhatsApp(message.jid)
            const nwmsg = Lang.JID + `${usexists.jid} \n` + Lang.ST + `${status.status}`
            const resimnw = await Axios.get(usppUrl, {responseType: 'arraybuffer'})
            await message.sendMessage(
                Buffer.from(resimnw.data), 
                MessageType.image, 
                { caption: nwmsg }
            );
        }
    });
