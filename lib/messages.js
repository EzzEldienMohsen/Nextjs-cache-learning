import sql from 'better-sqlite3';
import React from 'react';
import { unstable_cache as nextCache } from 'next/cache';
const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// cache function is provided by react and it has the same effect as request memorization
// even if you call the function on multiple places it will only reflect once
// used when you get data directly from db
// you can make the data cache-able by using next js data cache fn that returns a promise
// this means less requests sent
// you can set the options of next header to the cache fn from next/cache as a
// third argument object to the cache fn and u can sue revalidate const and tags for revalidate
//  tag fn and it will work just fine, the second argument is the parts array.

export const getMessages = nextCache(
  React.cache(function getMessages() {
    console.log('Fetching messages from db');
    return db.prepare('SELECT * FROM messages').all();
  }),
  ['messages'],
  {
    tags: 'msg',
  }
);
