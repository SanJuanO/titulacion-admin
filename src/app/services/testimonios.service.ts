import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Testimonios } from "../models/testimonios"

@Injectable({
  providedIn: 'root'
})
export class TestimoniosService {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }

  postFileImage(fileToUpload: File,titulo,testimonio): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.api}/testimonios/CreateWithFile`;
    const formData: FormData = new FormData();
    formData.append('Titulo', titulo);
    formData.append('Testimonio', testimonio);
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
  gettestimonios(){
    const uri = `${this.api}/Testimonios`;
    return this.http.get(uri);
  }
  gettestimoniosid(id){
    const uri = `${this.api}/Testimonios/${id}`;
    return this.http.get(uri);
  }

  updateTestimonios(testimonio: Testimonios) {
    let estado=testimonio;
    console.log(estado);
    return this.http.put(`${this.api}/Testimonios/${testimonio.id}`, estado);
  }
  eliminar(id : string | number){
    const uri = `${this.api}/Testimonios/${id}`;
    return this.http.delete(uri);
  }

}
