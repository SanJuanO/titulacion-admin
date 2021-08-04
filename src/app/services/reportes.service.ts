import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reporte } from '../models/alumno';
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
export class ReportesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  getalumnosreport() {
    var reporte=new Reporte(true);
    return this.http.post(`${this.baseUrl}/Alumnos/ExportExcel`,reporte);
  }
  getinstitucionesreport() {
var reporte=new Reporte(true);

    return this.http.post(`${this.baseUrl}/Organizaciones/ExportExcel`,reporte);
  }
 


}
