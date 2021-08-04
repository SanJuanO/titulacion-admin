import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { Facultad } from '../models/facultad';
import { FacultadService } from '../services/facultad.service';
import { Carrera } from '../models/carrera';
import { CarreraService } from '../services/carrera.service';

declare var $: any;

@Component({
  selector: 'app-carreras-projects',
  templateUrl: './carreras-home.component.html',
  styleUrls: ['./carreras-home.component.scss']
})

export class CarrerasComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {}
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<any>()
  dtTrigger2 = new Subject<any>()

  data: any
  public carreras: Carrera[] = []
  public validar = true
  public carrera: Carrera

  constructor(private carrerasServices: CarreraService,
    public session: SessionService,
    private router: Router, private httpClient: HttpClient) {

  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();

  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: { url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json' }
    };

    Feather.replace()
    this.obtenerCarreras()

  }


  obtenerCarreras() {
    this.carrerasServices.getCarreras().subscribe((res: any[]) => {

      this.carreras = res
      console.log(res)
      this.dtTrigger.next()
      this.dtTrigger2.next()

    });
  }

  eliminar() {

    this.carrerasServices.eliminar(this.carrera.id).subscribe((res: any) => {
      this.validar = true
      location.reload()

    }, error => {
      console.log(error)
      alert(error.message)
    })

  }

  modaleliminar(carrera) {

    this.carrera = carrera
    $('#delete-modal').modal('show')

  }

  ngAfterViewInit() {

    Feather.replace()

  }


}

