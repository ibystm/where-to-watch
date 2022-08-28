import { ModeIndex } from "../redux/contentsMode";
import { FirestoreTypesCommon } from "./firestoreTypesCommon";

export type FirestoreTypesBookMark = {
  name: string;
  modeIndex: ModeIndex;
  tmdbId: string;
} & FirestoreTypesCommon;
