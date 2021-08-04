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
import {Location} from '@angular/common';
import { AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, ModalidadesTrabajo } from '../../models/alumno';
import { AreasVidaUniversitariaService } from '../../services/areasvidauniversitaria.service';
import { ModalidadesTrabajoService } from '../../services/modalidadestrabajo.service';


import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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
  selector: 'app-alumnos-add',
  templateUrl: './alumnos-add.component.html',
  styleUrls: ['./alumnos-add.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class AlumnosAddComponent implements OnInit {
  
  activo = true;
  public mensajevalidacion="";
public facu=1;
public uni=1;
public carre=1;

public peri=201860;
  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public listaAreasUniversidad: AreasVidaUniversitaria[] = [];
  public listaAreasUniversidadParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaModalidadesTrabajo: ModalidadesTrabajo[] = [];

  constructor(private facultadService: FacultadService, private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private areasVidaUniversitaria: AreasVidaUniversitariaService, private modalidadesTrabajoService: ModalidadesTrabajoService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerAreasVidaUniversitaria();
    this.obtenerModalidadesTrabajo()
  }


  obtenerUniversidades(){

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }


  obtenerCarreras(){

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => this.carreras = carreras);

  }

  obtenerFacultades(){

    return this.facultadService
      .getFacultades()
      .subscribe((facultades: Facultad[]) => this.facultades = facultades);

  }

  obtenerModalidadesTrabajo(){

    return this.modalidadesTrabajoService
      .getModalidadesTrabajo()
      .subscribe((listaModalidadesTrabajo: ModalidadesTrabajo[]) => this.listaModalidadesTrabajo = listaModalidadesTrabajo);

  }
  
  obtenerAreasVidaUniversitaria(){

    return this.areasVidaUniversitaria
      .getAreasVidaUniversitaria()
      .subscribe((listaAreasUniversidad: AreasVidaUniversitaria[]) => this.listaAreasUniversidad = listaAreasUniversidad);

  }

  toggleAreasVidaUniversitariaParticipado(checked, id) {
    console.log(checked);
    id=Number(id)
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var competencia = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.listaAreasUniversidadParticipado.push(valor);
    else this.listaAreasUniversidadParticipado = this.listaAreasUniversidadParticipado.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.listaAreasUniversidadParticipado);
  }

  toggleAreasVidaUniversitariaActuales(checked, id) {
    console.log(checked);
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var area = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.listaAreasUniversidadActuales.push(valor);
    else this.listaAreasUniversidadActuales = this.listaAreasUniversidadActuales.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.listaAreasUniversidadActuales);
  }


  onSubmit(data) {
    data.idFacultad=this.facu;
    data.idCarrera=this.facu;
    data.idUniversidad=this.uni;
  //  console.log(data);

    var temporal = (data.value);
    
console.log(temporal);

    if(temporal['nombre']==""){
      this.mensajevalidacion="No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['paterno'] == "") {
      this.mensajevalidacion = "No puedes dejar el campo de paterno vacío"
      $('#validacion').modal('show');

    }
    else if (temporal['materno'] == "") {
      this.mensajevalidacion = "No puedes dejar el campo de materno vacío"
      $('#validacion').modal('show');

    }
    else if(temporal['matricula']==""){
      this.mensajevalidacion="No puedes dejar el campo de matricula vacío"
      $('#validacion').modal('show');

    }
    else if(temporal['porcentaje']==""){

      this.mensajevalidacion="No puedes dejar el campo de porcentaje académico vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['noCuatrimestre']==""){

      this.mensajevalidacion="No puedes dejar el campo no de cuatrimestre vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['esquemaPeriodo']==""){

      this.mensajevalidacion ="No puedes dejar el campo de esquema periodo vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['generacion']==""){

      this.mensajevalidacion ="No puedes dejar el campo de generación vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['fechaEstimadaGraduacion']==""){

      this.mensajevalidacion="No puedes dejar el campo de fecha estimada de graduaciòn vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['correoInstitucional']==""){
      this.mensajevalidacion="No puedes dejar el campo de correo institucional vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['CorreoPersonal']==""){
      this.mensajevalidacion="No puedes dejar el campo de correo personal vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['celular']==""){
      this.mensajevalidacion="No puedes dejar el campo de teléfono de contacto vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['fechaNacimiento']==""){
      this.mensajevalidacion="No puedes dejar el campo de fecha de nacimiento vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['sexo']==""){

      this.mensajevalidacion="No puedes dejar el campo de sexo vacío"
      $('#validacion').modal('show');
    }
    else {
      //console.log(data.value);
      temporal["listaAreaVidaUniversitariaParticipado"] = this.listaAreasUniversidadParticipado;
      temporal["listaAreaVidaUniversitariaActuales"] = this.listaAreasUniversidadActuales;
      console.log(temporal);
      

      this.alumnoService.addAlumno(temporal).subscribe(() => {
      
  
           $('#success-modal-preview').modal('show');

    this._location.back();
    })
    
  }
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
