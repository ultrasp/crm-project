export class CompareUtil {

  public static equalsIgnoreCase(obj1: string, obj2: string) {
    if (obj1 == null && obj2 == null) {
      return true;
    }

    if (obj1 == null || obj2 == null) return false;

    return obj1.toLowerCase() == obj2.toLowerCase();
  }

  public static equals(obj1: any, obj2: any): boolean {
    return obj1 == obj2;
  }

}
