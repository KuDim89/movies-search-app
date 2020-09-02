import {db} from "../firebase";

export function getDataCollection(collection) {
  return db.collection(collection)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc  => ({
          id: doc.id,
          ...doc.data()
        }));

      })
      .catch(error => {
        console.log("Error getting documents: ", error)
      })
}