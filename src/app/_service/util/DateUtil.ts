import { DatePipe } from "@angular/common";
import moment from "moment";
import { CommonUtil } from "./CommonUtil";

export class DateUtil {

  private static __END_TIME = "23:59:59";
  private static pipe: DatePipe = new DatePipe('en-US');

  public static parseDate(dt: Date, endDate: boolean = false): string {
    if (CommonUtil.isNull(dt)) {
      return "";
    }

    if (endDate) {
      return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + this.__END_TIME;
    }

    return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" +
      dt.getMinutes() + ":" + dt.getSeconds();
  }

  public static parseDateFromString(s: string, format: string = 'MM/DD/YYYY'): Date | null {
    let d = moment(s, format).toDate();
    if (isNaN(d.getTime()) || d.getTime() == null) return null;
    return d;
  }

  //2022-07-14T19:00:00.000+00:00
  public static parseDateFromStringWithTimeZone(dateStr:string, returnFormat:string = 'DD.MM.yyyy'){
    // return moment.utc(dateStr).format(returnFormat);
    return moment(dateStr).format(returnFormat);
  }
  public static formatDate(
    vDate: Date | null,
    vFormat: string = 'dd.MM.yyyy'
  ): string | null {
    let date 
    try {
      date = DateUtil.pipe.transform(vDate, vFormat);
    } catch (error) {
      date = ''
    }
    return date;
  }

  public static formatDateToServer(
    vDate: Date | null,
    vFormat: string = 'yyyy-MM-dd'
  ): string | null {
    return DateUtil.pipe.transform(vDate, vFormat);
  }

}
