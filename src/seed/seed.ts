import db from "../config/connection.js";
import {User} from "../models/index.js";
import cleanDB from "./cleanDB.js";

import userData from './userData.json' assert { type: "json" };

await db.once('open', async () => {
  await cleanDB('User', 'users');

  await User.insertMany(userData);

  console.log('Users seeded!');
  process.exit(0);
});
