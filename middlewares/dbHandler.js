// catch the errors while reading and writing from database and return null if any error
export async function toDatabase(dbAction, params) {
  if (!params) {
    params = '';
  }
  try {
    const data = await dbAction(params);
    return data;
  } catch (error) {
    return;
  }
}
