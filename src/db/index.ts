import { getFirestore } from "firebase/firestore";
import app from "../app/firebase";

const db = getFirestore(app);

export default db;
