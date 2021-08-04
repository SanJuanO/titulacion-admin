import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planes } from '../models/planes';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPlan(id) {
    return this.http.get(`${this.baseUrl}/Planes/${id}`);
  }
  getPlanes() {
    return this.http.get(`${this.baseUrl}/Planes`);
  }
  getPlanesByIdCarrera(plan) {
    return this.http.post(`${this.baseUrl}/Planes/GetByIdCarrera`, plan);
  }
  eliminar(id: string | number) {
    const uri = `${this.baseUrl}/Planes/${id}`;
    return this.http.delete(uri);
  }

  add(plan: Planes) {

    const uri = `${this.baseUrl}/Planes`;
    return this.http.post(uri, plan);

  }

  update(plan: Planes) {
    return this.http.put(`${this.baseUrl}/Planes/${plan.id}`, plan);
  }

}
