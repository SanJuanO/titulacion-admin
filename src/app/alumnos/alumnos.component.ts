import { Component, AfterViewInit, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Alumno } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
declare var $: any;
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { SessionService } from '../services/session.service';
import { Facultad } from '../models/facultad';
import { Carrera } from '../models/carrera';
import { Planes } from '../models/planes';
import { FacultadService } from '../services/facultad.service';
import { CarreraService } from '../services/carrera.service';
import { PlanesService } from '../services/planes.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})

export class AlumnosComponent implements AfterViewInit,OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  

  alumnos: Alumno[];
  public validar = false;
  public fileToUpload: File = null;
  public idDocumento: string = "";
  mensaje = "";
  planes : Planes[]=[]
  carreras : Carrera[]=[]
  facultades: Facultad[] = []
  id_plan:0
  id_carrera:0
  id_facultad:0
  band = true;

  constructor(private alumnosService: AlumnoService,
    private planesServices: PlanesService,
    private carrerasServices: CarreraService,
    private facultadesServices: FacultadService,
    public session: SessionService,
    private http: HttpClient) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    };
    //this.dtTrigger.next();
    
    this.obtenerAlumnos()
    this.obtenerFacultades()
    this.obtenerCarreras()
    this.obtenerPlanes()

  }

  obtenerAlumnos() {

    return this.alumnosService
      .getAlumnosFiltros(this.id_facultad, this.id_carrera, this.id_plan)
      .subscribe((alumnos: Alumno[]) => {
        this.alumnos = alumnos;
        if (this.band) {
          this.band = false;
          this.dtTrigger.next();
        }
        //this.dtElement = this.dtTrigger.next();
        //console.log(this.dtTrigger)
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

      // Destroy the table first
      dtInstance.destroy();

      this.alumnosService
        .getAlumnosFiltros(this.id_facultad, this.id_carrera, this.id_plan)
        .subscribe((alumnos: Alumno[]) => {
          this.alumnos = alumnos;

          // Call the dtTrigger to rerender again
          this.dtTrigger.next();          
        });


    });
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }

  ngAfterViewInit() {
    Feather.replace();
    
  }


  obtenerFacultades() {
    this.facultadesServices.getFacultades().subscribe((res: any[]) => {

      this.facultades = res
      console.log(res)

    });
  }


  obtenerCarreras() {
    this.carrerasServices.getCarreras().subscribe((res: any[]) => {

      this.carreras = res
      console.log(res)

    });
  }

  obtenerPlanes() {

    this.planesServices.getPlanes().subscribe((res: any[]) => {

      this.planes = res
      console.log(res)

    });
  }


}
