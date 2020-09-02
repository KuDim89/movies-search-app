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

export function getDataDocument(collection, document) {
  return db.collection(collection).doc(document)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data()
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting documents: ", error)
      })
}