import { Injectable } from "@angular/core";
import { CrmAlertDialog } from "src/app/common/widgets/CrmAlertDialog/CrmAlertDialog";
import { CrmAlertDialogTypeError } from "../common/enums/crm-alert-dialog.enum";
@Injectable()
export class NotificationService { 

  public show(message:string, type:CrmAlertDialogTypeError) {
    CrmAlertDialog.show(message,type);
  }
}
