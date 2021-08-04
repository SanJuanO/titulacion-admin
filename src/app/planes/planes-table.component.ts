import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { Facultad } from '../models/facultad';
import { FacultadService } from '../services/facultad.service';
import { Planes } from '../models/planes';
import { PlanesService } from '../services/planes.service';

declare var $: any;

@Component({
  selector: 'app-planes',
  templateUrl: './planes-table.component.html',
  styleUrls: ['./planes-table.component.scss']
})

export class PlanesComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {}
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<any>()
  dtTrigger2 = new Subject<any>()

  data: any
  public planes: Planes[] = []
  public validar = true
  public idCarrera = "-1"
  public mensaje0 = "Muy bien!"
  public mensaje1 = "Has eliminado una Facultad"
  public plan: Planes
  public planEdit: Planes
  public mensajevalidacion = ""
  public inicial=true


  constructor(private planesServices: PlanesService,
    public session: SessionService,
    private route: ActivatedRoute, private httpClient: HttpClient) {

  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();

  }

  ngOnInit(): void {
    this.plan = new Planes("", "si", "si", "si", "si", "si", "si",0, true, 0)
    this.planEdit = new Planes("", "si", "si", "si", "si", "si", "si",0,true, 0)

    this.idCarrera = this.route.snapshot.paramMap.get("id")

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: { url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json' }
    };

    Feather.replace()
    this.obtenerPlanes()

  }


  obtenerPlanes() {
    this.plan.id_carrera = Number(this.idCarrera)
    this.planesServices.getPlanesByIdCarrera(this.plan).subscribe((res: any[]) => {

      this.planes = res
      console.log(res)
      this.dtTrigger.next()
      
    });
  }

  eliminarPlan() {

    this.planesServices.eliminar(this.plan.id).subscribe((res: any) => {
      this.validar = true
      this.obtenerPlanes()
      location.reload()

    }, error => {
      console.log(error)
      alert(error.message)
    })

  }

  modaleliminar(plan) {

    this.plan = plan
    $('#delete-modal-plan').modal('show')

  }

  ngAfterViewInit() {

    Feather.replace()

  }


  funcion1() {
    //console.log("funcion1" + this.idCarrera)
    //this.plan = new Planes("", "si", "si", "si", "si", "si", "si",0, true, 0)
    $('#add-modal-view').modal('show');

  }

  add() {
    $('#add-modal-view').modal('hide')

    console.log(this.plan)

    if (this.plan.nombre == "") {

      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');

    }
    else if (this.plan.serviciosocial == "") {

      this.mensajevalidacion = "No puedes dejar el campo de servicio social vacío"
      $('#validacion').modal('show');

    }
    else if (this.plan.idioma2 == "") {

      this.mensajevalidacion = "No puedes dejar el campo de 2do idioma vacío"
      $('#validacion').modal('show');

    }
    else if (this.plan.idioma3 == "") {

      this.mensajevalidacion = "No puedes dejar el campo de 3er idioma vacío"
      $('#validacion').modal('show');

    }
    else if (this.plan.aingles == "") {

      this.mensajevalidacion = "No puedes dejar el campo de asignatura ingles vacío"
      $('#validacion').modal('show');

    }
    else if (this.plan.aonline == "") {

      this.mensajevalidacion = "No puedes dejar el campo de asignaturas online vacío"
      $('#validacion').modal('show');

    }
    else if (this.plan.asemipresenciales == "") {

      this.mensajevalidacion = "No puedes dejar el campo de asignaturas semipresenciales vacío"
      $('#validacion').modal('show');

    }
    else {
      //console.log(data.value);
      this.plan.id_carrera = Number(this.idCarrera)
      this.planesServices.add(this.plan).subscribe(() => {

        $('#success-modal-planes-table').modal('show')
        this.mensaje0 = "Muy bien!"
        this.mensaje1 = "Has agregado un plan"
        location.reload()
        //this.obtenerPlanes()

      }, error => {
        console.log(error)
        alert(error.message)
      })

    }

  }

  modalEdit(plan: Planes) {
    if (plan == undefined) {
      this.planEdit = new Planes("", "si", "si", "si", "si", "si", "si",0, true, 0)
    } else {
      this.planEdit = plan
    }
    $('#edit-modal-view').modal('show')

  }

  save() {
    $('#edit-modal-view').modal('hide')

    console.log(this.plan)

    if (this.planEdit.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');

    }
    else if (this.planEdit.serviciosocial == "") {

      this.mensajevalidacion = "No puedes dejar el campo de servicio social vacío"
      $('#validacion').modal('show');

    }
    else if (this.planEdit.idioma2 == "") {

      this.mensajevalidacion = "No puedes dejar el campo de 2do idioma vacío"
      $('#validacion').modal('show');

    }
    else if (this.planEdit.idioma3 == "") {

      this.mensajevalidacion = "No puedes dejar el campo de 3er idioma vacío"
      $('#validacion').modal('show');

    }
    else if (this.planEdit.aingles == "") {

      this.mensajevalidacion = "No puedes dejar el campo de asignatura ingles vacío"
      $('#validacion').modal('show');

    }
    else if (this.planEdit.aonline == "") {

      this.mensajevalidacion = "No puedes dejar el campo de asignaturas online vacío"
      $('#validacion').modal('show');

    }
    else if (this.planEdit.asemipresenciales == "") {

      this.mensajevalidacion = "No puedes dejar el campo de asignaturas semipresenciales vacío"
      $('#validacion').modal('show');

    }
    else {
      //console.log(data.value);

      this.planesServices.update(this.planEdit).subscribe(() => {

        $('#success-modal-planes-table').modal('show')
        this.mensaje0 = "Muy bien!"
        this.mensaje1 = "Has actualizado el plan"
        //this.obtenerPlanes()
        location.reload()

      }, error => {
        console.log(error)
        alert(error.message)
      })

    }


  }


} 
