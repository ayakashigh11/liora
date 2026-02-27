/**
 * @file Anti-Delete & Anti-Edit data manager
 * @module lib/antidelete
 */
import db from "#auth/core.js";

// Initialize tables
db.db.exec(`
    CREATE TABLE IF NOT EXISTS antidelete_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id TEXT,
        sender_id TEXT,
        push_name TEXT,
        content TEXT,
        type TEXT, -- 'delete' or 'edit'
        time INTEGER
    );

    CREATE TABLE IF NOT EXISTS antidelete_blacklist (
        chat_id TEXT PRIMARY KEY
    );
`);

/**
 * Adds a log entry for a deleted or edited message
 * @param {Object} data 
 */
export const addLog = ({ chat_id, sender_id, push_name, content, type }) => {
    try {
        const time = Math.floor(Date.now() / 1000);
        db.db.query(`
            INSERT INTO antidelete_logs (chat_id, sender_id, push_name, content, type, time)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(chat_id, sender_id, push_name, content, type, time);
        return true;
    } catch (e) {
        console.error("Anti-Delete log error:", e);
        return false;
    }
};

/**
 * Gets logs with pagination
 * @param {number} page 
 * @param {number} limit 
 * @returns {Array}
 */
export const getLogs = (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        return db.db.query(`
            SELECT * FROM antidelete_logs 
            ORDER BY time DESC 
            LIMIT ? OFFSET ?
        `).all(limit, offset);
    } catch (e) {
        console.error("Anti-Delete get logs error:", e);
        return [];
    }
};

/**
 * Adds a chat to the blacklist
 * @param {string} chatId 
 */
export const addBlacklist = (chatId) => {
    try {
        db.db.query(`INSERT OR IGNORE INTO antidelete_blacklist (chat_id) VALUES (?)`).run(chatId);
        return true;
    } catch (e) {
        console.error("Anti-Delete add BL error:", e);
        return false;
    }
};

/**
 * Removes a chat from the blacklist
 * @param {string} chatId 
 */
export const delBlacklist = (chatId) => {
    try {
        db.db.query(`DELETE FROM antidelete_blacklist WHERE chat_id = ?`).run(chatId);
        return true;
    } catch (e) {
        console.error("Anti-Delete del BL error:", e);
        return false;
    }
};

/**
 * Gets all blacklisted chats
 * @returns {Array}
 */
export const listBlacklist = () => {
    try {
        return db.db.query(`SELECT chat_id FROM antidelete_blacklist`).all().map(r => r.chat_id);
    } catch (e) {
        console.error("Anti-Delete list BL error:", e);
        return [];
    }
};

/**
 * Checks if a chat is blacklisted
 * @param {string} chatId 
 * @returns {boolean}
 */
export const isBlacklisted = (chatId) => {
    try {
        const res = db.db.query(`SELECT 1 FROM antidelete_blacklist WHERE chat_id = ?`).get(chatId);
        return !!res;
    } catch (e) {
        return false;
    }
};
