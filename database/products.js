import { db } from "./config.js";

export async function getAllProducts() {
  try {
    const [data, meta] = await db.execute("SELECT * from Products");
    return JSON.stringify(data);
  } catch (error) {
    console.log(error); // TODO: remove in production
    throw error;
  } finally {
    await db.end();
  }
}

export async function getSingleProduct(productId) {
  try {
    const [[data], meta] = await db.execute("SELECT * from Products WHERE id=?", [productId]);
    return JSON.stringify(data);
  } catch (error) {
    console.log(error);// TODO: remove in production
  }
  await db.end();
}

export async function createProduct(productData) {
  try {
    const [data, meta] = await db.execute("INSERT INTO Products (name, slug, price, stock, description, thumb, image, lovedBy, collectionsId) VALUES (?,?,?,?,?,?,?,?,?)", [productData.name, productData.slug, productData.price, productData.stock, productData.description, productData.thumb, productData.image, productData.lovedBy, productData.collectionsId]);
    return JSON.stringify({ id: data.insertId });
  } catch (error) {
    console.log(error);// TODO: remove in production
  }
  await db.end();
}