const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'neurodesk'
};

async function migrateDatabase() {
  let db;
  
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database for migration');

    // Add missing columns to tasks table
    try {
      await db.execute('ALTER TABLE tasks ADD COLUMN payment_amount DECIMAL(10,2) DEFAULT 0.00');
      console.log('Added payment_amount column to tasks table');
    } catch (error) {
      if (error.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding payment_amount column:', error.message);
      } else {
        console.log('payment_amount column already exists');
      }
    }

    try {
      await db.execute('ALTER TABLE tasks ADD COLUMN is_paid BOOLEAN DEFAULT FALSE');
      console.log('Added is_paid column to tasks table');
    } catch (error) {
      if (error.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding is_paid column:', error.message);
      } else {
        console.log('is_paid column already exists');
      }
    }

    // Add missing columns to users table
    try {
      await db.execute('ALTER TABLE users ADD COLUMN subscription_status ENUM("FREE", "PREMIUM", "ENTERPRISE") DEFAULT "FREE"');
      console.log('Added subscription_status column to users table');
    } catch (error) {
      if (error.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding subscription_status column:', error.message);
      } else {
        console.log('subscription_status column already exists');
      }
    }

    try {
      await db.execute('ALTER TABLE users ADD COLUMN subscription_expires_at DATETIME NULL');
      console.log('Added subscription_expires_at column to users table');
    } catch (error) {
      if (error.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding subscription_expires_at column:', error.message);
      } else {
        console.log('subscription_expires_at column already exists');
      }
    }

    // Create missing tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT,
        type ENUM('TASK', 'TEAM', 'SYSTEM', 'ANNOUNCEMENT', 'PAYMENT') DEFAULT 'SYSTEM',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Notifications table created/verified');

    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NULL,
        team_id INT NULL,
        message TEXT NOT NULL,
        message_type ENUM('DIRECT', 'TEAM', 'ANNOUNCEMENT') DEFAULT 'DIRECT',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
      )
    `);
    console.log('Messages table created/verified');

    await db.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task_id INT NOT NULL,
        user_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
        payment_method VARCHAR(100),
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Payments table created/verified');

    await db.execute(`
      CREATE TABLE IF NOT EXISTS invitations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        role ENUM('ADMIN', 'TEAM_LEADER', 'EMPLOYEE') DEFAULT 'EMPLOYEE',
        invited_by INT NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        status ENUM('PENDING', 'ACCEPTED', 'EXPIRED') DEFAULT 'PENDING',
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Invitations table created/verified');

    console.log('Database migration completed successfully!');
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    if (db) {
      await db.end();
    }
  }
}

// Run migration
migrateDatabase();