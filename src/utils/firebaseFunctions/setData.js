import {db} from "../../firebase";

export async function setData(collection, data = {}){
  try {
    return await db.collection(collection).add(data);
  } catch (error) {
    throw new Error(error)
  }
}
