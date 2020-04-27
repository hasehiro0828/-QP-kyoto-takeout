import { OriginalUtilities } from "./originalUtilities";
import * as SpreadsheetModel from "./models/SpreadsheetModel";
import * as moment from "moment";
import { GoogleMapAPI } from "./googleMapAPI";

export class SpreadsheetService {
  spreadsheetID: string;
  constructor() {
    this.spreadsheetID = OriginalUtilities.getProperty("SPREADSHEET_ID");
  }

  getSheetByName = (sheetName: string): GoogleAppsScript.Spreadsheet.Sheet => {
    // シート情報を取得
    const sheet = SpreadsheetApp.openById(this.spreadsheetID).getSheetByName(
      sheetName
    );
    if (!sheet) {
      console.error(`「${sheetName}」が存在しません`);
      return undefined;
    }
    return sheet;
  };

  getIndexesOfFormAnswer = (firstRow: string[]) => {
    return {
      timestamp: firstRow.indexOf("タイムスタンプ"),
      email: firstRow.indexOf("メールアドレス"),
      storeName: firstRow.indexOf("店舗名"),
      address: firstRow.indexOf("住所"),
      telephoneNumber: firstRow.indexOf("電話番号"),
      takeoutMenu: firstRow.indexOf("テイクアウトメニュー"),
      twitterURL: firstRow.indexOf("Twitter URL"),
      instagramURL: firstRow.indexOf("Instagram URL"),
      tabelogURL: firstRow.indexOf("食べログ URL"),
      onlineSalesURL: firstRow.indexOf("UberEats または通販サイト URL"),
      imageURL: firstRow.indexOf("画像URL"),
      businessHour: firstRow.indexOf("営業日時"),
      facebookURL: firstRow.indexOf("Facebook URL"),
      homepageURL: firstRow.indexOf("ホームページ URL"),
    };
  };

  getDataFromFormAnswer = (): SpreadsheetModel.FormAnswer[] => {
    const sheetName = "フォームの回答 1";
    const sheet = this.getSheetByName(sheetName);

    const firstRow = this.getFirstRowFromSheet(sheet);

    const data = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, firstRow.length)
      .getValues();

    const indexOf = this.getIndexesOfFormAnswer(firstRow);

    for (const key in indexOf) {
      if (indexOf[key] < 0) {
        console.log(`[${sheetName}]に[${key}]が存在しません`);
      }
    }

