import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExportComponent } from './pages/export/export.component';
import { UsersComponent } from './pages/users/users.component';
import { IncidentesComponent } from './pages/incidentes/incidentes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'usuarios', component: UsersComponent },
  {
    path: 'incidentes', component: IncidentesComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
