import { ModeIndex } from "../redux/contentsMode";
import { FirestoreTypesCommon } from "./firestoreTypesCommon";

export type BookMark = {
  name: string;
  modeIndex: ModeIndex;
  tmdbId: string;
};

export type FirestoreTypesBookMark = BookMark & FirestoreTypesCommon;
