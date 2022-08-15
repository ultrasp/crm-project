import { AbstractControl, ValidatorFn } from '@angular/forms';
export default class mustMatchValidator {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      let control = controls.get(controlName);
      let checkControl = controls.get(checkControlName);
      if (checkControl && checkControl.errors && checkControl.errors['matching']) {
        return null;
      }
      if (control && checkControl && control.value !== checkControl.value) {
        control.setErrors({ matching: true });
        checkControl.setErrors({ matching: true });
        return { matching: true };
      } else {
        if(control?.value && checkControl?.value){
          control?.setErrors(null);
          checkControl?.setErrors(null);
        }
        return null;
      }
    };
  }
}
