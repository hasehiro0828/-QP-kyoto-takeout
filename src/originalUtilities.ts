/* eslint-disable @typescript-eslint/no-unused-vars */
export class OriginalUtilities {
  static setProperty = (key: string, value: string) => {
    PropertiesService.getScriptProperties().setProperty(key, value);
  };

  static deleteProperty = (key: string) => {
    PropertiesService.getScriptProperties().deleteProperty(key);
  };

  static getProperty = (key: string) => {
    const value =
      PropertiesService.getScriptProperties().getProperty(key) || "";
    if (value === "") console.log(key + "が存在しません。。");

    return value;
  };
}
