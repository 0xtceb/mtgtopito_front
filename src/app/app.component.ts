import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mtgtopito';

  user: User;

  constructor(public dialog: MatDialog,
              private userService: UserService,
              public router: Router) {}

  ngOnInit() {
    console.log(localStorage);
    if (localStorage.getItem("token")) {
      this.user = new User();
    }
  }

  openLogin(){
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((user:User) => this.user = user);
  }

  register():void {
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      data : {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((user:User) => this.user = user);
  }

  logout():void {
    this.userService.logout().subscribe(_ => this.user = null);
  }

  showDeckList():void{
    this.router.navigate(['decklist'])
  }
}
