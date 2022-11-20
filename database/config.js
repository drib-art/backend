import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: true }
});

// const pool = await mysql.createConnection(process.env.DB_URI);

const ping = async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
  } catch (error) {
    console.log(error);
    await pool.end();
  }
};
await ping();

export const db = pool;

