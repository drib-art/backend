import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

const db = pool.promise();

// regular queries
async function getAllProducts() {
  const [rows, fields] = await db.query("SELECT * from Products");
  return rows;
}
