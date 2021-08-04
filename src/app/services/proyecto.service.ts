import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto, estadoProyectoActualizar } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  api = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAll(idPeriodo,idCampus) {
    return this.http.get(`${this.api}/Proyectos/GetAll?idPeriodo=${idPeriodo}&idCampus=${idCampus}`);
  }
  getProyecto(id: string | number) {
    const uri = `${this.api}/Proyectos/${id}`;
    console.log(uri);
    return this.http.get(uri);
  }
  getUniversidades() {
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri);
  }
  getEstadosProyectos() {
    const uri = `${this.api}/EstadosProyectos
    `;
    return this.http.get(uri);
  }
  getProyectosAreas() {
    const uri = `${this.api}/ProyectosAreas
    `;
    return this.http.get(uri);
  }
  getProyectosRangos() {
    const uri = `${this.api}/ProyectosRangos
    `;
    return this.http.get(uri);
  }
  getProyectosPoblaciones() {
    const uri = `${this.api}/ProyectosPoblaciones
    `;
    return this.http.get(uri);
  }
  getPeriodos() {
    const uri = `${this.api}/Periodos
    `;
    return this.http.get(uri);
  }
  getLineasTrabajo() {
    const uri = `${this.api}/LineasTrabajo
    `;
    return this.http.get(uri);
  }
  getApoyos() {
    const uri = `${this.api}/Apoyos
    `;
    return this.http.get(uri);
  }

  getCompetencias() {
    const uri = `${this.api}/Competencias`;
    return this.http.get(uri);
  }

  getCarreras() {
    const uri = `${this.api}/Carreras`;
    return this.http.get(uri);
  }

  getODS() {
    const uri = `${this.api}/ODS`;
    return this.http.get(uri);
  }

  create(model) {
    const uri = `${this.api}/Proyectos`
    return this.http.post(uri, model);
  }
  updateproyecto(id: string | number, proyecto: Proyecto) {
    proyecto.id = Number(id);
    proyecto.activo = true;
    return this.http.put(`${this.api}/Proyectos/${id}`, proyecto);
  }
  eliminar(id: string | number) {
    const uri = `${this.api}/Proyectos/${id}`;
    return this.http.delete(uri);
  }
  updateestado(estadoAct: estadoProyectoActualizar) {
    let estado = estadoAct;
    if(estado.observaciones=="null" || estado.observaciones==null){
estado.observaciones="";
    }
    console.log(estado);
    return this.http.put(`${this.api}/Proyectos/actualizaEstado?idProyecto=${estado.idProyecto}&idEstado=${estado.idEstado}&observaciones=${estado.observaciones}`, estado);
  }
  getSucesosByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/ProyectosSucesos/getByIdProyecto?idProyecto=${idProyecto}`);
  }
  getActividadesByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/ProyectosActividades/getByIdProyecto?idProyecto=${idProyecto}`);
  }
  getAlumnosInscritosByIdProyecto(idProyecto: string | number) {
    return this.http.get(`${this.api}/AlumnosProyectosAsignados/getByIdProyecto?idProyecto=${idProyecto}`);
  }

  updateHorasACuplirEnProyectoAlumno(idAlumno: string | number, idProyecto: string | number, horas: string | number) {
    return this.http.put(`${this.api}/AlumnosProyectosAsignados/actualizaNoHorasACumplirAlumnoByIdProyectoAndIdAlumno?idAlumno=${idAlumno}&idProyecto=${idProyecto}&horas=${horas}`, { withCredentials: false });
  }
  getPerfilesActividades() {
    const uri = `${this.api}/PerfilesActividades
    `;
    return this.http.get(uri);
  }
  createProyectosActividades(model) {
    const uri = `${this.api}/ProyectosActividades`
    return this.http.post(uri, model);
  }
  obtenerAlumnos() {
    const uri = `${this.api}/Alumnos`
    return this.http.get(uri);
  }
  asignarAlumnosProyectos(model) {
    const uri = `${this.api}/AlumnosProyectosAsignados`
    return this.http.post(uri, model);
  }
  cambiar(id,plazas) {
    const uri = `${this.api}/Proyectos/actualizaNoPlazasAutorizadas?idProyecto=${id}&noPlazas=${plazas}`
    return this.http.put(uri,id);
  }

  getProyectosByIdOrganizacion(idOrganizacion, idPeriodo) {
    const uri = `${this.api}/Proyectos/GetByIdOrganizacion?idOrganizacion=${idOrganizacion}&idPeriodo=${idPeriodo}`;
    console.log(uri);
    return this.http.get(uri);
  } 
}
