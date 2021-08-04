import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empresa, estadoActualizar,createwhitimage } from '../models/empresa';
import { Estadosalumnoscambio } from '../models/estadosalumnoss';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  api = environment.baseUrl


  constructor(private http: HttpClient) { }

  getAll(idCampus) {
    return this.http.get(`${this.api}/Organizaciones/GetAll?idCampus=${idCampus}`);
  }
  getOrganizacion(id: string | number) {
    const uri = `${this.api}/Organizaciones/${id}`;
    console.log(uri);
    return this.http.get(uri);
  }
  getestadosalumnos() {
    const uri = `${this.api}/EstadosAlumnosProyectos`;
    console.log(uri);
    return this.http.get(uri);
  }

  obtenerdirecciones(cp) {
    const uri = `${this.api}/VSepomex/GetFromCp?cp=${cp}`
    return this.http.post(uri, cp, { withCredentials: false });
  }
  getcordinaciones() {
    const uri = `${this.api}/Cordinaciones`;
    return this.http.get(uri);
  }
  getescueladireccion() {
    const uri = `${this.api}/Direcciones`;
    return this.http.get(uri);
  }
  getvice() {
    const uri = `${this.api}/Vicerrectorias`;
    return this.http.get(uri);
  }

  getAreas() {
    const uri = `${this.api}/AreasAccion`;
    return this.http.get(uri);
  }
  getdocumentos() {
    const uri = `${this.api}/Documentos`;
    return this.http.get(uri);
  }

  getRubros() {
    const uri = `${this.api}/Rubros`;
    return this.http.get(uri);
  }
  getUniversidades() {
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri);
  }
  getTipo() {
    const uri = `${this.api}/TiposOrganizaciones`;
    return this.http.get(uri);
  }

  getGiro() {
    const uri = `${this.api}/GirosOrganizaciones`;
    return this.http.get(uri);
  }
  getClasificacion() {
    const uri = `${this.api}/ClasificacionesOrganizaciones`;
    return this.http.get(uri);
  }
  getEstado() {
    const uri = `${this.api}/EstadosOrganizaciones
    `;
    return this.http.get(uri);
  }
  eliminar(id: string | number) {
    const uri = `${this.api}/Organizaciones/${id}`;
    return this.http.delete(uri);
  }

  obtenerDocumentosSubidos(id: string | number) {
    const uri = `${this.api}/DocumentosOrganizaciones/getDocumentoByIdOrganizacion?idOrganizacion=${id}`
    return this.http.get(uri);
  }
  obtenerDocumentosSubidosConRequeridos(id) {
    console.log(id);
    var i = Number(id);
    const uri = `${this.api}/DocumentosOrganizaciones/getDocumentoByIdOrganizacionWithRequeridos?idOrganizacion=${i}`
    return this.http.post(uri, null);
  }
  subirdocumentos(model) {
    const uri = `${this.api}/DocumentosOrganizaciones/UploadFile`
    return this.http.post(uri, model, { withCredentials: false });
  }

  subirdocumentoscadena(model) {
    const uri = `${this.api}/DocumentosOrganizaciones/saveDocuments`
    return this.http.post(uri, model);
  }


  create(model) {
    const uri = `${this.api}/Organizaciones/CreateWithImage`
    return this.http.post(uri, model);
  }
  createWithDetails(model) {
    const uri = `${this.api}/CreateWithDetails`
    return this.http.post(uri, model);
  }
  updateempresa(id: string | number, empresa: Empresa) {
    empresa.id = Number(id);
    empresa.activo = true;
    return this.http.post(`${this.api}/Organizaciones/UpdateWithImage`, empresa);
  }
  updateestado(estadoAct: estadoActualizar) {
    let estado = estadoAct;
    console.log(estado);


    return this.http.put(`${this.api}/Organizaciones/actualizaEstado?idOrganizacion=${estado.idOrganizacion}&idEstado=${estado.idEstado}&observaciones=${estado.observaciones}`, estado);
  }

  updateestadoalumno(estadoAct: Estadosalumnoscambio) {
    let estado = estadoAct;
    console.log(estado);
    console.log(`${this.api}/AlumnosProyectosAsignados/actualizaEstado?idProyecto=${estadoAct.idProyecto}&idAlumno=${estadoAct.idAlumno}&idEstado=${estadoAct.idEstado}&observaciones=${estadoAct.observaciones}`);
    return this.http.put(`${this.api}/AlumnosProyectosAsignados/actualizaEstado?idProyecto=${estadoAct.idProyecto}&idAlumno=${estadoAct.idAlumno}&idEstado=${estadoAct.idEstado}&observaciones=${estadoAct.observaciones}`, estado);
  }

  getSucesosByIdOrganizacion(idOrganizacion: string | number) {
    return this.http.get(`${this.api}/OrganizacionesSucesos/getByIdOrganizacion?idOrganizacion=${idOrganizacion}`);
  }

  postFile(fileToUpload: File, idDocumento: string, idOrganizacion: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.api}/DocumentosOrganizaciones/UploadFile2`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('idDocumento', idDocumento);
    formData.append('idOrganizacion', idOrganizacion);
    return this.http.post(endpoint, formData);
  }
  postFileImage(fileToUpload: File, idOrganizacion: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.api}/DocumentosOrganizaciones/UploadImagen`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
  getempresapermiso(idCampus) {
    const uri = `${this.api}/Organizaciones/getOrganizacionesWithPermisoEditar?idCampus=${idCampus}`;
    return this.http.get(uri);
  }
  cambiarestado(id: string) {
    var idd = Number(id);
    const uri = (`${this.api}/Organizaciones/concederPermisoEditar?idOrganizacion=${idd}`);
    return this.http.post(uri, idd);
  }

  getestadodocumento() {
    const uri = `${this.api}/EstadosDocumentos`;
    console.log(uri);
    return this.http.get(uri);
  }

  updateestadodcoc(ido, idd, ide, id) {
    const uri = (`${this.api}/DocumentosOrganizaciones/updateStatusDocument?IdOrganizacion=${ido}&IdDocumento=${idd}&IdEstado=${ide}&Id=${id}&Activo=${true}`);

    return this.http.post(uri, ido);
  }

  enviarcorreo(id) {
    const uri = (`${this.api}/DocumentosOrganizaciones/sendEmailValid?id=${id}`);
    return this.http.post(uri, id);
  }

  getvacantes(idPeriodo, idCampus) {
    const uri = `${this.api}/Proyectos/obtenerDisponiblesCarrerasProyectos?idPeriodo=${idPeriodo}&idCampus=${idCampus}`;
    return this.http.post(uri, "1");
  }

  actualizarfechaalumno(fecha, id) {

    const uri = `${this.api}/AlumnosProyectosAsignados/actualizaFechaInicioInstitucionByIdAlumnoProyectoAsignado?idAlumnoProyectoAsignado=${id}&fecha=${fecha}`
    return this.http.post(uri, fecha);
  }


}
