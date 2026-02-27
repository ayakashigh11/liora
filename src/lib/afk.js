/**
 * @file AFK (Away From Keyboard) data manager
 * @module lib/afk
 */
import db from "#auth/core.js";

// Initialize table
db.db.exec(`
    CREATE TABLE IF NOT EXISTS afk (
        user_id TEXT PRIMARY KEY,
        reason TEXT,
        time INTEGER
    );
`);

const stmtSet = db.db.query(`
    INSERT OR REPLACE INTO afk (user_id, reason, time) 
    VALUES (?, ?, ?)
`);

const stmtGet = db.db.query(`
    SELECT * FROM afk WHERE user_id = ?
`);

const stmtDel = db.db.query(`
    DELETE FROM afk WHERE user_id = ?
`);

/**
 * Sets AFK status for a user
 * @param {string} userId 
 * @param {string} reason 
 */
export const setAFK = (userId, reason = "Tanpa alasan") => {
    try {
        const time = Math.floor(Date.now() / 1000);
        stmtSet.run(userId, reason, time);
        return true;
    } catch (e) {
        console.error("AFK set error:", e);
        return false;
    }
};

/**
 * Gets AFK status for a user
 * @param {string} userId 
 * @returns {Object|null}
 */
export const getAFK = (userId) => {
    try {
        return stmtGet.get(userId) || null;
    } catch (e) {
        console.error("AFK get error:", e);
        return null;
    }
};

/**
 * Deletes AFK status for a user
 * @param {string} userId 
 */
export const delAFK = (userId) => {
    try {
        stmtDel.run(userId);
        return true;
    } catch (e) {
        console.error("AFK del error:", e);
        return false;
    }
};
