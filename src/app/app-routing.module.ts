import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExportComponent } from './pages/export/export.component';
import { UsersComponent } from './pages/users/users.component';
import { IncidentesComponent } from './pages/incidentes/incidentes.component';
import { ResueltosComponent } from './pages/incidentes/resueltos/resueltos.component';
import { EnProgresoComponent } from './pages/incidentes/en-progreso/en-progreso.component';
import { PendientesComponent } from './pages/incidentes/pendientes/pendientes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'usuarios', component: UsersComponent },
  {
    path: 'incidentes', component: IncidentesComponent,
    children: [
      {
        path: 'resueltos',
        component: ResueltosComponent
      },
      {
        path: 'enProgreso',
        component: EnProgresoComponent
      },
      {
        path: 'pendientes',
        component: PendientesComponent
      }
    ]
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
