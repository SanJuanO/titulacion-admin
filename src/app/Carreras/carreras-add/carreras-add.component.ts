import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Universidad } from "../../models/universidad";
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, ModalidadesTrabajo } from '../../models/alumno';
import { AreasVidaUniversitariaService } from '../../services/areasvidauniversitaria.service';
import { ModalidadesTrabajoService } from '../../services/modalidadestrabajo.service';


import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.



declare var $: any;
let now = new Date();
export const MY_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY"
  }
};

@Component({
  selector: 'app-carreras-add',
  templateUrl: './carreras-add.component.html',
  styleUrls: ['./carreras-add.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})


export class CarrerasAddComponent implements OnInit {

  public activo = true;
  public mensajevalidacion = "";
  
  public carrera: Carrera
  public facultades: Facultad[]=[]
  
  constructor(private facultadService: FacultadService, private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private areasVidaUniversitaria: AreasVidaUniversitariaService, private modalidadesTrabajoService: ModalidadesTrabajoService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.obtenerFacultades()
    this.carrera = new Carrera("","",0,0)

  }

  onSubmit(data) {
    console.log(this.carrera)

    if (this.carrera.id_facultad <= 0) {
      this.mensajevalidacion = "No puedes dejar el campo de facultad vacío"
      $('#validacion').modal('show');

    }else if (this.carrera.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');

    }
    else if (this.carrera.descripcion == "") {

      this.mensajevalidacion = "No puedes dejar el campo de descripción vacío"
      $('#validacion').modal('show');

    }
    else {
      //console.log(data.value);

      this.carreraService.add(this.carrera).subscribe(() => {

        $('#success-modal').modal('show');

        this._location.back();
      })

    }
  }


  ngAfterViewInit() {
    Feather.replace();
  }

  obtenerFacultades() {

    return this.facultadService
      .getFacultades()
      .subscribe((facultades: Facultad[]) => this.facultades = facultades);

  }

}
