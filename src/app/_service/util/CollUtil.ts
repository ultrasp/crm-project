export class CollUtil {

  public static clear(obj: any[]) {
    obj.length = 0;
  }

  public static copy(obj: any[]) {
    return Object.assign([], obj);
  }
}
