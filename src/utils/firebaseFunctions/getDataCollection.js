import {db} from "../../firebase";

export async function getDataCollection(collection) {
  try {
    const data = await db.collection(collection).get();
    const dataArr = data.docs.map(doc => ({id: doc.id, ...doc.data()}));

    if(dataArr && dataArr.length !== 0) {
      return dataArr;
    } else {
      throw new Error(`No access to ${collection} collection on server side.`);
    }
  } catch (error) {
    throw error
  }
}