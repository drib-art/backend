import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   // host: process.env.DB_HOST,
//   // user: process.env.DB_USER,
//   // password: process.env.DB_PASS,
//   // database: process.env.DB_NAME,
//   uri: process.env.DB_URI,
// });

const pool = await mysql.createConnection(process.env.DB_URI);

export const db = pool;

// regular queries
export async function getAllProducts() {
  try {
    const [rows, fields] = await db.execute("SELECT * from Products");
    return rows;
  } catch (error) {
    console.log(error);
  }
  await db.end();
}
