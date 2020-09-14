import {db} from "../../firebase";

export function setData(collection, data = {}){
  db.collection(collection).add(data)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
}
