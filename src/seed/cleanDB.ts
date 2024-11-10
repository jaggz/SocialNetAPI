import {User,Thought} from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "User" | "Thought", collectionName: string) => {
  try {
    if(modelName === 'User'){

      let modelExists = await User.db?.db?.listCollections({
        name: collectionName
      }).toArray()
      if (modelExists?.length) {
        await db?.dropCollection(collectionName);
      }
    }else{
      let modelExists = await Thought.db?.db?.listCollections({
        name: collectionName
      }).toArray()
      if (modelExists?.length) {
        await db?.dropCollection(collectionName);
      }
    }

  } catch (err) {
    throw err;
  }
}
