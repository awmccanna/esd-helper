import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import Database from 'better-sqlite3';
import { getPreloadPath } from './pathResolver.js';

let db: Database.Database;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }

    db = new Database('applications.db');
    db.prepare(`CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT NOT NULL,
        url TEXT NOT NULL,
        position TEXT NOT NULL,
        appliedDate TEXT NOT NULL
    )`).run();
});

ipcMain.handle('db-query', (_event, query, params) => {
    try {
        const stmt = db.prepare(query);
        return stmt.all(...params);
    } catch (error) {
        console.error('Database error:', error);
        return { error: (error as Error).message };
    }
});

ipcMain.handle('createApplication', (_event, { company, url, position, appliedDate }) => {
    try {
        const stmt = db.prepare(`
        INSERT INTO applications (company, url, position, appliedDate) 
        VALUES (?, ?, ?, ?)
      `);
        stmt.run(company, url, position, appliedDate);
        return { success: true };
    } catch (error) {
        console.error('Insert error:', error);
        return { error: (error as Error).message };
    }
});

ipcMain.handle('getApplications', () => {
    try {
        return db.prepare('SELECT * FROM applications').all();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: (error as Error).message };
    }
});

ipcMain.handle('deleteApplication', (_event, id) => {
    try {
        db.prepare('DELETE FROM applications WHERE id = ?').run(id);
        return { success: true };
    } catch (error) {
        console.error('Delete error:', error);
        return { error: (error as Error).message };
    }
});