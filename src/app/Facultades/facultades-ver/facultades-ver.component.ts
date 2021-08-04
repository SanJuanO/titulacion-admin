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
  selector: 'app-facultades-ver',
  templateUrl: './facultades-ver.component.html',
  styleUrls: ['./facultades-ver.component.scss']
})
export class FacultadesVerComponent implements OnInit {

  public facultad: Facultad = new Facultad("facultad", "descripcion de la facultad", 0)
  public idFacultad = "0"
  public carreras: Carrera[] = []

  constructor(private route: ActivatedRoute, private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private _location: Location) { }

  ngOnInit(): void {

    this.idFacultad = this.route.snapshot.paramMap.get("id")
    console.log(this.idFacultad)
    //this.obtenerUniversidades()
    //this.obtenerCarreras()
    if (this.idFacultad!= "0") {

      this.obtenerFacultad()

    }

  }

  obtenerCarreras() {

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => this.carreras = carreras);

  }

  obtenerFacultad() {

    this.facultadService.getFacultades().subscribe((facultad: Facultad) => this.facultad);

  }

}
