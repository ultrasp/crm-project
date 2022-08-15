import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  filter,
  firstValueFrom,
  map,
  tap
} from 'rxjs';
import {
  CrmRefType
} from 'src/app/common/enums/crm-ref-type.enum';
import { IResponceList, LoadListSrvice } from 'src/app/common/services/LoadListSrvice';
import {
  AlertDialog
} from 'src/app/common/widgets/AlertDialog/AlertDialog';
import { ISelectOption } from 'src/app/common/widgets/CrmSelect/CrmSelect';
import {
  IReferenceCollection
} from 'src/app/main/models/reference.entity';
import {
  IUserInfo
} from 'src/app/main/models/session-info.entity';
import {
  COFService
} from 'src/app/_service/COFService';
import {
  Reference
} from 'src/app/_shared/request/crm/Reference';
import {
  ReferenceSave
} from 'src/app/_shared/request/crm/ReferenceSave';
import {
  RefTree
} from 'src/app/_shared/request/crm/RefTree';
import { RefTreeSave } from 'src/app/_shared/request/crm/RefTreeSave';
import {
  RefType
} from 'src/app/_shared/request/crm/RefType';
import {
  RequestClassKey
} from 'src/app/_shared/request/crm/RequestList';
import {
  SessionInfoService
} from '../../services/session-info.service';
import {IReferenceSaveCollection} from "../../../models/reference-save.entity";

@Component({
  selector: 'app-refFormDialog',
  templateUrl: './refFormDialog.html',
  styleUrls: ['./refFormDialog.css']
})
export class RefenceFormDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef < RefenceFormDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: RefDialogData,
    private cof: COFService,
    private dialog: MatDialog,
  ) {
    if(this.data.showKeyAndOrder) {
      this.showKeyAndOrder = true;
    }
    this.isTree = this.data.refRype.category_id == RefTreeTypeCategory.TREE;
    if (this.isTree){
      this.form.addControl('parent_key', new FormControl());
      this.loadTreeOptions();
    }
  }

  ngOnInit() {
    if (this.data.reference) {
      this.fillData(this.data.reference);
    }
  }

  async loadTreeOptions(){
    let searchRequest = new RefTree();
    searchRequest.setCount(9999);
    searchRequest.setTypeId(this.data.refRype.key);
    this.cof.doRequest(searchRequest).pipe(
      filter(result => result && !!result),
      map((result: any) => {
        return result.data.filter( (v:any) => v.parent_key == 0).map((item: IResponceList) => < ISelectOption > {
          key: (<any>item).key,
          title: item.name
        })
      }),
      tap( (result: ISelectOption[]) =>this.treeParentOptions = result )
    ).subscribe();

  }

  isTree: boolean = false;
  showKeyAndOrder: boolean = false;
  referenceKey: string = RequestClassKey.REF_TREE;
  treeParentOptions:ISelectOption[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]),
    key: new FormControl(),
    order: new FormControl(),
  });
  showErrors: boolean = false;

  fillData(ref:Reference | RefTree) {
    let request = this.isTree ? new RefTree(): new Reference();
    if(this.isTree){
      request.setKey(ref.key);
    }else{
      request.setId(ref.id);
    }
    request.setCount(1);
    firstValueFrom(this.cof.doRequest(request)).then(result => {
      if (result && !!result) {
        let refResponce = < IReferenceCollection > result;
        if (refResponce.data.length > 0) {
          let reference = refResponce.data[0];
          this.form.patchValue({
            name: reference.name,
            key: reference.key,
            order: reference.order
          });
          if(this.isTree){
            this.form.patchValue({
              parent_key: (<any>reference).parent_key
            })
          }
        }
      }
    });
  }

  isValid() {
    return this.form.valid;
  }


  saveData() {
    if (!this.isValid()) {
      this.showErrors = true;
      return;
    }
    let request = this.isTree ? new RefTreeSave() :new ReferenceSave();
    request.setKey(this.form.get('key')?.value);
    request.setName(this.form.get('name')?.value);
    request.setTypeId(this.data.refRype.id);
    if (this.data.reference) {
      request.setId(this.data.reference.id);
    }
    if(this.isTree){
      (<RefTreeSave>request).parent_key = this.form.get('parent_key')?.value;
    }

    request.setOrder(this.form.get('order')?.value);
    firstValueFrom(this.cof.doRequest(request)).then(result => {
      let data = <IReferenceSaveCollection> result;
      this.dialogRef.close(data.data.key);
    }).catch(err => {
      AlertDialog.open(this.dialog, 'ERROR', err.error.error);
    })
  }



  close(isSaved: boolean = false) {
    this.dialogRef.close(isSaved);
  }

  public static openDialog(dialog: MatDialog, refRype: RefType, reference ? : Reference | RefTree | null, showKeyAndOrder: boolean = true): MatDialogRef < RefenceFormDialog > {
    const dialogRef = dialog.open(RefenceFormDialog, {
      width: '500px',
      data: {
        reference: reference,
        refRype: refRype,
        showKeyAndOrder: showKeyAndOrder,
      },
    });

    return dialogRef;

  }
}

export interface RefDialogData {
  reference : Reference | RefTree | null
  refRype: RefType,
  showKeyAndOrder: boolean,
}

export enum RefTreeTypeCategory {
  STANDART = '1',
    TREE = '2'
}
