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
  selector: 'app-facultades-edit',
  templateUrl: './facultades-edit.component.html',
  styleUrls: ['./facultades-edit.component.scss']
})
export class FacultadesEditComponent implements OnInit {

  public facultad: Facultad = new Facultad("", "", 0)
  public idFacultad = "0"
  public carreras: Carrera[] = []
  public mensajevalidacion = ""


  constructor(private route: ActivatedRoute, private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private _location: Location) { }

  ngOnInit(): void {

    this.idFacultad = this.route.snapshot.paramMap.get("id")
    console.log(this.idFacultad)
    //this.obtenerUniversidades()
    //this.obtenerCarreras()
    if (this.idFacultad != "0") {

      this.obtenerFacultad()

    }

  }

  obtenerCarreras() {

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => this.carreras = carreras);

  }

  obtenerFacultad() {

    this.facultadService.getFacultad(this.idFacultad).subscribe((facultad: Facultad) => this.facultad = facultad);

  }


  onSubmit(data) {
    console.log(this.facultad)

    if (this.facultad.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');

    }
    else if (this.facultad.descripcion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de descripción vacío"
      $('#validacion').modal('show');
    }
    else {

      this.facultadService.update(this.facultad).subscribe(() => {

        $('#success-modal').modal('show')

        this._location.back();

      }, error => {
        console.log(error)
        alert(error.message)
      })

    }
  }



}
