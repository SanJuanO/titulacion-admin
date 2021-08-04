
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosAddComponent } from './alumnos/alumnos-add/alumnos-add.component';
import { AlumnosEditComponent } from './alumnos/alumnos-edit/alumnos-edit.component';
import { AlumnosverComponent } from './alumnos/alumnos-ver/alumnos-ver.component';
import { FacultadesComponent } from './facultades/facultades-home.component';
import { FacultadesAddComponent } from './facultades/facultades-add/facultades-add.component';
import { FacultadesVerComponent } from './facultades/facultades-ver/facultades-ver.component';
import { FacultadesEditComponent } from './facultades/facultades-edit/facultades-edit.component';
import { CarrerasComponent } from './carreras/carreras-home.component';
import { CarrerasAddComponent } from './carreras/carreras-add/carreras-add.component';
import { CarrerasVerComponent } from './carreras/carreras-ver/carreras-ver.component';
import { CarrerasEditComponent } from './carreras/carreras-edit/carreras-edit.component';


import { AdministracionComponent } from './administracion/administracion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add/usuarios-add.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';
import { AlumnosverproyectoComponent } from './alumnos/alumnos-verproyecto/alumnos-verproyecto.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
{ path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'alumnos',component:AlumnosComponent},
  {path:'alumnos/add',component:AlumnosAddComponent},
  { path: 'alumnos/edit/:id', component: AlumnosEditComponent },
  { path: 'alumnos/ver/:id', component: AlumnosverComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/add', component: UsuariosAddComponent },
  { path: 'usuarios/edit/:id', component: UsuariosEditComponent },
  { path: 'facultades', component: FacultadesComponent },
  { path: 'facultades/add', component: FacultadesAddComponent },
  { path: 'facultades/ver/:id', component: FacultadesVerComponent },
  { path: 'facultades/edit/:id', component: FacultadesEditComponent },
  { path: 'carreras', component: CarrerasComponent },
  { path: 'carreras/add', component: CarrerasAddComponent },
  { path: 'carreras/ver/:id', component: CarrerasVerComponent },
  { path: 'carreras/edit/:id', component: CarrerasEditComponent },


  { path:'perfil',component:PerfilComponent},
  {path:'administracion',component:AdministracionComponent},
  { path: 'alumnos/verproyecto/:id/:iduser', component:AlumnosverproyectoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

