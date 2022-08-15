import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function certificateFlagCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let num = parseInt(control.value);
    return typeof num  == 'number' && num > 0 ?  null : {num: {value: control.value}} ;
  };
}
