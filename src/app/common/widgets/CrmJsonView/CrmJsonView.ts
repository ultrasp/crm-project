import {Component, Inject, Input, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InjectorInstance} from "../../../app.module";
import {TranslateService} from "@ngx-translate/core";
import {CommonUtil} from "../../../_service/util/CommonUtil";
import {CrmRefType} from "../../enums/crm-ref-type.enum";


@Component({
  selector: 'crm-json-view',
  templateUrl: './CrmJsonView.html',
  styleUrls: ['CrmJsonView.css'],
})
export class CrmJsonView implements OnInit {

  @Input() data: any = {};

  constructor(private translate: TranslateService) {

  }

  ngOnInit(): void {
  }

  @Input() title: string = '';

  isObject(data: any) {
    return typeof data == 'object';
  }

  isArray(data: any) {
    return data instanceof Array;
  }

  String(key: unknown) {
    return String(key);
  }

  getTranslated(value: string) {
    let result = this.translateByRecursive(value, this.translate.translations[this.translate.currentLang]);
    if (result) {
      return result;
    } else {
      return value;
    }
  }

  translateByRecursive(word: string, translations: any) {
    let result: string = '';
    Object.entries(translations).forEach(
      ([key, value]) => {
        if (!result) {
          if (value instanceof Object) {
            result = this.translateByRecursive(word, value);
          } else {
            if (key.toLowerCase() == word.toLowerCase()) {
              result = <string>value;
            }
          }
        }
      }
    );
    return result;
  }

  getValue(key: string, value: string) {
    let result: string = '';
    switch (key) {
      case 'citizenship':
        result = CommonUtil.getReferenceByTypeId(Number(value), parseInt(CrmRefType.CITIZENSHIP))
        break;
    }
    if(!result) {
      result = value;
    }
    return result;
  }
}



