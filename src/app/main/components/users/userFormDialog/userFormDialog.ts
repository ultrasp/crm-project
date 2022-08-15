import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {firstValueFrom} from 'rxjs';
import {IUserCollection} from 'src/app/main/models/user.entity';
import {COFService} from 'src/app/_service/COFService';
import {UserSave} from 'src/app/_shared/request/crm/UserSave';
import {User} from 'src/app/_shared/request/crm/User';
import {BaseForm} from 'src/app/common/base.form/base-form';
import {InjectorInstance} from 'src/app/app.module';
import mustMatchValidator from "../../../../common/validators/MustMatchValidator";
import {UserType} from "../../../../common/enums/user_type";
import {RequestClassKey} from "../../../../_shared/request/crm/RequestList";
import {Employee} from "../../../../_shared/request/crm/Employee";
import {CrmAutocompleteLoadList} from "../../../../common/widgets/CrmAutocompleteLoadList/CrmAutocompleteLoadList";
import { SessionInfoService } from '../../services/session-info.service';

@Component({
  selector: 'app-userFormDialog',
  templateUrl: './userFormDialog.html',
  styleUrls: ['./userFormDialog.css']
})
export class UserFormDialog extends BaseForm implements OnInit {

  constructor(
    public dialogRef: MatDialogRef < UserFormDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    override cof: COFService,
    public session:SessionInfoService
  ) {
    super(cof);
    this.dialogTitle = data.isLoginForm ? 'USER.CHANGE_PASSWORD' : 'USER.AddTitle';
  }

  ngOnInit() {
    console.log(this.isInterNal(),'this.isInterNal()');
    if(this.isInterNal()) {
      this.form.addControl('employee_id',  new FormControl(null, [Validators.required]))
    }
    if(this.isExternal()) {
      this.form.addControl('emp',  new FormControl(null, [Validators.required]))
    }
    if(this.data.isLoginForm){
      this.data.id = this.session.getSesionInfo().data?.user_info.id + '';
    }
    if (this.data.id) {
      this.getUserData();
    }
  }

  saveRequest:any = new UserSave();
  getRequest = new User();
  dialogTitle:string = '';
  override form: FormGroup = new FormGroup({
    branchId: new FormControl(null,[
      Validators.required]),
    login: new FormControl(null,[
      Validators.required]),
    roleId:new FormControl(null,[
      Validators.required]),
    password: new FormControl(null,[
      Validators.required]),
    passwordRepeat: new FormControl(null,[
      Validators.required]),
  }, {
    validators: mustMatchValidator.match('password', 'passwordRepeat'),
  });

  public modelReferenceKey: RequestClassKey = RequestClassKey.EMPLOYEE;

  setEmployeeParams = (modelRequest: Employee): void => {
    return;
  }

  @ViewChild('employees') employees!: CrmAutocompleteLoadList;

  getUserData() {
    this.getRequest.setId(this.data.id);
    this.getRequest.setCount(1);
    firstValueFrom(this.cof.doRequest(this.getRequest)).then(result => {
      if (result && !!result) {
        let userResponce = < IUserCollection > result;
        if (userResponce.data.length > 0) {
          let user = userResponce.data[0];
          if(user.employee_id) {
            this.form.addControl('employee_id',  new FormControl(null, [Validators.required]));
            this.form.removeControl('emp');
            this.data.type = UserType.INTERNAL;
          }
          this.form.patchValue({
            branchId: user.branch_id,
            emp: user.name,
            login: user.username,
            employee_id: user.employee_id,
            password: user.password,
            passwordRepeat: user.password,
            roleId:user.role_id
          });
        }
      }
    });
  }

  isInterNal() {
    return this.data.type == UserType.INTERNAL;
  }

  isExternal() {
    return this.data.type == UserType.EXTERNAL;
  }

  isValid() {
    return this.form.valid;
  }

  prepareRequest(): any {
    this.saveRequest.setBranchId(this.form.get('branchId')?.value);
    this.saveRequest.setEmployeeId(this.form.get('employee_id')?.value);
    this.saveRequest.setUsername(this.form.get('login')?.value);
    if(this.isInterNal()) {
      this.saveRequest.setName(this.employees.getText(this.employees.value));
    }
    else {
      this.saveRequest.setName(this.form.get('emp')?.value)
    }
    this.saveRequest.setPassword(this.form.get('password')?.value)
    this.saveRequest.setRoleId(this.form.get('roleId')?.value);
    this.saveRequest.setFlag('0');
    if (this.data.id){
      this.saveRequest.setId(this.data.id);
    }

    return this.saveRequest;
  }

  save() {
    this.saveProcess();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override afterSave(){
    this.form.reset();
    this.close(true);
  }

  close(isSaved:boolean = false){
    this.dialogRef.close(isSaved);
  }

  public static openDialog( id?: string, type: UserType = UserType.EXTERNAL) {
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    const dialogRef = dialog.open(UserFormDialog, {
      width: '700px',
      data: {
        id: id,
        type: type,
        isLoginForm: false
      },
    });

    return dialogRef.afterClosed();

  }

  public static openLogin(){
    const dialog: MatDialog = InjectorInstance.get(MatDialog);
    
    const dialogRef = dialog.open(UserFormDialog, {
      width: '700px',
      data: {
        type: UserType.INTERNAL,
        isLoginForm:true
      },
    });
    return dialogRef.afterClosed();
  }

  closeModal(): void{
    this.dialogRef.close()
  }

}

export interface UserDialogData {
  id: string;
  type: UserType;
  isLoginForm:boolean;
}
