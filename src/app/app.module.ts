import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ExportComponent } from './pages/export/export.component';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { UsersComponent } from './pages/users/users.component';
import { LoaderComponent } from './components/loader/loader.component';
import { IncidentesComponent } from './pages/incidentes/incidentes.component';
import { ResueltosComponent } from './pages/incidentes/resueltos/resueltos.component';
import { EnProgresoComponent } from './pages/incidentes/en-progreso/en-progreso.component';
import { PendientesComponent } from './pages/incidentes/pendientes/pendientes.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExportComponent,
    UsersComponent,
    LoaderComponent,
    IncidentesComponent,
    ResueltosComponent,
    EnProgresoComponent,
    PendientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClJ7Kp2bWz-oQdEuT4drJ_Uj3ft3xMYhk'
    }),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
