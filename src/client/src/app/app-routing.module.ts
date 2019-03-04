import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from './views/users/users.component';
import { AddEditUserComponent } from './views/users/add-edit-user/add-edit-user.component';
import { DeleteComponent } from './views/users/delete-user/delete-user.component';
import { DocumentsComponent } from './views/documents/documents.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'users',
    children: [
      {path: '', component: UsersComponent},
      {path: 'register', component: AddEditUserComponent, data: {action: 'register'}},
      {path: 'edit/:id', component: AddEditUserComponent, data: {action: 'edit'}},
      {path: 'delete/:id', component: DeleteComponent}
    ]
  },
  {path: 'new', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
     HttpClientModule
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  DocumentsComponent,
  LoginComponent,
  AddEditUserComponent,
  DeleteComponent,
  UsersComponent,
  HomeComponent
];
