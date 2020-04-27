export interface FormAnswer {
  ID: number;
  timestamp: string;
  email: string;
  storeName: string;
  address: string;
  telephoneNumber: string;
  takeoutMenu: string;
  twitterURL: string;
  instagramURL: string;
  tabelogURL: string;
  onlineSalesURL: string;
  imageURL: string;
  businessHour: string;
  facebookURL: string;
  homepageURL: string;
}
export interface InputLog {
  ID: number;
  timestamp: string;
  email: string;
  storeName: string;
  address: string;
  telephoneNumber: string;
  takeoutMenu: string;
  twitterURL: string;
  instagramURL: string;
  tabelogURL: string;
  onlineSalesURL: string;
  imageURL: string;
  businessHour: string;
  facebookURL: string;
  homepageURL: string;
}

export interface StoredData {
  ID: number;
  timestamp: string;
  email: string;
  storeName: string;
  address: string;
  telephoneNumber: string;
  takeoutMenu: string;
  takeoutMenuEdited: string;
  takeoutMenuEditedOld: string;
  twitterURL: string;
  instagramURL: string;
  tabelogURL: string;
  onlineSalesURL: string;
  imageURL: string;
  imageURLEdited: string;
  businessHour: string;
  businessHourEdited: string;
  businessHourEditedOld: string;
  facebookURL: string;
  homepageURL: string;
  longitude: number;
  longitudeEdited: number;
  latitude: number;
  latitudeEdited: number;
  isNew: boolean;
  needUpdating: boolean;
}
