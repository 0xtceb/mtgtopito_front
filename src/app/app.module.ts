import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { LigueDetailComponent } from './ligue-detail/ligue-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptor } from './services/auth.interceptor';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { MatTableModule } from '@angular/material/table';
import { LoadimageDirective } from './loadimage.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterComponent } from './register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    LigueDetailComponent,
    LoginComponent,
    DeckListComponent,
    DeckDetailComponent,
    CardDetailComponent,
    LoadimageDirective,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    RecaptchaModule
  ],
  exports: [LoginComponent],
  entryComponents: [LoginComponent, RegisterComponent],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