    const arrayOfAnswer: SpreadsheetModel.FormAnswer[] = [];
    data.forEach((row, index) => {
      arrayOfAnswer.push({
        ID: index + 1,
        timestamp: row[indexOf.timestamp],
        email: row[indexOf.email],
        storeName: row[indexOf.storeName],
        address: row[indexOf.address],
        telephoneNumber: row[indexOf.telephoneNumber],
        takeoutMenu: row[indexOf.takeoutMenu],
        twitterURL: row[indexOf.twitterURL],
        instagramURL: row[indexOf.instagramURL],
        tabelogURL: row[indexOf.tabelogURL],
        onlineSalesURL: row[indexOf.onlineSalesURL],
        imageURL: row[indexOf.imageURL],
        businessHour: row[indexOf.businessHour],
        facebookURL: row[indexOf.facebookURL],
        homepageURL: row[indexOf.homepageURL],
      });
    });
    return arrayOfAnswer;
  };

  getIndexesOfInputLog = (firstRow: string[]) => {
    return {
      ID: firstRow.indexOf("ID"),
      timestamp: firstRow.indexOf("タイムスタンプ"),
      email: firstRow.indexOf("メールアドレス"),
      storeName: firstRow.indexOf("店舗名"),
      address: firstRow.indexOf("住所"),
      telephoneNumber: firstRow.indexOf("電話番号"),
      takeoutMenu: firstRow.indexOf("テイクアウトメニュー"),
      twitterURL: firstRow.indexOf("Twitter URL"),
      instagramURL: firstRow.indexOf("Instagram URL"),
      tabelogURL: firstRow.indexOf("食べログ URL"),
      onlineSalesURL: firstRow.indexOf("UberEats または通販サイト URL"),
      imageURL: firstRow.indexOf("画像URL"),
      businessHour: firstRow.indexOf("営業日時"),
      facebookURL: firstRow.indexOf("Facebook URL"),
      homepageURL: firstRow.indexOf("ホームページ URL"),
    };
  };
  // IDごとに最新の入力を取得
  getDataFromInputLog = (): SpreadsheetModel.InputLog[] => {
    const sheetName = "入力データログ";
    const sheet = this.getSheetByName(sheetName);
    if (sheet.getLastRow() === 1) {
      return;
    }
    const firstRow = this.getFirstRowFromSheet(sheet);

    const data = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, firstRow.length)
      .getValues();

    const indexOf = this.getIndexesOfInputLog(firstRow);

    for (const key in indexOf) {
      if (indexOf[key] < 0) {
        console.log(`[${sheetName}]に[${key}]が存在しません`);
      }
    }

    const arrayOfInputLog: SpreadsheetModel.InputLog[] = [];
    data.forEach((row, index) => {
      if (arrayOfInputLog.some((inputLog) => row[indexOf.ID] === inputLog.ID)) {
        console.log(row);
        console.log("最新のデータをすでに取得しているので飛ばす");
        return;
      }
      arrayOfInputLog.push({
        ID: row[indexOf.ID],
        timestamp: row[indexOf.timestamp],
        email: row[indexOf.email],
        storeName: row[indexOf.storeName],
        address: row[indexOf.address],
        telephoneNumber: row[indexOf.telephoneNumber],
        takeoutMenu: row[indexOf.takeoutMenu],
        twitterURL: row[indexOf.twitterURL],
        instagramURL: row[indexOf.instagramURL],
        tabelogURL: row[indexOf.tabelogURL],
        onlineSalesURL: row[indexOf.onlineSalesURL],
        imageURL: row[indexOf.imageURL],
        businessHour: row[indexOf.businessHour],
        facebookURL: row[indexOf.facebookURL],
        homepageURL: row[indexOf.homepageURL],
      });
    });
    return arrayOfInputLog;
  };

  getIndexesOfStoredData = (firstRow: string[]) => {
    return {
      ID: firstRow.indexOf("ID"),
      timestamp: firstRow.indexOf("タイムスタンプ"),
      email: firstRow.indexOf("メールアドレス"),
      storeName: firstRow.indexOf("店舗名"),
      address: firstRow.indexOf("住所"),
      telephoneNumber: firstRow.indexOf("電話番号"),
      takeoutMenu: firstRow.indexOf("テイクアウトメニュー"),
      takeoutMenuEdited: firstRow.indexOf("テイクアウトメニュー(編集済み)"),
      takeoutMenuEditedOld: firstRow.indexOf(
        "テイクアウトメニュー(過去の編集)"
      ),
      twitterURL: firstRow.indexOf("Twitter URL"),
      instagramURL: firstRow.indexOf("Instagram URL"),
      tabelogURL: firstRow.indexOf("食べログ URL"),
      onlineSalesURL: firstRow.indexOf("UberEats または通販サイト URL"),
      imageURL: firstRow.indexOf("画像URL"),
      imageURLEdited: firstRow.indexOf("画像URL(編集済み)"),
      businessHour: firstRow.indexOf("営業日時"),
      businessHourEdited: firstRow.indexOf("営業日時(編集済み)"),
      businessHourEditedOld: firstRow.indexOf("営業日時(過去の編集)"),
      facebookURL: firstRow.indexOf("Facebook URL"),
      homepageURL: firstRow.indexOf("ホームページ URL"),
      longitude: firstRow.indexOf("longitude"),
      longitudeEdited: firstRow.indexOf("longitude(編集済み)"),
      latitude: firstRow.indexOf("latitude"),
      latitudeEdited: firstRow.indexOf("latitude(編集済み)"),
      isNew: firstRow.indexOf("IsNew"),
      needUpdating: firstRow.indexOf("NeedUpdating"),
    };
  };
  getDataFromStoredData = (): SpreadsheetModel.StoredData[] => {
    const sheetName = "firestore投入用シート";
    const sheet = this.getSheetByName(sheetName);
    if (sheet.getLastRow() === 1) {
      return [];
    }

    const firstRow = this.getFirstRowFromSheet(sheet);

    const data = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, firstRow.length)
      .getValues();

    const indexOf = this.getIndexesOfStoredData(firstRow);

    for (const key in indexOf) {
      if (indexOf[key] < 0) {
        console.log(`[${sheetName}]に[${key}]が存在しません`);
      }
    }

    const arrayOfStoredData: SpreadsheetModel.StoredData[] = [];
    data.forEach((row, index) => {
      arrayOfStoredData.push({
        ID: row[indexOf.ID],
        timestamp: row[indexOf.timestamp],
        email: row[indexOf.email],
        storeName: row[indexOf.storeName],
        address: row[indexOf.address],
        telephoneNumber: row[indexOf.telephoneNumber],
        takeoutMenu: row[indexOf.takeoutMenu],
        takeoutMenuEdited: row[indexOf.takeoutMenuEdited],
        takeoutMenuEditedOld: row[indexOf.takeoutMenuEditedOld],
        twitterURL: row[indexOf.twitterURL],
        instagramURL: row[indexOf.instagramURL],
        tabelogURL: row[indexOf.tabelogURL],
        onlineSalesURL: row[indexOf.onlineSalesURL],
        imageURL: row[indexOf.imageURL],
        imageURLEdited: row[indexOf.imageURLEdited],
        businessHour: row[indexOf.businessHour],
        businessHourEdited: row[indexOf.businessHourEdited],
        businessHourEditedOld: row[indexOf.businessHourEditedOld],
        facebookURL: row[indexOf.facebookURL],
        homepageURL: row[indexOf.homepageURL],
        longitude: row[indexOf.longitude],
        longitudeEdited: row[indexOf.longitudeEdited],
        latitude: row[indexOf.latitude],
        latitudeEdited: row[indexOf.latitudeEdited],
        isNew: row[indexOf.isNew],
        needUpdating: row[indexOf.needUpdating],
      });
    });
    return arrayOfStoredData;
  };

  extractInsertDataFromArrayOfAnswer = (
    arrayOfAnswer: SpreadsheetModel.FormAnswer[],
    arrayOfInputLog: SpreadsheetModel.InputLog[]
  ): string[][] => {
    const sheetName = "入力データログ";
    const sheet = this.getSheetByName(sheetName);
    const firstRow = this.getFirstRowFromSheet(sheet);

    const indexOf = this.getIndexesOfInputLog(firstRow);

    for (const key in indexOf) {
      if (indexOf[key] < 0) {
        console.log(`[${sheetName}]に[${key}]が存在しません`);
      }
    }

    const insertData: string[][] = [];
    arrayOfAnswer.forEach((answer) => {
      if (arrayOfInputLog) {
        const sameStoreNameInputLog = arrayOfInputLog.find((inputLog) => {
          return inputLog.storeName === answer.storeName;
        });

        if (
          sameStoreNameInputLog &&
          moment(answer.timestamp).isSameOrBefore(
            moment(sameStoreNameInputLog.timestamp)
          )
        ) {
          return;
        }
      }
      const row = Array(Object.keys(indexOf).length);
      row[indexOf.ID] = answer.ID.toString();
      row[indexOf.timestamp] = answer.timestamp;
      row[indexOf.email] = answer.email;
      row[indexOf.storeName] = answer.storeName;
      row[indexOf.address] = answer.address;
      row[indexOf.telephoneNumber] = answer.telephoneNumber;
      row[indexOf.takeoutMenu] = answer.takeoutMenu;
      row[indexOf.twitterURL] = answer.twitterURL;
      row[indexOf.instagramURL] = answer.instagramURL;
      row[indexOf.tabelogURL] = answer.tabelogURL;
      row[indexOf.onlineSalesURL] = answer.onlineSalesURL;
      row[indexOf.imageURL] = answer.imageURL;
      row[indexOf.businessHour] = answer.businessHour;
      row[indexOf.facebookURL] = answer.facebookURL;
      row[indexOf.homepageURL] = answer.homepageURL;

      insertData.push(row);
    });

    return insertData;
  };

  extractNewDataOfStoredDataFromSheets = (
    arrayOfInputLog: SpreadsheetModel.InputLog[],
    arrayOfStoredData: SpreadsheetModel.StoredData[]
  ): string[][] => {
    const sheetName = "firestore投入用シート";
    const sheet = this.getSheetByName(sheetName);
    const firstRow = this.getFirstRowFromSheet(sheet);

    const indexOf = this.getIndexesOfStoredData(firstRow);

    for (const key in indexOf) {
      if (indexOf[key] < 0) {
        console.log(`[${sheetName}]に[${key}]が存在しません`);
      }
    }

    const googleMapAPI = new GoogleMapAPI();

    const insertData: string[][] = [];
    arrayOfInputLog.forEach((inputLog) => {
      let needUpdating = true;
      let takeoutMenuEdited = "";
      let takeoutMenuEditedOld = "";
      let businessHourEdited = "";
      let businessHourEditedOld = "";
      let longitude = "APIで取得したデータ";
      let latitude = "APIで取得したデータ";

      let sameIDStoredData: SpreadsheetModel.StoredData;
      if (!arrayOfStoredData.length) {
        // 新規のデータ
        const geocode = googleMapAPI.getGeocode(inputLog.address);
        longitude = geocode.results[0].geometry.location.lng.toString();
        latitude = geocode.results[0].geometry.location.lat.toString();
      } else {
        sameIDStoredData = arrayOfStoredData.find((storedData) => {
          return storedData.ID === inputLog.ID;
        });

        if (sameIDStoredData) {
          needUpdating = sameIDStoredData.needUpdating;
          takeoutMenuEdited = sameIDStoredData.takeoutMenuEdited;
          takeoutMenuEditedOld = sameIDStoredData.takeoutMenuEditedOld;
          businessHourEdited = sameIDStoredData.businessHourEdited;
          businessHourEditedOld = sameIDStoredData.businessHourEditedOld;
          if (
            // 入力データログの方が新しい時
            moment(inputLog.timestamp).isAfter(
              moment(sameIDStoredData.timestamp)
            )
          ) {
            needUpdating = true;
            takeoutMenuEdited = "";
            takeoutMenuEditedOld =
              sameIDStoredData.takeoutMenuEdited !== ""
                ? sameIDStoredData.takeoutMenuEdited
                : sameIDStoredData.takeoutMenuEditedOld;
            businessHourEdited = "";
            businessHourEditedOld =
              sameIDStoredData.businessHourEdited !== ""
                ? sameIDStoredData.businessHourEdited
                : sameIDStoredData.businessHourEditedOld;
          }
        } else {
          // 新規のデータ
          const geocode = googleMapAPI.getGeocode(inputLog.address);
          longitude = geocode.results[0].geometry.location.lng.toString();
          latitude = geocode.results[0].geometry.location.lat.toString();
        }
      }

      const row = Array(Object.keys(indexOf).length);
      row[indexOf.ID] = inputLog.ID.toString();
      row[indexOf.timestamp] = inputLog.timestamp;
      row[indexOf.email] = inputLog.email;
      row[indexOf.storeName] = inputLog.storeName;
      row[indexOf.address] = inputLog.address;
      row[indexOf.telephoneNumber] = inputLog.telephoneNumber;
      row[indexOf.takeoutMenu] = inputLog.takeoutMenu;
      row[indexOf.takeoutMenuEdited] = takeoutMenuEdited;
      row[indexOf.takeoutMenuEditedOld] = takeoutMenuEditedOld;
      row[indexOf.twitterURL] = sameIDStoredData
        ? sameIDStoredData.twitterURL
        : inputLog.twitterURL;
      row[indexOf.instagramURL] = sameIDStoredData
        ? sameIDStoredData.instagramURL
        : inputLog.instagramURL;
      row[indexOf.tabelogURL] = sameIDStoredData
        ? sameIDStoredData.tabelogURL
        : inputLog.tabelogURL;
      row[indexOf.onlineSalesURL] = sameIDStoredData
        ? sameIDStoredData.onlineSalesURL
        : inputLog.onlineSalesURL;
      row[indexOf.imageURL] = inputLog.imageURL;
      row[indexOf.imageURLEdited] = sameIDStoredData
        ? sameIDStoredData.imageURLEdited
        : "";
      row[indexOf.businessHour] = inputLog.businessHour;
      row[indexOf.businessHourEdited] = businessHourEdited;
      row[indexOf.businessHourEditedOld] = businessHourEditedOld;
      row[indexOf.facebookURL] = sameIDStoredData
        ? sameIDStoredData.facebookURL
        : inputLog.facebookURL;
      row[indexOf.homepageURL] = sameIDStoredData
        ? sameIDStoredData.homepageURL
        : inputLog.homepageURL;
      row[indexOf.longitude] = sameIDStoredData
        ? sameIDStoredData.longitude.toString()
        : longitude;
      row[indexOf.longitudeEdited] = sameIDStoredData
        ? sameIDStoredData.longitudeEdited.toString()
        : "";
      row[indexOf.latitude] = sameIDStoredData
        ? sameIDStoredData.latitude.toString()
        : latitude;
      row[indexOf.latitudeEdited] = sameIDStoredData
        ? sameIDStoredData.latitudeEdited.toString()
        : "";
      row[indexOf.isNew] = sameIDStoredData ? sameIDStoredData.isNew : "true";
      row[indexOf.needUpdating] = needUpdating.toString();

      insertData.push(row);
    });

    return insertData;
  };

  insertDataToSheet = (
    sheetName: string,
    insertData: string[][],
    withRefresh: boolean = false
  ) => {
    if (!insertData.length) return;

    // シート情報を取得
    const sheet = SpreadsheetApp.openById(this.spreadsheetID).getSheetByName(
      sheetName
    );
    if (!sheet) {
      console.error(`「${sheetName}」が存在しません`);
      return;
    }

    if (withRefresh) {
      // シートを綺麗に
      const lastRow = sheet.getLastRow();
      if (1 < lastRow) {
        sheet.deleteRows(2, lastRow - 1);
      }
    }

    const numberOfRow = insertData.length;

    sheet.insertRowsAfter(1, numberOfRow);
    sheet
      .getRange(2, 1, numberOfRow, insertData[0].length)
      .setValues(insertData);
  };

  getFirstRowFromSheet = (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
    const indexOfLastColumn = sheet
      .getRange(1, 1)
      .getNextDataCell(SpreadsheetApp.Direction.NEXT)
      .getColumn();
    const firstRow = sheet.getRange(1, 1, 1, indexOfLastColumn).getValues()[0];

    return firstRow;
  };
}
