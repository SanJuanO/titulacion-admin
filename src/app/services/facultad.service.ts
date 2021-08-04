import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facultad } from '../models/facultad';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getFacultad(id) {
    return this.http.get(`${this.baseUrl}/Facultades/${id}`);
  }
  getFacultades() {
    return this.http.get(`${this.baseUrl}/Facultades`);
  }

  delete(id: string | number) {
    const uri = `${this.baseUrl}/Facultades/${id}`;
    return this.http.delete(uri);
  }

  add(facultad: Facultad) {
    const uri = `${this.baseUrl}/Facultades`;
    return this.http.post(uri, facultad);
  }

  update(facultad: Facultad) {
    return this.http.put(`${this.baseUrl}/Facultades/${facultad.id}`, facultad);
  }
}
