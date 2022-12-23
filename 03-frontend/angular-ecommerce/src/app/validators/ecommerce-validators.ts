import { FormControl, ValidationErrors } from '@angular/forms';

export class EcommerceValidators {
  //whitespace validation
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      return { 'notOnlyWhiteSpace': true };
    } else {
      return null as any;
    }
  }
}
