import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NoteDataComponent } from './components/note-data/note-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FilterPipe } from './core/pipes/filter.pipe';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './core/loading.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NoteDataComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe,
    AuthComponent,
    BlankComponent,
    NotFoundComponent,

  ],
  imports: [
    MatToolbarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    SweetAlert2Module,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
    MatMenuModule,
    
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
