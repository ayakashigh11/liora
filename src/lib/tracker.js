import db from "#auth/core.js";

/**
 * @file Statistics tracker using the core SQLite database
 */

// Initialize tables
db.db.exec(`
    CREATE TABLE IF NOT EXISTS command_stats (
        command TEXT PRIMARY KEY,
        count INTEGER DEFAULT 0,
        last_used INTEGER DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS user_stats (
        user_id TEXT PRIMARY KEY,
        count INTEGER DEFAULT 0,
        last_seen INTEGER DEFAULT (unixepoch())
    );
`);

const stmtUpsertCmd = db.db.query(`
    INSERT INTO command_stats (command, count, last_used) 
    VALUES (?, 1, unixepoch())
    ON CONFLICT(command) DO UPDATE SET 
        count = count + 1,
        last_used = unixepoch()
`);

const stmtUpsertUser = db.db.query(`
    INSERT INTO user_stats (user_id, count, last_seen) 
    VALUES (?, 1, unixepoch())
    ON CONFLICT(user_id) DO UPDATE SET 
        count = count + 1,
        last_seen = unixepoch()
`);

export const trackCommand = (command, userId) => {
    try {
        stmtUpsertCmd.run(command);
        stmtUpsertUser.run(userId);
    } catch (e) {
        console.error("Tracker error:", e);
    }
};

export const getStats = () => {
    try {
        const topCommands = db.db.query("SELECT * FROM command_stats ORDER BY count DESC LIMIT 10").all();
        const topUsers = db.db.query("SELECT * FROM user_stats ORDER BY count DESC LIMIT 10").all();
        const totalCommands = db.db.query("SELECT SUM(count) as total FROM command_stats").get();
        return { topCommands, topUsers, totalCommands: totalCommands?.total || 0 };
    } catch (e) {
        console.error("Tracker getStats error:", e);
        return { topCommands: [], topUsers: [], totalCommands: 0 };
    }
};
