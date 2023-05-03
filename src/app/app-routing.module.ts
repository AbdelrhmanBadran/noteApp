import { auth } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HomeComponent } from './components/home/home.component';
import { NoteDataComponent } from './components/note-data/note-data.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [

  {path:'' , component:BlankComponent , canActivate:[auth] , children:[
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'home' , component:HomeComponent , title:'home'},
    {path:'note' , component:NoteDataComponent , title:'note'}
  ]},
  {path:'' , component:AuthComponent , children:[
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'login' , component:LoginComponent , title:'login' },
    {path:'register' , component:RegisterComponent , title:'register'},
  ]},
  {path:'**' , component:NotFoundComponent , title:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
