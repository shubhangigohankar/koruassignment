import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { TableComponent } from './table/table.component';
import {AlertserviceService} from './alertservice.service' ;

const routes: Routes = [
  {path: 'table', component: TableComponent},
  {path: 'add-details/:id', component: AddDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
