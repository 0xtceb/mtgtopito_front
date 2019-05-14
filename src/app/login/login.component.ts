import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Object,
              private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    if(this.emailFormControl.valid && this.passwordFormControl.valid) {
      this.userService.login(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe(_ => {
        this.userService.getCurrentUser().subscribe(res => {
          this.user = res;
          this.dialogRef.close({user: this.user});
        })
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
