/* eslint-disable @typescript-eslint/no-unused-vars */
import { OriginalUtilities } from "./originalUtilities";
import { SpreadsheetService } from "./spreadsheetService";
import { Store } from "./models/Store";

declare const global: {
  [x: string]: any;
};

global.test = () => {
  console.log("test");
};

global.createInputLogSheet = () => {
  const spreadsheetService = new SpreadsheetService();

  const arrayOfAnswer = spreadsheetService.getDataFromFormAnswer();
  console.log("[createInputLogSheet][getDataFromFormAnswer]:");
  console.log(arrayOfAnswer);
  const arrayOfInputLog = spreadsheetService.getDataFromInputLog();
  console.log(`[createInputLogSheet][getDataFromInputLog]:`);
  console.log(arrayOfInputLog);
  const insertDate = spreadsheetService.extractInsertDataFromArrayOfAnswer(
    arrayOfAnswer,
    arrayOfInputLog
  );
  console.log(`[createInputLogSheet][extractInsertDataFromArrayOfAnswer]:`);
  console.log(insertDate);

  spreadsheetService.insertDataToSheet("入力データログ", insertDate);
};

global.createStoredSheet = () => {
  const spreadsheetService = new SpreadsheetService();

  const arrayOfInputLog = spreadsheetService.getDataFromInputLog();
  console.log("[createStoredSheet][getDataFromInputLog]:");
  console.log(arrayOfInputLog);
  const arrayOfStoredData = spreadsheetService.getDataFromStoredData();
  console.log("[createStoredSheet][getDataFromStoredData]:");
  console.log(arrayOfStoredData);
  const insertDate = spreadsheetService.extractNewDataOfStoredDataFromSheets(
    arrayOfInputLog,
    arrayOfStoredData
  );
  console.log("[createStoredSheet][extractNewDataOfStoredDataFromSheets]:");
  console.log(insertDate);
  spreadsheetService.insertDataToSheet(
    "firestore投入用シート",
    insertDate,
    true
  );
};

global.sheetToFirestore = () => {
  const spreadsheetService = new SpreadsheetService();

  const email = OriginalUtilities.getProperty("FIREBASE_SERVICE_CLIENT_EMAIL");
  const key = OriginalUtilities.getProperty("FIREBASE_SERVICE_PRIVATE_KEY");
  const projectID = OriginalUtilities.getProperty(
    "FIREBASE_SERVICE_PROJECT_ID"
  );
  const firestore = FirestoreApp.getFirestore(email, key, projectID);

  const arrayOfStoredData = spreadsheetService.getDataFromStoredData();
  for (const storedData of arrayOfStoredData) {
    const data: Store = {
      id: storedData.ID.toString(),
      image: storedData.imageURLEdited
        ? storedData.imageURLEdited
        : storedData.imageURL,
      title: storedData.storeName,
      businessHour:
        storedData.businessHourEdited !== ""
          ? storedData.businessHourEdited
          : storedData.businessHour,
      detail:
        storedData.takeoutMenuEdited !== ""
          ? storedData.takeoutMenuEdited
          : storedData.takeoutMenu,
      place: storedData.address,
      phonenumber: storedData.telephoneNumber,
      email: storedData.email,
      homepage: storedData.homepageURL,
      twitter: storedData.twitterURL,
      instagram: storedData.instagramURL,
      facebook: storedData.facebookURL,
      tabelog: storedData.tabelogURL,
      otherUrl: storedData.onlineSalesURL,
      latitude: storedData.latitudeEdited
        ? storedData.latitudeEdited
        : storedData.latitude,
      longitude: storedData.longitudeEdited
        ? storedData.longitudeEdited
        : storedData.longitude,
    };

    if (storedData.isNew) {
      firestore.createDocument(`stores/${storedData.ID}`, data);
    } else if (storedData.needUpdating) {
      firestore.updateDocument(`stores/${storedData.ID}`, data, false);
    }
  }

  const sheetName = "firestore投入用シート";
  const sheet = spreadsheetService.getSheetByName(sheetName);
  const firstRow = spreadsheetService.getFirstRowFromSheet(sheet);
  const indexOfIsNew = spreadsheetService.getIndexOfRow(
    sheetName,
    firstRow,
    "IsNew"
  );

  spreadsheetService.updateStatusOfStoredData(
    arrayOfStoredData.length,
    indexOfIsNew + 1
  );
};

// プロパティ設定用関数
// keyとvalueにそれぞれ任意の値を入れる
global.setProperties = () => {
  OriginalUtilities.setProperty("key", "value");
};
// プロパティ設定用関数
// keyに任意の値を入れる
global.deleteProperties = () => {
  OriginalUtilities.deleteProperty("key");
};
