import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { FacultadService } from '../../services/facultad.service';
import { Facultad } from "../../models/facultad";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  selector: 'app-facultades-add',
  templateUrl: './facultades-add.component.html',
  styleUrls: ['./facultades-add.component.css'],
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


export class FacultadesAddComponent implements OnInit {

  public activo = true;
  public mensajevalidacion = "";

  public facultad: Facultad = new Facultad("","",0);
  constructor(private facultadService: FacultadService,private router: Router, private _location: Location) { }

  ngOnInit(): void {
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

      this.facultadService.add(this.facultad).subscribe(() => {

        $('#success-modal').modal('show')

        this._location.back();

      })

    }
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
