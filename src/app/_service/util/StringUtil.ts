export class StringUtil {

  public static emptyString(str: string | null | undefined): boolean {
    return str === "" || str === null || str === undefined;
  }

  public static toStr(str: string | null | undefined, defVal:string | null = ''): string |  null {
    return (StringUtil.emptyString(str) ? defVal : <string>str);
  }

  public static toCyrilic(entered_text:string){
    entered_text = entered_text.replace(/sh/g,'ш');
    entered_text = entered_text.replace(/ch/g,'ч');

    entered_text = entered_text.replace(/Sh/g,'Ш');
    entered_text = entered_text.replace(/SH/g,'Ш');

    entered_text = entered_text.replace(/Ch/g,'Ч');
    entered_text = entered_text.replace(/CH/g,'Ч');

    entered_text = entered_text.replace(/Yo/g,'Ё');
    entered_text = entered_text.replace(/YO/g,'Ё');

    entered_text = entered_text.replace(/Yu/g,'Ю');
    entered_text = entered_text.replace(/YU/g,'Ю');

    entered_text = entered_text.replace(/Ya/g,'Я');
    entered_text = entered_text.replace(/YA/g,'Я');

    entered_text = entered_text.replace(/Ye/g,'Е');
    entered_text = entered_text.replace(/YE/g,'Е');

    entered_text = entered_text.replace(/Ye/g,'Ё');
    entered_text = entered_text.replace(/YE/g,'Ё');

    entered_text = entered_text.replace(/yo/g,'ё');
    entered_text = entered_text.replace(/ye/g,'е');
    entered_text = entered_text.replace(/ya/g,'я');
    entered_text = entered_text.replace(/yu/g,'ю');
    
    entered_text = entered_text.replace(/iye/g,'ие');
    entered_text = entered_text.replace(/aye/g,'ае');
    entered_text = entered_text.replace(/o‘/g,'ў');
    entered_text = entered_text.replace(/g‘/g,'ғ');
    entered_text = entered_text.replace(/’/g,'ъ');
   
    entered_text = entered_text.replace(/^E/g,'Э');


    entered_text = entered_text.replace(/SH/g,'Ш');
    entered_text = entered_text.replace(/CH/g,'Ч');

    entered_text = entered_text.replace(/a/g,'а');
    entered_text = entered_text.replace(/b/g,'б');
    entered_text = entered_text.replace(/c/g,'с');
    entered_text = entered_text.replace(/d/g,'д');
    entered_text = entered_text.replace(/e/g,'е');
    entered_text = entered_text.replace(/f/g,'ф');
    entered_text = entered_text.replace(/g'/g,'ғ');
    entered_text = entered_text.replace(/g/g,'г');
    entered_text = entered_text.replace(/h/g,'ҳ');
    entered_text = entered_text.replace(/i/g,'и');
    entered_text = entered_text.replace(/j/g,'ж');
    entered_text = entered_text.replace(/k/g,'к');
    entered_text = entered_text.replace(/l/g,'л');
    entered_text = entered_text.replace(/m/g,'м');
    entered_text = entered_text.replace(/n/g,'н');
    entered_text = entered_text.replace(/o'/g,'ў');
    entered_text = entered_text.replace(/o/g,'о');
    entered_text = entered_text.replace(/p/g,'п');
    entered_text = entered_text.replace(/q/g,'қ');
    entered_text = entered_text.replace(/r/g,'р');
    entered_text = entered_text.replace(/s/g,'с');
    entered_text = entered_text.replace(/t/g,'т');
    entered_text = entered_text.replace(/u/g,'у');
    entered_text = entered_text.replace(/v/g,'в');
    entered_text = entered_text.replace(/z/g,'з');
    entered_text = entered_text.replace(/x/g,'х');
    entered_text = entered_text.replace(/y/g,'й');    


    entered_text = entered_text.replace(/A/g,'А');
    entered_text = entered_text.replace(/B/g,'Б');
    entered_text = entered_text.replace(/C/g,'С');
    entered_text = entered_text.replace(/D/g,'Д');
    entered_text = entered_text.replace(/E/g,'Е');
    entered_text = entered_text.replace(/F/g,'Ф');
    entered_text = entered_text.replace(/G'/g,'Ғ');
    entered_text = entered_text.replace(/G/g,'Г');
    entered_text = entered_text.replace(/H/g,'Ҳ');
    entered_text = entered_text.replace(/I/g,'И');
    entered_text = entered_text.replace(/J/g,'Ж');
    entered_text = entered_text.replace(/K/g,'К');
    entered_text = entered_text.replace(/L/g,'Л');
    entered_text = entered_text.replace(/M/g,'М');
    entered_text = entered_text.replace(/N/g,'Н');
    entered_text = entered_text.replace(/O'/g,'Ў');
    entered_text = entered_text.replace(/O‘/g,'Ў');
    entered_text = entered_text.replace(/O/g,'О');
    entered_text = entered_text.replace(/P/g,'П');
    entered_text = entered_text.replace(/Q/g,'Қ');
    entered_text = entered_text.replace(/R/g,'Р');
    entered_text = entered_text.replace(/S/g,'С');
    entered_text = entered_text.replace(/T/g,'Т');
    entered_text = entered_text.replace(/X/g,'Х');
    entered_text = entered_text.replace(/U/g,'У');
    entered_text = entered_text.replace(/V/g,'В');
    entered_text = entered_text.replace(/Z/g,'З');    
    entered_text = entered_text.replace(/Y/g,'Й');    
    return entered_text;
  }

  public static toEnglish(entered_text:string){
    entered_text = entered_text.replace(/x/g,'kh');
    entered_text = entered_text.replace(/o'/g,'u');
    entered_text = entered_text.replace(/o‘/g,'u');
    entered_text = entered_text.replace(/g'/g,'g');
    entered_text = entered_text.replace(/g‘/g,'g');
    entered_text = entered_text.replace(/ye/g,'e');
    entered_text = entered_text.replace(/yu/g,'u');
    entered_text = entered_text.replace(/yo/g,'a');
    entered_text = entered_text.replace(/q/g,'k');

    entered_text = entered_text.replace(/X/g,'Kh');
    entered_text = entered_text.replace(/O'/g,'U');
    entered_text = entered_text.replace(/O‘/g,'U');
    entered_text = entered_text.replace(/G'/g,'G');
    entered_text = entered_text.replace(/G‘/g,'G');
    entered_text = entered_text.replace(/Q/g,'K');
    return entered_text;
  }
}
