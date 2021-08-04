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

declare var $: any;

@Component({
  selector: 'app-facultades-projects',
  templateUrl: './facultades-home.component.html',
  styleUrls: ['./facultades-home.component.scss']
})

export class FacultadesComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<any>()
  dtTrigger2 = new Subject<any>()

  data: any
  public facultades: Facultad[] = []
  public validar = true
  public facultad: Facultad

  constructor(private facultadesServices: FacultadService,
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
    this.obtenerFacultades()

  }


  obtenerFacultades() {
    this.facultadesServices.getFacultades().subscribe((res: any[]) => {

      this.facultades = res
      console.log(res)
      this.dtTrigger.next()
      this.dtTrigger2.next()

    });
  }

  eliminar() {

    this.facultadesServices.delete(this.facultad.id).subscribe((res: any) => {
      this.validar = true;
      location.reload();

    }, error => {
      console.log(error)
      alert(error.message)
    })

  }

  modaleliminar(facultad) {

    this.facultad = facultad
    $('#delete-modal').modal('show')

  }

  ngAfterViewInit() {

    Feather.replace()

  }


}

