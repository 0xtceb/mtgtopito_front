import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';


export function matchPasswordValidator(password: FormControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const match = password.value == control.value;
    return match ?  null : {'matchPassword': {value: control.value}};
  };
}

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && control.value.match(/\s/g, '')) {
    control.setValue(control.value.replace(/\s/g, ''));
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nickFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    removeSpaces
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    removeSpaces
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    removeSpaces,
  ]);

  confirmFormControl = new FormControl({value:'', disabled:true}, [
    Validators.required,
    matchPasswordValidator(this.passwordFormControl),
    removeSpaces,
  ]);

  recaptcha: string = '';

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Object,
              private userService: UserService) {

  }

  ngOnInit() {

  }

  register() {
      if (this.emailFormControl.valid && this.passwordFormControl.valid &&
          this.confirmFormControl.valid && this.nickFormControl.valid &&
          this.recaptcha != '') {

            this.userService.register(this.nickFormControl.value,
                                      this.emailFormControl.value,
                                      this.passwordFormControl.value,
                                      this.recaptcha)
                                      .subscribe(
                                        user => {
                                          this.dialogRef.close({user: user});
                                        });
      }
  }

  enableConfirm() {
    if (this.passwordFormControl.valid) {
      this.confirmFormControl.enable();
    } else {
      this.confirmFormControl.disable();
    }
  }

  close() {
    this.dialogRef.close();
  }

  resolved(event:any) {
    this.recaptcha = event;
  }

}
