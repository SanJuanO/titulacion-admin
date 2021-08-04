import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-carreras-edit',
  templateUrl: './carreras-edit.component.html',
  styleUrls: ['./carreras-edit.component.scss']
})
export class CarrerasEditComponent implements OnInit {

  public carrera: Carrera = new Carrera("", "", 0,0)
  public idCarrera = "0"
  public mensajevalidacion = ""
  public facultades: Facultad[] = []

  constructor(private route: ActivatedRoute, private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private _location: Location) { }

  ngOnInit(): void {

    this.obtenerFacultades()
    this.idCarrera = this.route.snapshot.paramMap.get("id")
    console.log(this.idCarrera)
    if (this.idCarrera != "0") {

      this.obtenerCarrera()

    }

  }

  obtenerCarrera() {

    return this.carreraService
      .getCarrera(this.idCarrera)
      .subscribe((carrera: Carrera) => this.carrera = carrera);

  }


  onSubmit(data) {
    console.log(this.carrera)


    if (this.carrera.id_facultad <= 0) {
      this.mensajevalidacion = "No puedes dejar el campo de facultad vacío"
      $('#validacion').modal('show');

    } else if (this.carrera.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');

    }
    else if (this.carrera.descripcion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de descripción vacío"
      $('#validacion').modal('show');
    }
    else {

      this.carreraService.update(this.carrera).subscribe(() => {

        $('#success-modal').modal('show')

        this._location.back();

      }, error => {
        console.log(error)
        alert(error.message)
      })

    }
  }

  obtenerFacultades() {

    return this.facultadService
      .getFacultades()
      .subscribe((facultades: Facultad[]) => this.facultades = facultades);

  }

}
