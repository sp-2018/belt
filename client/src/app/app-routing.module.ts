// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { Edit2Component } from './edit2/edit2.component';
import { ShowComponent } from './show/show.component';
//import { WriteQuoteComponent } from './write-quote/write-quote.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '',component: ListComponent },
  { path: 'new',component: AddComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: 'edit2/:id',component: Edit2Component },
  { path: 'details/:id',component: ShowComponent },
  //{ path: 'write/:id',component: WriteQuoteComponent },
  // use a colon and parameter name to include a parameter in the url
 // { path: 'gamma/:id', component: GammaComponent },
  { path: '', pathMatch: 'full', redirectTo: '/list' },
 // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
