/* eslint-disable @typescript-eslint/no-unused-vars */
import { OriginalUtilities } from "./originalUtilities";
import { GoogleMapAPI } from "./googleMapAPI";
import { SpreadsheetService } from "./spreadsheetService";

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
