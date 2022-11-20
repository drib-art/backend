import { db } from "./config.js";

export async function getAllProducts() {
  try {
    const [data, meta] = await db.execute("SELECT * from Products");
    return JSON.stringify(data);
  } catch (error) {
    console.log(error); // TODO: remove in production
    throw error;
  }
  // FIXME: I dunno if i should end the pool {await db.end()}here gotta look more about pooling
}

export async function getSingleProduct(productId) {
  try {
    const [[data], meta] = await db.execute("SELECT * from Products WHERE id=?", [productId]);
    return JSON.stringify(data);
  } catch (error) {
    console.log(error);// TODO: remove in production
    throw error;
  }
}

export async function createProduct(productData) {
  try {
    const [data, meta] = await db.execute("INSERT INTO Products (name, slug, price, stock, description, thumb, image, lovedBy, collectionsId) VALUES (?,?,?,?,?,?,?,?,?)", [productData.name, productData.slug, productData.price, productData.stock, productData.description, productData.thumb, productData.image, productData.lovedBy, productData.collectionsId]);
    return JSON.stringify({ id: data.insertId });
  } catch (error) {
    console.log(error);// TODO: remove in production
    throw error;
  }
}

export async function updateProduct(productData) {
  try {
    const [data, meta] = await db.execute("UPDATE Products SET name = ?, slug = ?, price = ?, stock = ?, description = ?, thumb = ?, image = ?, lovedBy = ?, collectionsId = ? WHERE id = ?", [productData.name, productData.slug, productData.price, productData.stock, productData.description, productData.thumb, productData.image, productData.lovedBy, productData.collectionsId, productData.id]);
    return true;
  } catch (error) {
    console.log(error);// TODO: remove in production
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const [data, meta] = await db.execute("DELETE from Products WHERE id = ?", productId);
    return true;
  } catch (error) {
    console.log(error);// TODO: remove in production
    throw error;
  }
}