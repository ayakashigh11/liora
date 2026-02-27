/**
 * @file Autojoin settings manager
 * @module lib/autojoin
 */
import db from "#auth/core.js";

// Initialize table
db.db.exec(`
    CREATE TABLE IF NOT EXISTS autojoin (
        key TEXT PRIMARY KEY,
        value INTEGER DEFAULT 0
    );
`);

// Pre-populate defaults if not exists
db.db.exec(`INSERT OR IGNORE INTO autojoin (key, value) VALUES ('group', 0)`);
db.db.exec(`INSERT OR IGNORE INTO autojoin (key, value) VALUES ('channel', 0)`);

const stmtGet = db.db.query(`SELECT value FROM autojoin WHERE key = ?`);
const stmtSet = db.db.query(`UPDATE autojoin SET value = ? WHERE key = ?`);

/**
 * Checks if autojoin is enabled for a specific type
 * @param {string} type - 'group' or 'channel'
 * @returns {boolean}
 */
export const isAutojoinEnabled = (type) => {
    try {
        const row = stmtGet.get(type);
        return row ? row.value === 1 : false;
    } catch (e) {
        console.error(`Autojoin get error (${type}):`, e);
        return false;
    }
};

/**
 * Sets autojoin status
 * @param {string} type - 'group' or 'channel'
 * @param {boolean} status 
 */
export const setAutojoinEnabled = (type, status) => {
    try {
        stmtSet.run(status ? 1 : 0, type);
        return true;
    } catch (e) {
        console.error(`Autojoin set error (${type}):`, e);
        return false;
    }
};
