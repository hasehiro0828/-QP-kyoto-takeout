import { OriginalUtilities } from "./originalUtilities";
import { GetGeocodeResponse } from "./models/GoogleMapModel";

export class GoogleMapAPI {
  key: string;
  constructor() {
    this.key = OriginalUtilities.getProperty("GOOGLE_MAP_API_KEY");
  }

  // ログインユーザの情報の取得
  getGeocode(address: string) {
    let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.key}`;

    let options = {
      method: "get",
    } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
    let response = UrlFetchApp.fetch(requestUrl, options);

    let data: GetGeocodeResponse = JSON.parse(response.getContentText());
    console.log(`[GoogleMapAPI][getGeocode]:${JSON.stringify(data)}`);
    return data;
  }
}
