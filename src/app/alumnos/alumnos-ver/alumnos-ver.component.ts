import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Universidad } from "../../models/universidad";
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";
import { Alumno, AlumnoProyecto, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, AlumnosProyectosAsignados, AlumnoRequisitos } from '../../models/alumno';
import { DocumentosRequeridosAlumnos, DocumentosAlumno, Documentosfile, DocumentosSubidosRequeridos } from "../../models/documentosalumnos"

import { AlumnosComponent } from '../alumnos.component';
import {Location} from '@angular/common';


import { Router,ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-organization-ver',
  templateUrl: './alumnos-ver.component.html',
  styleUrls: ['./alumnos-ver.component.scss']
})
export class AlumnosverComponent implements OnInit {
  activo = true;

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public documentos: DocumentosRequeridosAlumnos[] = [];
  public documentoscadena = new DocumentosAlumno();
  public documentosfile = new Documentosfile()
  public idAlumno: string;

  public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];
  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("", "", "", 0, 0, 0);
  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0,false);
  public DocumentosSubidos: DocumentosSubidosRequeridos[];
  public idDocumento: string = "";
  public fileToUpload: File = null;
  public proyectosArray = [];
  public alumnoRequisitos: AlumnoRequisitos = new AlumnoRequisitos();
  public cubiertos: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private _location: Location) { }



  ngOnInit(): void {
    this.idAlumno = this.route.snapshot.paramMap.get("id");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => this.alumno = alumno);
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerproyectoalumno();
    this.obtenerdocumentosRequeridos();
    this.obtenerdocumentosSubidosConRequeridos();
    this.obtenerRequisitosCubiertos();
    console.log(this.alumno);
  }

  obtenerUniversidades() {

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }
  obtenerproyectoalumno() {

    return this.alumnoService.getProyectoAlumno(this.idAlumno).subscribe((alumnoproyectos: AlumnosProyectosAsignados[]) => {
      //this.proyectosArray = alumnoproyectos
      let i = 0
      for (i = 0; i < alumnoproyectos.length; i++) {
        var proyectoAsignado = alumnoproyectos[i];
        
        if (proyectoAsignado.idEstado == 1 || proyectoAsignado.idEstado == 2 || proyectoAsignado.idEstado == 3 || proyectoAsignado.idEstado == 4 || proyectoAsignado.idEstado == 5) {
          this.proyectosArray.push(proyectoAsignado);
            /*
            if (proyectoAsignado.idEstado == 1 || proyectoAsignado.idEstado == 2 || proyectoAsignado.idEstado == 3) {

              projectArray2.push(proyectoAsignado);

            } else if (proyectoAsignado.idEstado == 4) {
            this.project = proyectoAsignado;
            this.estadoInscripcion = proyectoAsignado.idEstado;
            this.idproyecto = "" + proyectoAsignado.idProyecto;
            this.proyecto = proyectoAsignado.proyectoNombre;
            this.noHoras = proyectoAsignado.noHoras;
            if (this.noHoras > 0) {
              this.bandNoHoras = false;
            }
            //this.getEvaluacionesProyectoOrganizacion();
            console.log(this.project);
          } else {
            //this.obtenerActividadesByIdAlumnoProyectoAsignado2(proyectoAsignado);
            this.projectArrayTerminados.push(proyectoAsignado);

            //console.log(proyectoAsignado);
          }*/
        }
      }
      console.log(this.proyectosArray);

    });

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

  obtenerdocumentosRequeridos() {
    return this.alumnoService
      .getdocumentosRequeridos()
      .subscribe((documentos: DocumentosRequeridosAlumnos[]) => this.documentos = documentos);
  }

  //TODO SERGIO
  obtenerdocumentosSubidosConRequeridos() {
    return this.alumnoService
      .obtenerDocumentosSubidosConRequeridos(this.idAlumno)
      .subscribe((documentosS: DocumentosSubidosRequeridos[]) => {
        this.DocumentosSubidos = documentosS;
        //console.log("iddocumentos subidos "+this.idDocumentosSubidos);
        console.log("requeridos " + this.DocumentosSubidos);

      });
  }
  abrirsubir(id) {

    console.log("dfdsfdsfds" + id + " alumno " + this.idAlumno);
    this.idDocumento = id;
    $('#abrirsubir-' + id).modal('show');

  }

  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  subeArchivo() {
    console.log("iddocumento" + this.idDocumento + " alumno " + this.idAlumno);

    
    this.alumnoService.postFileAlumno(this.fileToUpload, this.idDocumento, this.idAlumno).subscribe(data => {
      if (data.resultado == 1) {
        $('#abrirsubir-' + this.idDocumento).modal('hide');
        $('#success-modal-preview-file').modal('show');
        location.reload();
      }
    }, error => {
      console.log(error);
    });
  }
  //TODO SERGIO

  liberarSS() {
    

    this.alumnoService.updateLiberar(this.idAlumno, 2).subscribe((res) => {

      if (res["resultado"] == 1) {
        $('#solicitaLiberacion').modal('show');
        this.ngOnInit();
      }
      //console.log(res);
    });

  }


  obtenerRequisitosCubiertos() {
    var id = this.idAlumno;

    this.alumnoService.getAlumnoRequisitosLiberacion(id).subscribe((res: AlumnoRequisitos) => {

      this.alumnoRequisitos = res;
      if (this.alumnoRequisitos != null && this.alumnoRequisitos.pago && this.alumnoRequisitos.cartaInicio
        && this.alumnoRequisitos.reportesMensuales
        && this.alumnoRequisitos.cartaTermino
        && this.alumnoRequisitos.evaluacionSS
        && this.alumnoRequisitos.horasSS && this.alumnoRequisitos.eventoSS
      ) {
        this.cubiertos = true;
      }
      /*
      console.log("requisitos");
      console.log(res);*/
    });

  }

}
