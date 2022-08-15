import {
  CrmDriverCategoryEnum
} from "src/app/common/enums/crm-driver-category.enum";

export class DriverCategoryUtil {
  static getText(flag: number) {
    let refList = DriverCategoryUtil.getKeys();
    let text = '';
    refList.forEach(v => {
      let val = DriverCategoryUtil.getKeyValue(v);
      if (val & flag) {
        text += v + ',';
      }
    })
    return text;
  }

  static getKeys(): string[] {
    return Object.values(CrmDriverCategoryEnum).filter((value) => typeof value === "string").map((value) => (value as string));
  }

  static getKeyValue(key: string): number {
    return parseInt(Object.keys(CrmDriverCategoryEnum)[Object.values(CrmDriverCategoryEnum).indexOf(key)])
  }
}
