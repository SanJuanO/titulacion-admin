import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { LoginComponent } from './login/login.component';
import { AlumnosAddComponent } from './alumnos/alumnos-add/alumnos-add.component';
import { AlumnosEditComponent } from './alumnos/alumnos-edit/alumnos-edit.component';
import { MenuComponent } from './menu/menu.component';
import { FacultadesComponent } from './facultades/facultades-home.component';
import { FacultadesAddComponent } from './facultades/facultades-add/facultades-add.component';
import { FacultadesVerComponent } from './facultades/facultades-ver/facultades-ver.component';
import { FacultadesEditComponent } from './facultades/facultades-edit/facultades-edit.component';
import { CarrerasComponent } from './carreras/carreras-home.component';
import { CarrerasAddComponent } from './carreras/carreras-add/carreras-add.component';
import { CarrerasVerComponent } from './carreras/carreras-ver/carreras-ver.component';
import { CarrerasEditComponent } from './carreras/carreras-edit/carreras-edit.component';
import { PlanesComponent } from './planes/planes-table.component';



import { AdministracionComponent } from './administracion/administracion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add/usuarios-add.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';
import { AlumnosverComponent } from './alumnos/alumnos-ver/alumnos-ver.component';
import { AlumnosverproyectoComponent } from './alumnos/alumnos-verproyecto/alumnos-verproyecto.component';
import { CookieService } from 'ngx-cookie-service';
import { DatatableComponent } from './components/datatable/datatable.component';

import { RecaptchaModule } from "ng-recaptcha";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { ConvocatoriasCAddComponent } from './convocatorias/convocatorias-add/convocatorias-add.component';
import { ConvocatoriasCEditComponent } from './convocatorias/convocatorias-edit/convocatorias-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    AlumnosverComponent,
    AlumnosverproyectoComponent,
    LoginComponent,
    AlumnosAddComponent,
    AlumnosEditComponent,
    MenuComponent,
    FacultadesComponent,
    FacultadesAddComponent,
    FacultadesVerComponent,
    FacultadesEditComponent,
    CarrerasComponent,
    CarrerasAddComponent,
    CarrerasVerComponent,
    CarrerasEditComponent,
    PlanesComponent,


    PerfilComponent,
    AdministracionComponent,
    DashboardComponent,
    UsuariosComponent,
    UsuariosAddComponent,
    UsuariosEditComponent,
    DatatableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    DataTablesModule,
    RecaptchaModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    ChartsModule,
  ],
  providers: [CookieService,MatDatepickerModule,MatNativeDateModule,NgxMaterialTimepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
