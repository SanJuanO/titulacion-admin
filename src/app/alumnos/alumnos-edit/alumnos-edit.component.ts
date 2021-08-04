import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Universidad } from "../../models/universidad";
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";
import { Alumno, AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, ModalidadesTrabajo } from '../../models/alumno';

import { Router, ActivatedRoute } from '@angular/router';
import { AlumnosComponent } from '../alumnos.component';
import { Location } from '@angular/common';
import { ModalidadesTrabajoService } from '../../services/modalidadestrabajo.service';
import { AreasVidaUniversitariaService } from '../../services/areasvidauniversitaria.service';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Planes } from '../../models/planes';
import { PlanesService } from '../../services/planes.service';

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
  selector: 'app-alumnos-edit',
  templateUrl: './alumnos-edit.component.html',
  styleUrls: ['./alumnos-edit.component.css'],
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

export class AlumnosEditComponent implements OnInit {


  activo = true;
  public mensajevalidacion = "";

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public planes: Planes[] = [];
  public listaAreasUniversidad: AreasVidaUniversitaria[] = [];
  public listaAreasUniversidadParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaModalidadesTrabajo: ModalidadesTrabajo[] = [];
  public idsPasados: any;
  public idsActuales: any;

  public idAlumno: string;

  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, false);

  constructor(private route: ActivatedRoute,
    private planesServices: PlanesService,
    private router: Router, private facultadService: FacultadService,
    private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private areasVidaUniversitaria: AreasVidaUniversitariaService, private modalidadesTrabajoService: ModalidadesTrabajoService, private _location: Location) { }


  ngOnInit(): void {
    this.idAlumno = this.route.snapshot.paramMap.get("id")
    this.obtenerFacultades()
    this.obtenerCarreras()
    this.obtenerPlanes()
    this.obtenerAlumno()
    
    /*
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => {
      this.alumno = alumno;
      this.alumno.fechaEstimadaGraduacion = alumno.fechaEstimadaGraduacionString;
      this.alumno.fechaNacimiento = alumno.fechaNacimientoString;
      this.alumno.fechaInicioServicioSocial = alumno.fechaInicioServicioSocialString;
      
      this.idsPasados = this.alumno.listaAreaVidaUniversitariaParticipado.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);
      this.idsActuales = this.alumno.listaAreaVidaUniversitariaActuales.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);

      console.log(this.alumno);
    });
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerAreasVidaUniversitaria();
    this.obtenerModalidadesTrabajo()
    console.log(this.alumno);
    */
  }

  obtenerUniversidades() {

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }


  obtenerCarreras() {

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => this.carreras = carreras);

  }

  obtenerFacultades() {

    return this.facultadService
      .getFacultades()
      .subscribe((facultades: Facultad[]) => this.facultades = facultades);

  }

  obtenerPlanes() {

    this.planesServices.getPlanes().subscribe((res: any[]) => {

      this.planes = res
      console.log(res)

    });
  }

  obtenerAlumno() {

    this.alumnoService.getAlumno(this.idAlumno).subscribe((res: any) => {

      this.alumno = res
      console.log(res)

    });
  }

  onSubmit(data) {
    alert("Alumno editado")
    /*
     var temporal=(data.value);
   
     console.log(temporal);
   
       console.log(temporal['universidad']);
   
           if(temporal['nombre']==""){
             this.mensajevalidacion="No puedes dejar el campo de nombre vacío"
             $('#validacion').modal('show');
             
           }
           else if(temporal['matricula']==""){
             this.mensajevalidacion="No puedes dejar el campo de matricula vacío"
             $('#validacion').modal('show');
       
           }
            
           else if(temporal['paterno']==""){
             this.mensajevalidacion="No puedes dejar el campo de paterno vacío"
             $('#validacion').modal('show');
             
           }
           else if(temporal['materno']==""){
             this.mensajevalidacion="No puedes dejar el campo de materno vacío"
             $('#validacion').modal('show');
             
           }
         
           else if(temporal['porcentaje']==""){
       
             this.mensajevalidacion="No puedes dejar el campo de porcentaje vacío"
             $('#validacion').modal('show');
           }
           else if(temporal['correo']==""){
             this.mensajevalidacion="No puedes dejar el campo de correo vacío"
             $('#validacion').modal('show');
             
           }
           else if(temporal['celular']==""){
             this.mensajevalidacion="No puedes dejar el campo de celular vacío"
             $('#validacion').modal('show');
             
           }
           else if(temporal['pais']==""){
             this.mensajevalidacion="No puedes dejar el campo de pais vacío"
             $('#validacion').modal('show');
             
           }
           else if(temporal['cp']==""){
       
             this.mensajevalidacion="No puedes dejar el campo de cp vacío"
             $('#validacion').modal('show');
           } 
           else if(temporal['estado']==""){
             this.mensajevalidacion="No puedes dejar el campo de estado vacío"
             $('#validacion').modal('show');
             
           }
           else if(temporal['municipio']==""){
             this.mensajevalidacion="No puedes dejar el campo de municipio vacío"
             $('#validacion').modal('show');
             
           }
           else if(temporal['colonia']==""){
       
             this.mensajevalidacion="No puedes dejar el campo de colonia vacío"
             $('#validacion').modal('show');
           } 
           else if(temporal['calle']==""){
             this.mensajevalidacion="No puedes dejar el campo de calle vacío"
             $('#validacion').modal('show');
             
           }
       else{   
             console.log(JSON.stringify(data.value));
             this.alumnoService.updateAlumno(this.idAlumno, this.alumno).subscribe(() => {
         
              $('#success-modal-preview').modal('show');
   
       this._location.back();
       })
     }*/
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
