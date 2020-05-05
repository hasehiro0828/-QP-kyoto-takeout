declare class FirestoreApp {
  static getFirestore(email: string, key: string, projectId: string): Firestore;
}

declare class Firestore {
  getDocuments(path: string): number;
  createDocument(path: string, fields: object): any;
  updateDocument(path: string, fields: object, mask: boolean): any;
}
