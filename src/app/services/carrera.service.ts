import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrera } from '../models/carrera';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getCarrera(id) {
    return this.http.get(`${this.baseUrl}/Carreras/${id}`);
  }
  getCarreras() {
    return this.http.get(`${this.baseUrl}/Carreras`);
  }
  eliminar(id: string | number) {
    const uri = `${this.baseUrl}/Carreras/${id}`;
    return this.http.delete(uri);
  }
  add(carrera: Carrera) {

    const uri = `${this.baseUrl}/carreras`;
    return this.http.post(uri, carrera);

  }

  update(carrera: Carrera) {
    return this.http.put(`${this.baseUrl}/Carreras/${carrera.id}`, carrera);
  }
  
}
