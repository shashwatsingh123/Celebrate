const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'celebrate.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    category TEXT NOT NULL,
    available INTEGER DEFAULT 1,
    work_start TEXT DEFAULT '09:00',
    work_end TEXT DEFAULT '21:00',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    event_type TEXT NOT NULL,
    event_date TEXT NOT NULL,
    guest_count INTEGER NOT NULL,
    budget TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    services TEXT NOT NULL,
    special_requests TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER,
    vendor_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    event_name TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    location TEXT,
    event_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    vendor_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
  );

  CREATE TABLE IF NOT EXISTS blocked_dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vendor_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
  );
`);

module.exports = db;
