/**
 * @file IP Info plugin
 * @module plugins/tool/ipinfo
 * @description Get detailed information about an IP address
 * @license Apache-2.0
 */

let handler = async (m, { sock, text, usedPrefix, command }) => {
    const ip = text.trim() || m.quoted?.text?.trim();
    if (!ip) {
        return m.reply(`Please provide an IP address to lookup.\n\nUsage: *${usedPrefix + command} (ip)*\nExample: *${usedPrefix + command} 1.1.1.1*`);
    }

    // Basic IP validation (IPv4 or IPv6)
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

    if (!ipRegex.test(ip)) {
        return m.reply("Invalid IP address format.");
    }

    try {
        await global.loading(m, sock);

        const apiUrl = `https://api.ipapi.is/?q=${encodeURIComponent(ip)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`IP Service Error (HTTP ${response.status})`);
        }

        const data = await response.json();

        let txt = `*🌐 IP INFORMATION*\n\n`;
        txt += `*IP:* ${data.ip}\n`;
        txt += `*RIR:* ${data.rir || "-"}\n`;
        txt += `*Bogon:* ${data.is_bogon ? "Yes" : "No"}\n`;
        txt += `*Mobile:* ${data.is_mobile ? "Yes" : "No"}\n`;
        txt += `*Satellite:* ${data.is_satellite ? "Yes" : "No"}\n`;
        txt += `*Crawler:* ${data.is_crawler ? "Yes" : "No"}\n`;
        txt += `*Datacenter:* ${data.is_datacenter ? "Yes" : "No"}\n`;
        txt += `*TOR:* ${data.is_tor ? "Yes" : "No"}\n`;
        txt += `*Proxy:* ${data.is_proxy ? "Yes" : "No"}\n`;
        txt += `*VPN:* ${data.is_vpn ? "Yes" : "No"}\n`;
        txt += `*Abuser:* ${data.is_abuser ? "Yes" : "No"}\n\n`;

        if (data.vpn) {
            txt += `*🔒 VPN DETAILS*\n`;
            txt += `*Service:* ${data.vpn.service || "-"}\n`;
            txt += `*Type:* ${data.vpn.type || "-"}\n`;
            txt += `*Last Seen:* ${data.vpn.last_seen_str || "-"}\n\n`;
        }

        if (data.company) {
            txt += `*🏢 COMPANY*\n`;
            txt += `*Name:* ${data.company.name || "-"}\n`;
            txt += `*Domain:* ${data.company.domain || "-"}\n`;
            txt += `*Type:* ${data.company.type || "-"}\n`;
            txt += `*Score:* ${data.company.abuser_score || "-"}\n`;
            txt += `*Network:* ${data.company.network || "-"}\n\n`;
        }

        if (data.abuse) {
            txt += `*⚠️ ABUSE CONTACT*\n`;
            txt += `*Name:* ${data.abuse.name || "-"}\n`;
            txt += `*Email:* ${data.abuse.email || "-"}\n`;
            txt += `*Phone:* ${data.abuse.phone || "-"}\n`;
            txt += `*Address:* ${data.abuse.address || "-"}\n\n`;
        }

        if (data.asn) {
            txt += `*📡 ASN*\n`;
            txt += `*ASN:* ${data.asn.asn || "-"}\n`;
            txt += `*Org:* ${data.asn.org || "-"}\n`;
            txt += `*Descr:* ${data.asn.descr || "-"}\n`;
            txt += `*Country:* ${data.asn.country?.toUpperCase() || "-"}\n`;
            txt += `*Type:* ${data.asn.type || "-"}\n`;
            txt += `*Created:* ${data.asn.created || "-"}\n\n`;
        }

        if (data.location) {
            txt += `*📍 LOCATION*\n`;
            txt += `*Country:* ${data.location.country || "-"} (${data.location.country_code || "-"})\n`;
            txt += `*State:* ${data.location.state || "-"}\n`;
            txt += `*City:* ${data.location.city || "-"}\n`;
            txt += `*Zip:* ${data.location.zip || "-"}\n`;
            txt += `*Timezone:* ${data.location.timezone || "-"}\n`;
            txt += `*Local Time:* ${data.location.local_time || "-"}\n`;
            txt += `*Coordinates:* ${data.location.latitude}, ${data.location.longitude}\n`;
            txt += `*Currency:* ${data.location.currency_code || "-"}\n`;
        }

        await m.reply(txt);

    } catch (e) {
        global.logger.error({ error: e.message, ip }, "IP Info plugin error");
        await m.reply(`An error occurred: ${e.message}`);
    } finally {
        await global.loading(m, sock, true);
    }
};

handler.help = ["ipinfo"];
handler.tags = ["tools"];
handler.command = /^(ipinfo|ip|whoisip)$/i;

export default handler;
