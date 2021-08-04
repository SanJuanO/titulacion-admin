import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getAlumnos() {

  // getAlumnos(dataTablesParameters: any) {
    return this.http.get(`${this.baseUrl}/Alumnos`);

    //  return this.http
    //       .get<DataTablesResponse>(
    //         `${this.baseUrl}/Alumnos/getAllTabla`,
    //         dataTablesParameters
    //       );

  }

  getAlumnosFiltros(id_facultad: string | number, id_carrera: string | number, id_plan: string | number) {
    return this.http.post(`${this.baseUrl}/Alumnos/GetAlumnosByFiltros`, { id_facultad: id_facultad,id_carrera:id_carrera,id_plan:id_plan });
  }



  getAlumno(id: string | number) {
    return this.http.get(`${this.baseUrl}/Alumnos/${id}`);
  }
  getProyectoAlumno(id: string | number) {
    let idalumno=Number(id);
    console.log(idalumno);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignados/getByIdAlumno?idAlumno=${idalumno}`);
  }
  addAlumno(alumno: Alumno) {

    return this.http.post(`${this.baseUrl}/Alumnos`, alumno);
  }

  deleteAlumno(id) {
    return this.http.delete(`${this.baseUrl}/Alumnos/${id}`);
  }

  updateAlumno(id: string | number,alumno: Alumno) {
    alumno.id = Number(id);
    alumno.activo = true;
    return this.http.put(`${this.baseUrl}/Alumnos/${id}`, alumno);
  }
  getdocumentosRequeridos() {
    const uri = `${this.baseUrl}/DocumentosRequeridosAlumnos`;
    return this.http.get(uri);
  }

  subirdocumentos(model) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/UploadFile`
    return this.http.post(uri, model);
  }

  subirdocumentoscadena(model) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/saveDocuments`
    return this.http.post(uri, model);
  }

  postFileAlumno(fileToUpload: File, idDocumento: string, idAlumno: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.baseUrl}/DocumentosAlumnos/UploadFileAlumno`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('idDocumento', idDocumento);
    formData.append('idAlumno', idAlumno);
    return this.http.post(endpoint, formData);
  }

  obtenerDocumentosSubidosConRequeridos(id: string | number) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/getDocumentoByIdAlumnoWithRequeridos?idAlumno=${id}`
    return this.http.get(uri);
  }


  postFileAlumnosExcel(fileToUpload: File, OpcionEvento: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.baseUrl}/Alumnos/leerArchivo`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('opcion', OpcionEvento);
    return this.http.post(endpoint, formData);

  }
  getRespuestasEvaluacion(id: string | number, version: string | number) {
    return this.http.get(`${this.baseUrl}/RespuestasEvaluacionAlumnoOrganizacion/getByIdAlumnoProyectoAsignadoAndVersion?IdAlumnoProyectoAsignado=${id}&version=${version}`);
  }

  subeCarta(fileToUpload: File, idAlumnoProyectoAsignado: string, opc: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    var endpoint = "";
    if (opc == 0) {
      endpoint = `${this.baseUrl}/AlumnosProyectosAsignados/actualizaCartaInicioByIdAlumnoProyectoAsignado`;
    } else {
      endpoint = `${this.baseUrl}/AlumnosProyectosAsignados/actualizaCartaTerminoByIdAlumnoProyectoAsignado`;
    }
    const formData: FormData = new FormData();
    if (opc == 0) {
      formData.append('cartaInicio', fileToUpload, fileToUpload.name);
    } else {
      formData.append('cartaTermino', fileToUpload, fileToUpload.name);
    }
    formData.append('idAlumnoProyectoAsignado', idAlumnoProyectoAsignado);
    return this.http.post(endpoint, formData);
  }
  getAlumnoRequisitosLiberacion(id: string | number) {
    return this.http.post(`${this.baseUrl}/Alumnos/requisitosLiberacion?idAlumno=${id}`,id);
  }

  updateLiberar(id: string | number, liberar: string | number) {
    return this.http.put(`${this.baseUrl}/Alumnos/actualizaLiberar?id=${id}&liberar=${liberar}`, { withCredentials: false });
  }

  actualizaEstadoCarta(idAlumnoProyectoAsignado: number, idEstado: number, opc: number): Observable<any> {
    var endpoint = `${this.baseUrl}/AlumnosProyectosAsignados/actualizaEstadoCarta?idAlumnoProyectoAsignado=${idAlumnoProyectoAsignado}&idEstado=${idEstado}&opc=${opc}`;
    var model = {
      idAlumnoProyectoAsignado: idAlumnoProyectoAsignado,
      idEstado: idEstado,
      opc:opc
    }
    return this.http.put(endpoint, model);
  }
  getEstadosDocumentosAlumnos() {
    return this.http.get(`${this.baseUrl}/EstadosDocumentosAlumnos`);
  }
  horas(id) {

    var i = Number(id);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignadosHoras/getHorasByIdProyectoAsignado?idAlumnoProyectoAsignado=${i}`);

  }

  getAlumnoProyectoAsignadoById(id: string | number) {
    let idalumno = Number(id);
    //console.log(idalumno);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignados/${idalumno}`, { withCredentials: false });
  }

  getPreguntasEvaluacionAlumnoOrganizacion(idAlumnoProyectoAsignado: string | number, configuracion: string | number) {
    return this.http.get(`${this.baseUrl}/PreguntasEvaluacionAlumnoOrganizacion/GetListWithIdAlumnoProyectoAsignadoAndAnswers?idAlumnoProyectoAsignado=${idAlumnoProyectoAsignado}&configuracion=${configuracion}`);
  }

  addRespuestasPreguntas(model) {
    const uri = `${this.baseUrl}/RespuestasEvaluacionAlumnoOrganizacion/addRespuestas`;
    console.log(uri);
    return this.http.post(uri, model);
  }
  updateHorasACuplirEnProyecto(id: string | number, horas: string | number) {
    return this.http.put(`${this.baseUrl}/AlumnosProyectosAsignados/actualizaNoHorasACumplirAlumno?id=${id}&horas=${horas}`, { withCredentials: false });
  }
  deleteHorasRegistradasEnProyecto(id: string ) {
    return this.http.delete(`${this.baseUrl}/AlumnosProyectosAsignadosHoras/${id}`, { withCredentials: false });
  }

}
