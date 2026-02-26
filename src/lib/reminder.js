/**
 * @file Reminder system using SQLite
 */
import db from "#auth/core.js";

db.db.exec(`
    CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        chat_id TEXT,
        message TEXT,
        time INTEGER,
        status TEXT DEFAULT 'pending'
    );
`);

const stmtAdd = db.db.query(`
    INSERT INTO reminders (user_id, chat_id, message, time) 
    VALUES (?, ?, ?, ?)
`);

const stmtGetPending = db.db.query(`
    SELECT * FROM reminders 
    WHERE time <= unixepoch() AND status = 'pending'
`);

const stmtMarkDone = db.db.query(`
    UPDATE reminders SET status = 'done' WHERE id = ?
`);

export const addReminder = (userId, chatId, message, delaySeconds) => {
    const time = Math.floor(Date.now() / 1000) + delaySeconds;
    stmtAdd.run(userId, chatId, message, time);
};

export const checkReminders = () => {
    const list = stmtGetPending.all();
    for (const r of list) {
        stmtMarkDone.run(r.id);
    }
    return list;
};
