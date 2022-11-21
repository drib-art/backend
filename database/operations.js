import { db } from "./config.js";

// return the sql query for patch routes based on received body of fields
export function setPatchQuery(patchData) {
  let setQuery = '';

  Object.entries(patchData).forEach(([key, value]) => {
    const values = typeof value === 'string' ? `'${value}'` : value;
    setQuery += `${key} = ${values},`;
  });
  setQuery = setQuery.slice(0, -1);

  return setQuery;
}

// could be used for abstracting get, getsingle, delete and patch routes

// eg
export async function getAll(tableName) {
  const qry = "SELECT * from" + tableName;
  try {
    const [data, meta] = await db.execute(qry);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// then the routes (eg GET /products can implement as)
// const dbResponse = await getAll("Products");
// if (!dbResponse) {res.status(404).end()}
// res.send(dbResponse);